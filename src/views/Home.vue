<template>
  <div class="home">
      <div class="header">
          <div class="address_map"
             @click="$router.push({name:'address',params:{city:city}
           }) " >
             <i class="map-marker"></i>
             <span class="address">收货地址:{{address}}</span>
             <i class="desc"></i>
          </div>  
      </div>
      <div class="search_wrap" :class="{filterView:showFilter}">
         <div 
            class="shop_search"
            @click="$router.push('/search')"
         >
              <i class="search"></i>
              搜索商家  商家名称
          </div>
      </div>
      <div class="container" >
        <!--轮播-->
        <mt-swipe :auto="4000" class="swiper">
          <mt-swipe-item v-for="(img,index) in swipeImgs" :key='index'>
             <img :src="img" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <!--分类-->
         <mt-swipe :auto="0" class="entries">
          <mt-swipe-item v-for="(entry,i) in entries" :key='i'  class="entry_wrap">
             <a href="#" class="foodentry" v-for="(item,index) in entry" :key="index">
                  <div class="img_wrap">
                      <img :src="item.image" alt="">
                  </div>
                  <span>{{item.name}}</span>
             </a>
             <div class="clear"></div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!--推荐商家-->
      <div class="shoplist-title">推荐商家</div>
      <!--导航-->
      <FilterView 
        :filterData="filterData" 
        @update='update'
        @searchFixed='showFilterView'>
      </FilterView>

      <!--商家信息-->
     
      <mt-loadmore 
                  :top-method="loadData" 
                  :bottom-method="loadMore" 
                  :auto-fill = "false"
                  :bottom-all-loaded="allLoaded"
                  :bottomPullText="bottomPullText"
                  ref="loadmore"
                  >
         <div class="shoplist">
            <IndexShop v-for="(item,index) in restaurants"
            :key='index'
            :restaurant='item.restaurant'>
            </IndexShop>
        </div>
      </mt-loadmore>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Loadmore } from "mint-ui";
import FilterView from '../components/FilterView';
import IndexShop from '../components/IndexShop';

export default {
  
  name: 'home',
  data () {
    return {
      swipeImgs:[],
      entries:[],
      filterData:null,
      showFilter:false,
      page:1,
      size:5,
      allLoaded: false,
      restaurants:[],  //存放商家的所有信息
      bottomPullText:'上拉加载更多',
      
    }
  },
  components: {
    FilterView,
    IndexShop,
    
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city(){
      return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province;
    }
  },
  created () {
    this.getData()
  },
  methods: {
    showFilterView(i){
      this.showFilter = i;
    },
    getData(){
      this.axios('/api/profile/shopping').then(res=>{
        //console.log(res.data);
        this.swipeImgs = res.data.swipeImgs;
         this.entries = res.data.entries;
      })
      .catch();
      this.axios("/api/profile/filter").then(res=>{
        //console.log(res.data);
        this.filterData = res.data;
      });
      //获取商家信息
      this.axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res=>{
        // console.log(res.data);
        this.restaurants = res.data;
      });
    },
    update (condition) {
      // console.log(condition);
    },
    loadData(){
        this.page = 1; 
        this.allLoaded = false;
        this.bottomPullText = "上拉加载更多";
       //获取商家信息
        this.axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res=>{
        this.$refs.loadmore.onTopLoaded();//表示已经加载完了
        this.restaurants = res.data;
      });
    },
     loadMore(){
      if (!this.allLoaded) {
        this.page ++;
        // 拉取商家信息
        this.axios.post(`/api/profile/restaurants/${this.page}/${this.size}`)
          .then(res => {
            //  加载完之后重新渲染
            this.$refs.loadmore.onBottomLoaded();
            if (res.data.length > 0) {
              res.data.forEach(item => {
                this.restaurants.push(item);
              });
              if (res.data < this.size) {
                this.allLoaded = true;
                this.bottomPullText = "没有更多了哦";
              }
            } else {
              // 数据为空
              this.allLoaded = true;
              this.bottomPullText = "没有更多了哦";
            }
          });
      }
    }
  }

}
</script>

<style scoped>
.home{
width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
 
}
.header ,.search_wrap{
  background-color: #009eef;
  padding: 16px;
   font-size: 26px;
}
.address_map{
  font-size: 32px;
  width: 98%;
  padding-left: 2%;
}
.map-marker{
  width: 30px;
  height: 30px;
  display: block;
  background: url(../assets/address.png) no-repeat;
  background-size: 30px 30px; 
  float: left;
  padding-right: 3px;
}

.desc{
  width: 30px;
  height: 30px;
  display: block;
  background: url(../assets/sort-desc.png) no-repeat;
  background-size: 30px 30px; 
  position: absolute;
  right: 3px;
  top: 12px;
}
.search{
  width: 40px;
  height: 40px;
  display: block;
  background: url(../assets/search.png) no-repeat;
  background-size: 40px 40px; 
  position: absolute;
  left: 210px;
  top: 38px;
}
.search_wrap .shop_search {
  background-color: #fff;
  padding: 24px 0;
  font-size: 30px;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search_wrap {
  position: sticky;
  top:0px;
  z-index: 999;
  box-sizing: border-box;
  position: -webkit-sticky;
}
.swiper {
  height: 270px;
}
.swiper img{
  width: 100%;
  height: 270px;
}
.entries{
  background: #fff;
  height: 44.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry{
  width: 20%;
  float: left;
  display: block;
  height:150px;
}
.foodentry .img_wrap{
  display: inline-block;
  width: 93.75px;
  height: 93.75px;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.34rem;
}
/* 推荐商家 */
.shoplist{
  margin-bottom: 190px;
}
.shoplist-title{
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 34px;
  line-height: 20px;
  font-size: 28px;
  margin-top: 12px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before{
  content: "--"
}
.clear{
  clear: both;
}
.filterView{
  width: 100%;
  position: fixed;
  top:0;
  z-index: 999;
}
.mint-loadmore{
  touch-action: none;
  height: calc(100%-95px);
} 

</style>

