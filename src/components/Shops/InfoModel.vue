<template>
<transition name="slide-fade">
  <div class="info-model" v-show="showInfoModel">
    <div class="brief-model">
      <h2>
        <i v-if="rst.is_premium">品牌</i>
        <span>{{ rst.name }}</span>
      </h2>
      <ul>
        <li>
          <h3>{{ rst.rating }}</h3>
          <p>评分</p>
        </li>
        <li>
          <h3>{{ rst.recent_order_num }}</h3>
          <p>月售</p>
        </li>
        <li v-if="rst.delivery_mode">
          <h3>锋鸟专送</h3>
          <p>约{{ rst.order_lead_time }}分钟</p>
        </li>
        <li>
          <h3>¥{{ rst.float_delivery_fee }}元</h3>
          <p>配送费</p>
        </li>
        <li>
          <h3>{{ (rst.distance / 1000).toFixed(1) }}km</h3>
          <p>距离</p>
        </li>
      </ul>
      <h3 class="promotion">
        <span>公告</span>
      </h3>
      <p class="brief-modal-yx">{{ rst.promotion_info }}</p>
    </div>
    <!--关闭按钮-->
    <div class="brief-model-close" @click="$emit('close')">
      <img src="../../../src/assets/close.png" alt="" />
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: "infomodel",
  props: {
    rst: Object,
    showInfoModel: Boolean
  }
};
</script>

<style>
.info-model {
  position: fixed;
  width: 100%;
  top: 340px;
  left: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.brief-model {
  position: relative;
  width: 80%;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 7.066667vw 6.666667vw 7.466667vw;
  border-radius: 5px;
  margin-top: 25px;
}
.brief-model h2 {
  font-size: 24px;
  line-height: 6.666667vw;
  color: #333;
  text-align: center;
  font-weight: bolder;
}
.brief-model h2 i {
  position: relative;
  top: -0.533333vw;
  margin-right: 1.6vw;
  border-radius: 0.266667vw;
  background-image: linear-gradient(90deg, #fff100, #ffe339);
  color: #6a3709;
  font-style: normal;
  padding: 0.8vm;
  font-weight: bold;
  font-size: 25px;
}
.brief-model ul {
  display: flex;
  margin: 5.066667vw -6.666667vw 0;
}
.brief-model ul li {
  text-align: center;
  flex: 1;
}
.brief-model ul li h3 {
  font-size: 24pxs;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.6vw;
}
.brief-modal ul li p {
  font-size: 24px;
  color: #999;
}
.brief-model .promotion {
  position: relative;
  text-align: center;
  margin: 4.8vw auto 2.666667vw;
  width: 20.266667vw;
  background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
  background-size: 100% 1px;
  background-position: 50%;
  background-repeat: no-repeat;
}
.brief-model .promotion span {
  font-size: 24px;
  padding: 0 1.066667vw;
  color: #999;
  background-color: #fff;
}
.brief-model-yx {
  font-size: 24px;
  line-height: 1.54;
  color: #333;
  max-height: 26.666667vw;
  overflow-y: auto;
}
.brief-model-close {
  margin-top: 8vw;
  width: 60px;
  height: 60px;
}
.brief-model-close img {
  width: 100%;
  height: 100%;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
