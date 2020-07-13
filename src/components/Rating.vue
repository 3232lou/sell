<template>
     <div class="Rating_gray">
        <i v-for="(item,index) in itemClass" :key="index" class="fa" 
         :class="item">
         </i>
    </div>
</template>

<script>
//星星的总长度
const length = 5;
// 星星对应的class
const cls_on = "fa-star";
const cls_half = "fa-star-half-empty";
const cls_off = "fa-star-o";
export default {
    name:'Rating',
    props:{
        rating:Number
    },
    computed: {
        itemClass(){
            let result = [];
            //对分数进行处理
            let score = Math.floor(this.rating*2)/2;

            //控制半星 =>返回的是ture或者false
            let hasDecimal = score%1 !== 0;

            //全星
             let integer = Math.floor(score);

             //全星放到数组当中
             for(let i=0; i<integer;i++){
                 result.push(cls_on);
             }

             //半星
             if(hasDecimal){
                 result.push(cls_half);
             }
             //补全5个星
             while(result.length < length){
                 result.push(cls_off);
                //  result.length ++;
             }
             return result;
        }
    }
}
</script>

<style scoped>
.Rating_gray{
    color: #ffbe00;
    padding: 10px 0;
    display: inline-block;
}
</style>
