<template>
  <div class="comment" v-if="evaluation">
    <!--商家评分-->
    <section class="rating-wrap">
      <div class="rating-info">
        <h4>{{ evaluation.rating.shop_score.toFixed(1) }}</h4>
        <div class="shop-score">
          <span>商家评分</span>
          <rating :rating="evaluation.rating.shop_score"></rating>
        </div>
      </div>
      <div class="other-score">
        <div class="tp-score">
          <div>
            <span>味道</span>
            <p>{{ evaluation.rating.taste_score.toFixed(1) }}</p>
          </div>
          <div>
            <span>包装</span>
            <p>{{ evaluation.rating.package_score.toFixed(1) }}</p>
          </div>
        </div>
        <div class="rider-score">
          <span>配送</span>
          <p>{{evaluation.rating.rider_score.toFixed(1)}}</p>
        </div>
      </div>
    </section>
    <!-- 评论区 -->
    <div class="shop-info">
      <!-- 标签 -->
      <ul class="tags">
        <li
          :class="{'unsatisfied':item.unsatisfied}"
          v-for="(item,index) in evaluation.tags"
          :key="index"
        >
          {{item.name}}
          <span v-if="item.count > 0">{{item.count}}</span>
        </li>
      </ul>
      <!-- 内容 -->
      <ul class="comments-wrap">
        <li v-for="(item,index) in evaluation.comments" :key="index">
          <div class="comment-user">
            <img
              :src="item.avatar || 'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'"
              alt
            >
          </div>
          <div class="comments-info">
            <div class="comment-name">
              <h4>{{item.username}}</h4>
              <small>{{item.rated_at}}</small>
            </div>
            <div class="comment-rating">
              <Rating :rating="item.rating"/>
              <span
                :style="{color: ratingcontent(item.rating).color}"
              >{{ratingcontent(item.rating).txt}}</span>
            </div>
            <div class="comment-text">{{item.comment_text}}</div>
            <div class="comment-reply">{{item.reply.content}}</div>
            <ul class="comment-imgs">
              <li v-for="(img,i) in item.order_images" :key="i">
                <img :src="img.image_hash" alt>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/Rating";
export default {
  name: "comments",
  created() {
    this.getData();
  },
  data() {
    return {
      evaluation: null
    };
  },
  methods: {
    getData() {
      this.axios("/api/profile/comments").then(res => {
        console.log(res.data);
        this.evaluation = res.data;
      });
    },
    ratingcontent(rating) {
      const content = [
        { txt: "吐槽", color: "rgb(137,159,188)" },
        { txt: "较差", color: "rgb(137, 159, 188)" },
        { txt: "一般", color: "rgb(251, 154, 11)" },
        { txt: "满意", color: "rgb(251, 154, 11)" },
        { txt: "超赞", color: "rgb(255, 96, 0)" }
      ];
      return content[rating - 1];
    }
  },
  components: {
    Rating
  }
};
</script>

<style scoped>
.comment{
  height:calc(100vh - 10.66667vh);
}
.rating-wrap{
  display: flex;
  padding: 5.333333vw 0 8vw 6.4vw;
  background-color: #fff;
}
.rating-info{
  display: flex;
  justify-content: space-between;
  width: 33.6vw;
  align-items: center;
  color: #666;
}
.rating-info h4 {
  align-items: center;
  font-size: 24px;
  color: #ff6000;
}
.rating-info .shop-score {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.other-score{
  flex: 1;
  display: flex;
  justify-content:space-between;
  align-items: center
}
.tp-score{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding: 0 7.2vw;
  align-items: center;
}
.tp-score > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tp-score > div > span,
.rider-score > span {
  font-size: 20px;
  margin-bottom: 1.333333vw;
}
.rider-score {
  width: 22.933333vw;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shop-info {
  background-color: #fff;
  padding: 2.666667vw 3.2vw 0;
  font-size: 24px;
}
.tags {
  padding-bottom: 2.666667vw;
  border-bottom: 1px solid #eee;
}
.tags li {
  color: #6d7885;
  background-color: #ebf5ff;
  display: inline-block;
  padding: 0 2.4vw;
  height: 7.466667vw;
  line-height: 7.466667vw;
  margin: 0.933333vw;
  font-size: 24px;
  border-radius: 0.533333vw;
}

.unsatisfied {
  color: #aaa !important;
  background-color: #f5f5f5 !important;
}

.comments-wrap > li {
  padding: 4vw 0 3.2vw;
  border-bottom: 0.133333vw solid #eee;
  display: flex;
}
.comment-user {
  width: 10.666667vw;
}
.comment-user img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.comments-info {
  flex: 1;
  font-size: 24px;
}
.comment-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-name h4 {
  margin-top: 0;
  color: #333;
  margin-right: 1.6vw;
}
.comment-name small {
  font-size: 24px;
  color: #999;
}
.comment-rating {
  display: flex;
  margin: 1.6vw 0 0.533333vw;
  align-items: center;
}
.comment-rating > span {
  font-size: 24px;
  margin-left: 1.066667vw;
}
.comment-text {
  color: #333;
  word-break: break-word;
  margin: 2.133333vw 0;
}
.comment-reply {
  margin: 2.666667vw 0;
  padding: 2.666667vw;
  border-radius: 1.066667vw;
  background: #f3f3f3;
  position: relative;
  font-size:24px;
}
.comment-reply::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 4vw;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 2.133333vw 2.133333vw;
  border-color: transparent transparent #f3f3f3;
}
.comment-imgs {
  margin-top: 1.066667vw;
  margin-bottom: 3.2vw;
}
.comment-imgs > li {
  display: inline-block;
  margin: 0 0.533333vw;
}
.comment-imgs > li img {
  width: 40vw;
  height: 40vw;
}
</style>
