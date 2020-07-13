<template>
  <div class="search">
    <Hearder :isLtft="true"></Hearder>
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="key_word"
          placeholder="请输入商家信息、商品信息"
        />
        <button @click.prevent="searchHandle">搜索</button>
      </form>
    </div>
    <div class="shop" v-if="result &&  !showShop">
      <div class="empty_wrap" v-if="empty">
        <img src="../assets/waimai.png" alt="">
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试一试吧</span>
        </div>
      </div>
      <div v-else>
        <search-index @click="$router.push('/shop')" :data="result.restaurants"></search-index>
        <search-index @click="showItemClick" :data="result.words"></search-index>
      </div>
    </div>

    <div class="container" v-if="showShop">
      <!--导航-->
      <FilterView 
        :filterData="filterData" 
        @update='update'
        >
      </FilterView>

    </div>
  </div>
</template>

<script>
import Hearder from "../components/Header";
import SearchIndex from "../components/SearchIndex";
import FilterView from "@/components/FilterView"

export default {
  name: "Search",
  components: {
    Hearder,
    SearchIndex,
    FilterView
  },
  data() {
    return {
      key_word: "",
      result: null,
      empty:false,
      showShop:false,
      filterData:null
    };
  },
  watch: {
    key_word() {
      this.empty = false;
      this.showShop = false;
      this.keyWordChange();
    }
  },
  methods: {
    keyWordChange() {
      this.axios(`/api/profile/typeahead/${this.key_word}`)
        .then(res => {
          console.log(res.data);
          this.result = res.data;
        })
        .catch(err => {
          this.result = null;
        });
    },
    searchHandle(){
      if(!this.key_word) return;
      if(this.result && (this.result.restaurants.length > 0 ||this.result.words.length >0 )){
        this.showShop = true;
      }else{
        this.empty = true;
      }
    },
    showItemClick(){
      this.showShop = true;
    },
     update (condition) {
      this.data = condation;
      this.showItemClick();
    },
  },
  created(){
     this.axios("/api/profile/filter").then(res=>{
        //console.log(res.data);
        this.filterData = res.data;
      });
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
.search_header {
  margin-top: 105px;
}

.search_header .search_wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search_wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
  position: absolute;
}
.search_wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
.search_wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 30px;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
}
.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}
.empty_wrap{
  display: flex;
  justify-content: center;
}
.empty_wrap img {
  width: 35vw;
  height: 35vw;
}
.empty_txt h4 {
  color: #666;
  font-size: 24px;
  margin: 12vw 0 2vw 0;
}
.empty_txt span {
  color: #999;
  font-size: 24px;
}
</style>
