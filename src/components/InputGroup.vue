<template>
     <div class="text_group">
    <!-- 组件结构 -->
    <!-- 组件容器 -->
        <div class="input_group" :class="{'is-invalid':error}">
            <!-- 输入框 -->
            <input
                :type="type"
                :value="value"
                :placeholder="placeholder"
                :name="name"
                @input="$emit('input',$event.target.value)"
            >
            <!--输入后面的按钮-->
            <button v-if="btnTitle" :disabled ='disabled' @click="$emit('btnClick')">{{btnTitle}}</button> 
        </div>
        
        <!--错误提醒-->
        <div v-if="error" class="invalid-feedback">{{error}}</div>
    </div>
</template>


<script>
export default {
   props:{
        type:{
                type:String,
                default:'text'
            },
        placeholder:String,
        value:String,
        name:String,
        btnTitle:String,  //拥不拥有获取验证码这个东西
        disabled:Boolean,   //让这个按钮可以用还是不可以用
        error:String 
   }
}
</script>


<style>

 .input_group {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.input_group input {
    height: 100%;
    width: 75%;
    outline: none;
}
.input_group button {
    border: none;
    outline: none;
    background: #fff;
    font-weight: 700;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 500;
  font-family: "微软雅黑";
  text-indent:0.5em;
}
input{
    border: none;
    
}
</style>


