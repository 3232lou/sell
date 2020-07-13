<template>
    <div class="area" ref="area_scroll" v-if="cityInfo">
        <div class="scroll_wrap">
            <!--热门城市-->
            <div class="hot_wrap citylist">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li v-for="(item,index) in cityInfo.hotCities"  :key="index"  @click="$emit('selectCity',item)" >
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <!--所有城市-->
            <div class="city_wrap">
                <!-- 循环按字母排序的key -->
                <div class="city_content citylist"
                    v-for="(item,index) in keys"
                    :key="index"
                >    
                    <div class="title">{{item}}</div>
                     <!-- 根据字母key展示城市名 -->
                    <ul class="citys">
                        <li
                            v-for="(city,index) in cityInfo[item]"
                            :key = 'index'
                             @click="$emit('selectCity',city)"
                        >{{city.name}}</li>
                    </ul>
                </div>
            </div>
        </div> <!--scroll_wrap结束-->
        <!--写右侧ABC导航-->
        <div class="area_keys">
            <ul>
                <li @click="selectKey(0)">#</li>
                <li @click="selectKey(index+1)" v-for = '(item,index) in keys' :key='index'>{{item}}</li>
            </ul>

        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name:'Alphabet',
    data () {
        return {
           scroll:null
        }
    },
    props:{
        cityInfo:Object,
        keys:Array
    },
    methods:{
        initScroll(){
            this.scroll = new BScroll(this.$refs.area_scroll,{
                click:true
            });
        },
        selectKey(index){
            //console.log(this.$refs.area_scroll.getElementsByClassName('citylist')[3]);
            const citylist = this.$refs.area_scroll.getElementsByClassName('citylist');
            //根据下标，移动到相应的位置上面
            let ee = citylist[index];
           
            //滚动到对应的位置
            this.scroll.scrollToElement(ee, 250);
            console.log(ee);

        }
    }
}
</script>
<style scoped>
    .area{
        margin-top: 10px;
        box-sizing: border-box;
        padding: 0 16px;
        background: #fff;
        height: calc(100% - 60px);
        overflow: hidden;
    }
    .scroll_wrap{
        background: #fff;
        overflow: auto;
    }
    .title {
        color: #aaa;
        padding: 15px 0;
        font-size: 30px;
        font-weight: 400;
    }
    .hot_city{
        padding: 0 20px;
        display: flex;
        font-size: 30px;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .hot_city li{
        width: 30%;
        background: #f1f1f1;
        margin: 0 20px 20px 0;
        padding: 20px;
        text-align: center;
        box-sizing: border-box;
    }
    .city_content li {
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .citys{
        font-size: 30px;
    }
    .area_keys{
        position: fixed;
        right: 0;
        top: 20%;
        color: #aaa;
        line-height: 35px;
        padding: 0 5px;
        text-align: center;
        font-size: 28px;
    }
</style>


