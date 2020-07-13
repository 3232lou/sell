<template>
  <div class="header">
     <!--左侧返回-->
     <div class="header-button" v-show="isLeft">
         <i class="return"></i>
         <button @click="$router.go(-1)">返回</button>
     </div>
     <!--中间标题-->
     <h1 class="header-title" >{{title}}</h1>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props:{
      title:String,
      isLeft:{
          type:Boolean,
          default:true
      }
  }
}
</script>

<style scoped>
.header{ 
  background-color: #009eef;
  box-sizing: border-box;
  font-size: 16px;
  height: 110px;
  line-height: 1;
  padding: 0 10px;
  text-align: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.return{
    width: 40px;
    height: 40px;
    background: url(../assets/return.png) no-repeat;
    background-size: 40px 40px;
    position: absolute;
    top: 26px;
    left: 2px;
   
}
.header-button button{
    color: black;
    border: 0;
    background-color: transparent;
    padding: 10px;
    position: absolute;
    left: 38px;
    font-size: 36px;
    top: 10px;
}
.header-title{
    margin-top: 29px;
    font-size: 0.44rem;
}
</style>
