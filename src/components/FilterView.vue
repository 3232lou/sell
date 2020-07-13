<template>
    <div :class="{open:isSort || isScreen }" @click.self="hideView">
        <!--导航-->
        <div class="filter_wrap" v-if="filterData" >
            <div class="filter">
                <div class="filter_nav" 
                    v-for="(item ,index) in filterData.navTab"
                    :class="{filter_bold:currentFilter==index}"
                    @click="filterSort(index)"
                    :key=index>
                    <span>{{item.name}}</span>
                    <div v-if="item.icon" :class=" 'filter_' +item.icon"></div>
                </div>
            </div>
        </div>
       <!--排序-->
       <section class="filter_extend" v-if="isSort">
           <ul>
               <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)" >
                   <span :class="{selectName:currentSort==index}">{{item.name}}</span>
                   <i v-if="currentSort==index" class="hook"></i>
                   <div class="clear"></div>
               </li>
           </ul>
       </section>

       <!--筛选-->
       <section class="filter_extend" v-if="isScreen">
           <div class="filter_sort">
               <div v-for="(screen,index) in filterData.screenBy" :key="index" class="morefilter">
                   <p class="title">{{screen.title}}</p>
                   <ul>
                       <li v-for="(item,i) in screen.data"
                          :key="i"
                          :class="{selected:item.select}"
                           @click="selectScreen(item,screen)">
                            <img v-if="item.icon" :src="item.icon" alt="">
                             <span>{{item.name}}</span>
                       </li>
                   </ul>
               </div>
           </div><!--filter_sort结束-->
           <div class="morefilter_btn">
               <span @click="clearFilter" :class="{edit:edit}" class="morefilter_clear">清空</span>
               <span @click="filterOk" class="morefilter_ok">确定</span>
           </div>
       </section>
    </div>
</template>

<script>
export default {
    name:'FilterView',
    props:{
        filterData:Object
    },
    data () {
        return {
            currentFilter:0,
            isSort:false,
            currentSort:0,
            isScreen:false
        }
    },
    computed: {
       edit:function(){
           let edit = false;
           this.filterData.screenBy.forEach(screen =>{
               screen.data.forEach(item=>{
                   if(item.select){
                       edit = true;
                   }
               })
           });
           return edit;
       }  
    },
    methods: {
        filterSort(index){
            this.currentFilter = index;
            switch(index){
                case 0:
                this.isSort = true;
                this.$emit('searchFixed',true);
                break;
                case 1:
                 this.$emit('update',{condition:this.filterData.navTab[1].condition});
                  this.hideView();
                break;
                case 2:
                 this.$emit('update',{condition:this.filterData.navTab[2].condition});
                  this.hideView();
                break;
                case 3:
                 this.isScreen = true;
                 this.isSort = false;
                 this.$emit("searchFixed",true);
                 break;
                default:
                this.hideView();
                break;

            }
        },
        hideView(){
            this.isSort = false;
            this.isScreen = false;
            this.$emit('searchFixed',false);

        },
        selectSort(item,index){
            this.currentSort = index;
            this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
            this.hideView();

            //更新数据
            this.$emit('update',{condition:item.code});
        },
        selectScreen(item,screen){
            if(screen.id !== "MPI"){
                //单选
                screen.data.forEach(element => {
                    element.select = false;
                });
            }
            item.select = !item.select;
        },//selectScreen方法结束
        clearFilter(){
            this.filterData.screenBy.forEach(screen =>{
                screen.data.forEach(item =>{
                    item.select = false;
                });
            })
        },
        filterOk(){
           let screenData = {
               MPI:"",
               offer:"",
               per:""
           };
           let mpiStr = "";
           this.filterData.screenBy.forEach(screen=>{
               screen.data.forEach((item,index)=>{
                   if(item.select){
                       //两种情况 1.多选 2.单选
                       if(screen.id !=="MPI"){
                           //单选
                            screenData[screen.id] =item.code;
                       }else{
                           //多选
                            mpiStr +=item.code +",";
                            screenData[screen.id] = mpiStr;

                       }
                   }
               });
           });
           //console.log(mpiStr);
            this.$emit('update',{condition:screenData});
           this.hideView(); 
        }
    }
     
}
</script>

<style scoped>
.filter_wrap{
    background: #fff;
    position: sticky;
    top: 110.4975px;
}
.filter {
    position: relative;
    border-bottom: 1px solid #ddd;
    line-height: 10.4vw;
    height: 40px;
    display: flex;
    justify-content: space-around;
    padding-bottom: 32px;
}
.filter_nav {
    flex: 1;
    text-align: center;
    color: #666;
    font-size: 28px;
}
 .filter_filter {
    width: 50px;
    height: 44px;
    margin-left: 64%;
    margin-top: -33.5%;
    background-size:24px 20px; 
    background:url(../assets/choose.png) no-repeat;
}
.filter_caret-down{
    width: 40px;
    height: 20px;
    margin-left: 85%;
    margin-top: -24%;
    background-size:20px 20px; 
    background:url(../assets/1_03.png) no-repeat;
}
.filter_bold{
    font-weight: 600;
    color: #333;
}
.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  /* z-index: 3; */
}
.filter_extend{
    background: #fff;
    color: #333;
    padding-top: 12px;
    width: 100%;
    position: absolute;
    top: 182px;
    left: 0;
    z-index: 4;
}
.filter_extend li{
    line-height: 65px;
    padding-left: 22px;
    font-size: 28px;
    overflow: hidden;
}
.hook{
    width: 32px;
    height: 32px;
    background: url(../assets/hook.png) no-repeat;
    background-size: 32px 32px;
    display: block;
    float: right;
    padding-right: 16px;
    margin-top: 12px;
}
.selectName{
    color:rgb(0, 92, 128);
    font-weight: bold;
}
/*筛选*/
.filter_sort{
    background: #fff;
    padding: 0 28px;
    line-height: normal;
}
.morefilter{
    overflow: hidden;
    margin: 28px 0;
}
.morefilter .title{
    margin-bottom: 12px;
    color: #666;
    font-size: 28px;
}
.morefilter ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 22px;
}
.morefilter li{
    box-sizing: border-box;
    width: 30%;
    height: 58px;
    line-height: 58px;
    margin: 12px 1%;
}
.morefilter li img {
  width: 36px;
  height: 36px;
  vertical-align: middle;
  margin-right: 12px;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}
.morefilter_btn{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fafafa;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
    line-height: 90px;
    box-sizing: border-box;
}
.morefilter_btn span{
    font-size: 28px;
    text-align: center;
    text-decoration: none;
    flex: 1;
}
.morefilter_clear{
    color: #ddd;
    background: #fff;
}
.morefilter_ok{
    color: #fff;
    background: #00d762;
    border: 1px solid #00d762;
}
.selected {
    color: #3190e8 !important;
    background-color: #edf5ff !important;
}
.edit{
    color: #333 !important;
}
.clear{
    clear: both;
}
</style>
