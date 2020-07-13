<template>
    <section class="index_container">
        <div class="index_shopInfo" @click="$router.push({name:'shop'})">
            <!--左侧图片-->
            <div class="logo_container">
                <img :src="restaurant.image_path" alt="">
            </div>
            <!--右侧内容-->
            <div class="index_main">
                <!--第一行品牌-->
                <div class="index_shopname">
                    <i v-if="restaurant.is_premium">品牌</i>
                    <span>{{restaurant.name}}</span>
                </div>
                <!--第二行星级-->
                <div class="index_rateWrap">
                    <div>
                        <Rating :rating='restaurant.rating'></Rating>
                        <span class="rate">{{restaurant.rating}}</span>
                        <span>月售{{restaurant.recent_order_num}}单</span>
                    </div>
                    <div class="delivery" v-if="restaurant.delivery_mode">
                        <span class="icon_hollow">{{restaurant.delivery_mode.text}}</span>
                    </div>
                </div>
                <!-- 第三行 配送 -->
                <div class="index_moneyLimit">
                    <div>
                        <span>￥{{restaurant.float_minimum_order_amount}}起送</span>
                        |
                        <span>配送费¥{{restaurant.float_delivery_fee}}</span>
                    </div>
                    <div class="index_distanceWrap">
                        <span>{{(restaurant.distance/1000).toFixed(2)}}km</span>
                        |
                        <span>{{restaurant.order_lead_time}}分钟</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Rating from './Rating'
export default {
    name:'IndexShop',
    props: {
        restaurant:Object
    },
    components: {
        Rating
    }
}
</script>

<style scoped>
.index_container{
    background: #fff;
    color: #666;
    border-bottom: 1px solid #eee;
   
}
.index_shopInfo{
    display: flex;
    justify-content: flex-start;
    padding: 35px 30px;
    align-items: stretch;
}
.logo_container{
    width: 180px;
    height: 180px;
}
.logo_container img{
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 20px;
}
.index_main{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    flex-direction: column;
    padding-left: 39px;
    font-size: 26px;
    padding-top: 5px;
}
.index_shopname{
    align-items: center;
    color: #333;
    font-weight: 700;
    font-size: 26px;
}
.index_shopname i{
    background: #ffe800;
    margin-right: 18px;
    padding: 5px 5px;
    text-align: center;
    font-size: 20px;
    border-radius: 5px;
      white-space: nowrap;
}
.index_shopname span{
    text-overflow: ellipsis;
}
.index_rateWrap {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.index_rateWrap .rate {
  margin-right: 12px;
}
.index_moneyLimit{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.index_moneyLimit .index_distanceWrap {
  color: #999;
  margin-left: 12px;
}
.delivery{
    display: flex;
    align-items: center;
   
}
.delivery .icon_hollow{
    color: #fff;
    background: #2395ff;
    padding: 2px;
    box-sizing: border-box;
    margin-top: 10px;
    
}
</style>
