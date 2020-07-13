<template>
  <div class="goods" v-if="shopInfo">
    <!--商家推荐-->
    <div
      class="recommend"
      v-for="(item, index) in shopInfo.recommend"
      :key="index"
    >
      <p class="recommend-name">{{ item.name }}</p>
      <div class="recommend-wrap">
        <ul>
          <li v-for="(v, i) in item.items" :key="i">
            <img :src="v.image_path" alt="" />
            <div class="recommend-food">
              <p class="recommend-food-name">{{ v.name }}</p>
              <p class="recommend-food-zm">
                {{ v.month_sales }}好评率{{ v.satisfy_rate }}
              </p>
            </div>
            <div class="recommend-food-price">
              <p>¥{{ v.activity.fixed_price }}</p>
              <cart-controll :food="v"></cart-controll>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--商家分类-->
    <div class="menuview">
      <!--左侧分类列表-->

      <div class="menu-wrapper" ref="menuScroll">
        <ul>
          <li
            v-for="(item, index) in shopInfo.menu"
            :key="index"
            @click="selectMenu(index)"
            :class="{ current: currentIndex === index }"
          >
            <img v-if="item.icon_url" :src="item.icon_url" alt />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>

      <!--右侧商品内容-->
      <div class="foods-wrapper" ref="foodScroll">
        <ul>
          <li
            class="food-list-hook"
            v-for="(item, index) in shopInfo.menu"
            :key="index"
          >
            <!--内容上-->
            <div class="category-title">
              <strong>{{ item.name }}</strong>
              <span>{{ item.description }}</span>
            </div>

            <!--内容下-->
            <div class="fooddetails" 
                  @click="handle(food)"
                  v-for="(food, i) in item.foods" :key="i">
              <!-- 左 -->
              <img :src="food.image_path" alt />
              <!-- 右 -->
              <section class="fooddetails-info">
                <h4>{{ food.name }}</h4>
                <p class="fooddetails-des">{{ food.description }}</p>
                <p class="fooddetails-sales">
                  月售{{ food.month_sales }}份 好评率{{ food.satisfy_rate }}
                </p>
                <div class="fooddetails-price">
                  <span class="price">¥{{ food.activity.fixed_price }}</span>
                  <CartControll :food="food" />
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--购物车-->
    <shop-cart   :shopInfo = 'shopInfo'></shop-cart>
    <food :food='detailFood'
         :isShow="showFood"
         @close = 'showFood = false'
         >
         </food>
  </div>
</template>

<script>
import CartControll from "@/components/Shops/CartControll";
import BScroll from "better-scroll";
import ShopCart from '@/views/Shops/ShopCart'
import Food from './Food'
export default {
  name: "goods",
  data() {
    return {
      shopInfo: null,
      menuScroll: {},
      foodScroll: {},
      scrollY: 0, // 右侧菜单当前滚动到的y值
      listHeight: [], // 12个区列表高度
      detailFood:null,
      showFood:false
    };
  },
  created() {
    this.getData();
  },
  computed: {
    //根据右侧滚动的位置，确定对应的索引下标
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        //判断是否在两个高度之间
        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    handle(food){
      this.detailFood = food;
      this.showFood = true;
    },
    getData() {
      this.axios("/api/profile/batch_shop").then(res => {
        res.data.recommend.forEach(recommend => {
          recommend.items.forEach(item => {
            return (item.count = 0);
          });
        });
        res.data.menu.forEach(menu => {
          menu.foods.forEach(food => {
            food.count = 0;
          });
        });
        this.shopInfo = res.data;
        console.log(this.shopInfo);
        this.$nextTick(() => {
          this.initScroll();
          //计算12个区的高度
          this.calculateHeight();
        });
      });
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true
      });
      // console.log(this.foodScroll);
      this.foodScroll.on("scroll", pos => {
        //console.log(pos.y);
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY);
      });
    },
    selectMenu(index) {
      let foodList = document.querySelectorAll(".food-list-hook");
      let el = foodList[index];
      this.foodScroll.scrollToElement(foodList[index], 250);
    },
    calculateHeight() {
      let foodList = document.querySelectorAll(".food-list-hook");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length - 1; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    }
  },
  components: {
    CartControll,
    ShopCart,
    Food
  }
};
</script>

<style scoped>
.goods {
  position: relative;
  height: calc(100% - 10.666667vw);
}
.recommend {
  padding-top: 4.266667vw;
  background-color: #fff;
}
.recommend-name {
  padding-left: 4.266667vw;
  color: #333;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 2.666667vw;
}
.recommend-wrap {
  overflow-x: scroll;
  display: flex;
  width: 100%;
}
.recommend-wrap ul {
  display: flex;
  padding-left: 4.266667vw;
}
.recommend-wrap ul li {
  flex: none;
  width: 32vw;
  margin-right: 2.666667vw;
}
.recommend-wrap li img {
  display: block;
  width: 32vw;
  height: 32vw;
}
.recommend-food .recommend-food-name {
  color: #333;
  font-size: 24px;
  margin: 1.866667vw 0 1.233333vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 0 !important;
}
.recommend-food-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.266667vw;
}
.recommend-food .recommend-food-zm {
  color: #999;
  font-size: 24px;
  margin-bottom: 1.966667vw;
}
/*商家分类*/
.menuview {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 10.8vw;
  background-color: #fff;
  display: flex;
  overflow: hidden;
}
.menu-wrapper {
  height: calc(100vh - 12.8vh);
  background-color: #f8f8f8;
  padding-bottom: 10.666667vw;
  overflow-y: hidden;
  width: 20.533333vw;
}
.menu-wrapper li {
  padding: 4.666667vw 2vw;
  font-size: 24px;
  color: #666;
  line-height: 1.2;
}
.menu-wrapper li img {
  max-width: 100%;
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: top;
  margin-right: 0.8vw;
}
.foods-wrapper {
  /* height: 100%; */
  height: calc(100vh - 12.8vh);
  width: 79.466667vw;
  padding-bottom: 10.666667vw;
}
.category-title {
  margin-left: 2.666667vw;
  padding: 2vw 8vw 2vw 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.category-title strong {
  margin-right: 1.333333vw;
  font-weight: 700;
  font-size: 24px;
  color: #666;
  flex: none;
}
.category-title span {
  flex: 1;
  color: #999;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fooddetails {
  min-height: 30.666667vw;
  padding: 2.666667vw 0 2.666667vw 2.666667vw;
  margin-bottom: 0.133333vw;
  display: flex;
}
.fooddetails img {
  width: 25.333333vw;
  height: 25.333333vw;
  flex: none;
  margin-right: 2.666667vw;
  border-radius: 0.533333vw;
}
.fooddetails-info {
  flex: 1;
  padding-bottom: 6.666667vw;
  padding-right: 4vw;
}
.fooddetails-info h4 {
  padding-right: 4vw;
  font-weight: 700;
  overflow: hidden;
  font-size: 24px;
  white-space: nowrap;
  width: 40vw;
  text-overflow: ellipsis;
  color: #333;
}
.fooddetails-des {
  margin: 1.333333vw 0;
  font-size: 24px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 42.666667vw;
}
.fooddetails-sales {
  margin: 1.733333vw 0 !important;
  color: #999;
  font-size: 24px;
  line-height: 1;
  min-height: 1em;
}
.fooddetails-price .price {
  font-size: 24px;
  line-height: 4.266667vw;
  color: #ff5339;
  padding-bottom: 0.933333vw;
  display: flex;
  align-items: baseline;
}
.menu-wrapper .current {
  background: #fff;
  color: red !important;
}
</style>
