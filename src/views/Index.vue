<template>
  <div class="index">
    <router-view></router-view>
    <TarBar :data="tabbarData"></TarBar>
  </div>
</template>

<script>
import TarBar from '../components/TabBar';
export default {
  name: 'index',
  data(){
    return{
      tabbarData:[
        {title:"首页",icon:'index',path:'/home'},
        {title:"订单",icon:'order',path:'/order'},
        {title:"我的",icon:'me',path:'/me'}
      ]
    }
  },
  components:{
    TarBar
  }
};
</script>
<style scoped>
  h1{
    background: green;
  }
</style>
