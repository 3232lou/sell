<template>
  <div>
    <div class="title">当前定位
    <div class="des" @click="$emit('click')">
        <i class="location"></i>
        <span>{{address}}</span>
    </div>
    
    </div>
  </div>
</template>

<script>

export default {
  name: 'location',
  props:{
      address:String
  }
}
</script>

<style scoped>
   .title{
       margin: 20px 0;
       font-size: 29px;
   }
   .des i{
       color: #009eef;
       width: 36px;
       height: 36px;
       display: inline-block;
       background:url(../assets/Location.png) no-repeat 1px 6px;
       background-size:36px 36px;
   }
   .des span {
        color: #333;
        font-weight: bold;
        margin-left: 5px;
        display: inline-block;
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
  }
</style>


