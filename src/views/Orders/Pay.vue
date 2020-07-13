<template>
  <div class="pay">
    <Header title="在线支付" />
    <div class="main" v-if="orderInfo">
      <div class="tip">
        <p class="countdown-title">支付剩余时间</p>
        <h3 class="countdown-text">{{ countDown }}</h3>
      </div>
    </div>

    <section class="home">
      <ul class="list info-list">
        <li>
          <span class="order-name">{{ orderInfo.shopInfo.name }}</span>
          <span class="text-highlight">¥{{ totalPrice }}</span>
        </li>
      </ul>
      <div class="title">在线支付</div>
      <ul class="list payment-list">
        <li class="payment-list-item">
          <div class="icon">
            <img src="../../assets/wechart.jpg" alt />
            <span>微信</span>
          </div>
          <i class="fa fa-check-circle selected"></i>
        </li>
      </ul>
    </section>
    <button @click="pay" :disabled="timeOut" class="btn-submit">
      确认支付
    </button>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "pay",
  components: {
    Header
  },
  data() {
    return {
      countDown: "00:15:00",
      timer: null,
      timeOut: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(la => {
      la.countTimeDown();
      la.addOrder();
    });
  },
  methods: {
    pay() {
      const data = {
        body: "爱吃外卖",
        out_trade_no: new Date().getTime().toString(),
        total_fee: 1
      };
      // 请求 http://www.thenewstep.cn/wxzf/example/jsapi.php
      fetch("http://www.thenewstep.cn/wxzf/example/jsapi.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          this.onBridgeReady(data);
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    onBridgeReady(data) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          //生成订单
          
        }
      });
    },
    addOrder(){
      let orderlist = {
        orderInfo:this.orderInfo,
        userInfo:this.userInfo,
        totalPrice:this.totalPrice,
        remarkInfo:this.remarkInfo
      };
      this.axios.post(`/api/user/add_order/${localStorage.love_login}`,orderlist)
      .then(res=>{
        this.$router.push('/order')
      })
    },
    countTimeDown() {
      let minute = 14;
      let second = 59;
      this.timer = setInterval(() => {
        second--;
        if (second == "00" && minute == "00") {
          this.countDown = "订单已超时";
          clearInterval(this.timer);
          this.timeOut = true;
          return;
        }
        if (second == "00") {
          second = 59;
          minute--;
          if (minute < 10) {
            minute = "0" + "minute";
          }
        }
        if (second < 10) {
          second = "0" + second;
        }
        this.countDown = "00:" + minute + ":" + second;
      }, 1000);
    }
  },
  computed: {
    orderInfo() {
      return this.$store.getters.orderInfo;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    remarkInfo() {
      return this.$store.getters.remarkInfo;
    }
  }
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 65px;
}
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.tip {
  display: block;
  text-align: center;
  background-color: #fff;
  color: #333;
  padding: 85px;
  line-height: 54px;
}
.countdown-title {
  font-size: 24px;
  color: #999;
}
.countdown-text {
  height: 24px;
  color: #333;
  font-size: 24px;
}
.list {
  border-bottom: 0.5px solid #eee;
  background: #fff;
}
.info-list {
  padding: 0 15px;
}
.info-list li {
  border-top: 0.5px solid #eee;
  display: flex;
  padding: 14px 0;
  font-size: 24px;
  line-height: 1rem;
  justify-content: space-between;
}
.info-list li .order-name {
  color: #333;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
  max-width: 60%;
}
.text-highlight {
  color: #ff6000;
}
.title {
  background-color: #f5f5f5;
  font-size: 24px;
  padding: 22px;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.payment-list-item {
  border-bottom: 0.5px solid #eee;
  padding: 0.9rem 1rem;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: flex;
  align-items: center;
}
.payment-list-item img {
  width: 64px;
  height: 64px;
  margin-right: 20px;
}
.payment-list-item > i {
  font-size: 24px;
  color: #eee;
}
.selected {
  color: #4cd964 !important;
}
.btn-submit {
  font-size: 34px;
  line-height: 30px;
  background-color: #4cd964;
  width: 100%;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 25px;
  box-sizing: border-box;
}
/* 不可点击btn */
.btn-submit[disabled] {
  background-color: #bbb !important;
}
</style>
