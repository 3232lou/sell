<template>
  <div class="address">
     <Header :isLeft='true' title="选择收货地址"></Header>
     <div class="city_search">
          <div class="search">
               <span class="city" @click="$router.push('/city')">{{city}}
                 <i class="down"></i>
               </span>
               <i class="find"></i>
               <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
          </div>
          <Location @click="selectAddress" :address='address'></Location>
      </div> 
      <!--显示搜索框下面的内容--> 
      <div class="area">
        <ul class="area_list" v-for = '(item,index) in areaList' v-bind:key="index">
          <li @click="selectAddress(item)">
            <h4>{{item.name}}</h4>
            <p>{{item.district}}{{item.address}}</p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Location from '../components/Location'
export default {
  name: 'Address',
  components:{
    Header,
    Location
  },
  beforeRouteEnter(to,from,next){
     next(vm=>{
       vm.city = to.params.city;
     });

  },
  data(){
    return{
      city:'',  //当前城市
      search_val:'',
      areaList:[]
    }
  },
  computed: {
    address(){
      return this.$store.getters.location.formattedAddress;
    }
  },
  watch: {
    search_val(){
      this.searchPlace();
    }
  },
  methods: {
    searchPlace(){
      const self = this;
      AMap.plugin('AMap.Autocomplete', function(){
      // 实例化Autocomplete
      var autoOptions = {
        //city 限定城市，默认全国
        city: 'self.city'
      }
      var autoComplete= new AMap.Autocomplete(autoOptions);
      autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          self.areaList = result.tips;
        })
      }); //plugin
      },//searchPlace方法结束
    selectAddress(item){
      //设置地址，相当于把这个地址存在store
      if(item){
         this.$store.dispatch('setAddress',item.district + item.address + item.name);
      }else{
         this.$store.dispatch('setAddress',this.address);
      }
     
      this.$router.push('/home')
    } 
  }//methods方法结束
} //export default结束
</script>

<style scoped>

.city_search {
  background-color:#fff;
  margin-top: 97px;
  color: #333;
  padding: 10px 20px;
 
}
.city{
  font-size: 32px;
  font-weight: bold;
}
.search {
  background-color: #eee;
  height: 72px;
  border-radius: 13px;
  box-sizing: border-box;
  line-height: 72px;
}
.down{
  width: 36px;
  height: 36px;
  background: url(../assets/down.png) no-repeat;
  background-size: 36px 36px;
  display: inline-block;
  background-position-y: 10px;
}
.find{
  width: 36px;
  height: 36px;
  background: url(../assets/search.png) no-repeat;
  background-size: 36px 36px;
  position: relative;
  display: inline-block;
  left: 5px;
  top: 10px;
}
input{
  margin-left: 12px;
  background-color: #eee;
  border: none;
  outline: none;
  font-size:28px;
}
.area{
  background: #fff;
  font-size: 14px;
}
.area li{
  border-bottom: 1px solid #eee;
  padding: 10px 16px;
  color: #aaa;
}
.area li h4{
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>
