<template>
  <div class="tabbar">
        <router-link 
        class="tab-item" 
        v-for="(item,index) in data"
        :key="index"
        :to='item.path'
        active-class = "is-selected"
        >
          <div class="tab-item-icon">
            <div :class=" 'photo-' + item.icon"></div>
          </div>
          <div class="tab-item-label">{{item.title}}</div>
        </router-link>
  </div>
</template>

<script>

export default {
  name: 'tarbar',
  props:{
      data:Array
  }
}
</script>
<style>
  .tabbar{
    height: 115px;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid rgb(218, 210, 210);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #fafafa;
    display: flex;
    text-align: center;
  }
  .tab-item {
    display: block;
    padding: 3px 0;
    flex: 1;
  }
  .tab-item-icon {
    width: 30px;
    height: 30px;
    margin: 2px auto 5px;
}
  .tab-item-icon .photo-index{
    width: 60px;
    height: 60px;
    background: url(../assets/index.png) no-repeat ;
    background-size: 60px 60px; 
  }
    .tab-item-icon .photo-order{
    width: 60px;
    height: 60px;
    background: url(../assets/order.png) no-repeat ;
    background-size: 60px 60px; 
  }
    .tab-item-icon .photo-me{
    width: 60px;
    height: 60px;
    background: url(../assets/me.png) no-repeat ;
    background-size: 60px 60px; 
  }
  .tab-item-label {
    color: inherit;
    font-size: 28px;
    line-height: 40px;
    font-weight: 600;
    margin-left: 30px;
    margin-top: 40px;
 }
  a{
    text-decoration: none;
    color: #999;
  }
  .is-selected {
  color: #009eef;
  background: #a8d2eb;

 }
</style>
