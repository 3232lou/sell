<template>
   <div class="city">
      <div class="search_wrap">
          <div class="search">
              <i class="look"></i>
              <input type="text" v-model="city_val" placeholder="请输入城市名">
          </div>
          <button @click="$router.push({name:'address',params:{
              city:city
          }})">取消</button>
      </div>
      <div style="height:100%" v-if="searchList.length==0">
          <div class="location">
              <Location @click="selectCity({name:city})" :address="city"></Location>
          </div>
          <Alphabet ref="allcity"  @selectCity='selectCity' :cityInfo='cityInfo' :keys="keys"></Alphabet>
      </div>

      <div class="search_list" v-else >
          <ul>
              <li @click='selectCity(item)' v-for="(item,index) in searchList " :key="index">{{item.name}}</li>
          </ul>
      </div>
   </div> <!--city结束-->
</template>


<script>
import Location from '../components/Location'
import Alphabet from '../components/Alphabet'
export default {
    name:'city',
    components:{
        Location,
        Alphabet
    },
    data(){
        return {
            city_val:'',
            cityInfo:null,
            keys:[],
            allCities:[],
            searchList:[]
        };
    },
    created () {
        this.getCityInfo();
    },
    watch: {
       city_val(){
         this.searchCity();
       }
    },
    methods: {
        getCityInfo(){
            this.axios("/api/posts/cities")
            .then(res=>{
                console.log(res.data);
                this.cityInfo = res.data;
                this.keys = Object.keys(res.data);
                this.keys.pop();
                this.keys.sort();
                this.$nextTick(() => {
                    this.$refs.allcity.initScroll();
                });
                // 存储所有城市, 用来搜索过滤
               this.keys.forEach(key => {
                   //console.log(key);
                   this.cityInfo[key].forEach((city)=>{
                       this.allCities.push(city);
                      
                   });
               });
            })//then结束
            .catch(res=>{
                console.log(err);
            });
        },//getCityInfo方法结束
        selectCity(city){
            this.$router.push({name:'address',params:{city:city.name}})
        },//selectCity方法结束
        searchCity(){
            if(!this.city_val){
                //如果搜索框为空，那么我们这个数组为空
                this.searchList=[];  
            }else{
                //如果检索不为空的话那么我们把数据放到searchList
                this.searchList = this.allCities.filter((item)=>{
                    return item.name.indexOf(this.city_val)!=-1;
                });
                //console.log(this.searchList);
          
            }
        }

    },
   computed:{
    city(){
      return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province;
    }
   }//computed计算属性结束
}
</script>

<style scoped>
.city {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 25px;
}
.search_wrap{
    position: fixed;
    top: 0;
    height: 80px;
    line-height: 80px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 3px 16px;
    display: flex;
    justify-content: space-between;
}
.look{
    width: 48px;
    height: 52px;
    background: url(../assets/search.png) no-repeat 12px 22px;
    background-size: 36px 36px ;
    display: block;
    float: left;
}
.search{
    background-color: #eee;
    border-radius: 10px;
    width: 85%;
}
.search input{
    background-color: #eee;
    outline: none;
    border: none;
    display: block;
    float: left;
    padding: 20px 0 20px 10px;
    font-size: 28px;
}
.search_wrap button{
   outline: none;
   border: none;
   color: #009eef;
   border-radius:10px;
   width: 18%;
   margin-left: 5%;
   font-weight: 600;
   font-size: 30px;
   background-color:rgb(245, 237, 237);
}

.location{
    margin-top: 10%;
    margin-left: 5%;
}
.search_list {

  padding: 30px 16px;
  background: #fff;

}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
