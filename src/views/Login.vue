<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="爱吃外卖">
        </div>  
        <!--输入手机号--> 
        <InputGroup type='number'
                    v-model="phone" 
                    placeholder='手机号'
                    :btnTitle="btnTitle" 
                    :disabled = 'disabled'
                    :error = 'errors.phone'
                    @btnClick = 'getVerifyCode'
                    >
                   
        </InputGroup>


         <!--输入验证码--> 
          <InputGroup type='number' v-model="verifyCode" placeholder='验证码'
                   :error = 'errors.code' >
                   
        </InputGroup>

        <!--用户协议-->
        <div class="login_des">
            <p>
                新用户登录自动注册，表示已同意
                <span>《用户服务协议》</span>
            </p>
        </div> 
         <!--登录按钮-->
         <div class="login_btn">
             <button :disabled='isClick' @click="handleLogin">按钮</button>
         </div>
    </div>
</template>


<script>
import InputGroup from '../components/InputGroup'
export default {
    name:'login',
    data(){
        return{
            phone:'',
            verifyCode:'',
            errors:{},
            btnTitle:'获取验证码',
            disabled:false

        }
    },
    computed:{
        isClick(){
            if(!this.phone || !this.verifyCode){
                return true;
            }else{
                return false;
            }
        }
    },
    methods:{
        handleLogin(){
            if(this.validatephone()){
                this.errors = {};
                this.axios.post('/api/posts/sms_back',{
                phone:this.phone,
                code:this.verifyCode
                })
               .then(res=>{
                   console.log(res.data);
                localStorage.setItem('love_login',res.data.user._id);
                this.$router.push('/');
                 })
                .catch(err=>{
                this.erros={
                    code: err.response.data.msg
                 }
                 });  
            }else{
                 this.errors = {
                    phone:'请输入正确的手机号码',
                };
                return false;
            }
            this.errors = {};
            this.axios.post('/api/posts/sms_back',{
                phone:this.phone,
                code:this.verifyCode
            })
            .then(res=>{
                localStorage.setItem('love_login',res.data.user._id);
                this.$router.push('/');
            })
            .catch(err=>{
                this.erros={
                    code: err.response.data.msg
                }
            });
        },
        getVerifyCode(){   
            if(this.validatephone()){  //判断这个是否是个合法的手机号
                this.validateBtn();
                //发送请求
                this.axios.post("/api/posts/sms_send",{
                    tpl_id:'158278',
                    key:'b5bf35e3de04e9ab10ec02b24509b3d8',
                    phone:this.phone
                }).then(res =>{
                    console.log(res);
                })

            }      
        },
        validateBtn(){
            let time = 60;
            let timer = setInterval(()=>{
                if(time == 0){
                    clearInterval(timer);
                    this.btnTitle = "获取验证码";
                    this.disabled = false;
                }else{
                    this.btnTitle = time +'秒后重试';
                    this.disabled = true;
                    time--;
                }
            },1000);
        },
        validatephone(){  //判断这个是否是个合法的手机号
            if(!this.phone){
                this.errors = {
                    phone:'手机号码不能为空'
                };
                return false;
            }else if(!/^1[345678]\d{9}$/.test(this.phone)){
               this.errors = {
                    phone:'请输入正确的手机号码',
                };
                return false;
            }else{
                this.errors={};
                 return true;   
                 
            }
        }
    },//methods方法结束
    components:{
       InputGroup 
    }
}
</script>


<style scoped>
 .login{
     width: 100%;
     height: 100%;
     background: #fff;
     box-sizing: border-box;
     background: white;
 }
 .logo{
     text-align: center
 }
 .logo img{
     width: 80%;
 }

.login_des {
  color: #aaa;
  margin: 0 auto;
  line-height: 25px;
}
.login_des,
.login_btn {
  margin-top: 20px;
  
}
.login_des p{
    text-indent: 1em;
    font-size:16px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn{
    text-align: center;
}
.login_btn button{
    width: 98%;
    height: 40px;
    background-color: #48ca38;
    border-radius:4px;
    color: white;
    font-size: 14px;
    border: none; 
    outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>


