<template>
  <div class="ratings">
  <div>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{toFixedFun(scores.overall_score)}}</h1>
          <div class="title">综合评价</div>
          <div class="rank">高于周边商家{{toFixedFun(scores.compare_rating * 100)}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="scores.service_score"></star>
            <span class="score">{{scores.service_score}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="scores.food_score"></star>
            <span class="score">{{toFixedFun(scores.food_score)}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{scores.deliver_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect  @increment="incrementTotal" :select-type="selectType" :only-content="false" :ratings="ratings"></ratingselect>
    <div class="rating-wrapper border-1px">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img :src="rating.avatar?  _recombineImg(rating.avatar,'60'): avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.rating"></star>
              <span class="delivery" v-show="rating.deliveryTime">
                {{rating.deliveryTime}}
              </span>
            </div>
            <p class="text">{{rating.rating_text}}</p>
            <div class="imgs" v-if="rating.order_images &&rating.order_images.length">
               <img  class="img" v-for="item in rating.order_images" :src="item.image_hash?  _recombineImg(item.image_hash,'142'): ''" alt="" width="28" height="28">
            </div>
            <div class="recommend" v-if="rating.food_ratings &&rating.food_ratings.length">
              <!-- <i class="iconfont icon-damuzhi"></i> -->
              <span  class="item" v-for="item in rating.food_ratings" >{{item.rate_name}}</span>
            </div>
            <div class="time">
              {{rating.rated_at}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import star from "../star/star.vue";
import split from "../split/split.vue";
import ratingselect from "../ratingselect/ratingselect.vue";
import { formatDate } from "../../common/js/date";
import data from "common/json/ratings.json";
import { recombineImg } from "common/js/util";
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
const ALL = 2;
//  const ERR_OK = 0;
export default {
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      avatar:
        "https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/",
      scores: {
        compare_rating: 0.5777777777777777,
        deliver_time: 29,
        food_score: 4.52043,
        order_rating_amount: 459,
        overall_score: 4.87852,
        service_score: 5
      }
    };
  },
  created() {
    //      this.$http.get('/api/ratings').then((response) => {
    //        response = response.body;
    //        if (response.errno === ERR_OK) {
    //          this.ratings = response.data;
    //          this.$nextTick(() => {
    //            console.log(this.$el);
    //            this.scroll = new BScroll(this.$el, {click: true});
    //          });
    //        }
    //      });
    console.log(this.scores);
    this.ratings = data;
    this.$nextTick(() => {
      console.log(this.$el);
      this.scroll = new BScroll(this.$el, { click: true });
    });
  },
  methods: {
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    _recombineImg(url, size) {
      return recombineImg(url, size);
    },
    toFixedFun(value) {
      return parseFloat(value).toFixed(1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      console.log(time);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    star,
    split,
    ratingselect
  }
};
</script>
<style lang="less" scoped>
@import "../../common/stylus/mixin.less";

.ratings {
  position: absolute;
  top: 1.74rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: 0.1rem 0 0.1rem 0.1rem;

    .overview-left {
      flex: 0 0 1.37rem;
      width: 1.37rem;
      padding: 0.06rem 0rem;
      border-right: 0.01rem solid rgba(7, 17, 27, 0.1);
      text-align: center;

      // @media only screen and (max-width: 320rem) {
      //   flex: 0 0 1.37rem;
      //   width: 1.37rem;
      // }

      .score {
        font-size: 0.28rem;
        line-height: 0.4rem;
        font-weight: 400;
        color: #ff6000;
        font-weight: 700;
        display: block;
      }

      .title {
        margin-bottom: 0.08rem;
        line-height: 0.12rem;
        font-size: 0.12rem;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 0.1rem;
        font-size: 0.12rem;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 0.06rem 0 0.06rem 0.24rem;

      @media only screen and (max-width: 3.2rem) {
        padding-left: 0.06rem;
      }

      .score-wrapper {
        line-height: 0.18rem;
        margin-top: 0.05rem;
        font-size: 0;

        .title {
          display: inline-block;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 0.12rem;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(266, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          display: inline-block;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(7, 17, 27);
        }

        .delivery {
          display: inline-block;
          margin-left: 0.12rem;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 0.18rem;

    .rating-item {
      display: flex;
      padding: 0.18rem 0;
      .border-1px(rgba(1, 17, 27, 0.1));
      align-self: flex-start;
      .avatar {
        flex: 0 0 0.28rem;
        display: flex;
        align-self: flex-start;
        width: 0.28rem;
        margin-right: 0.12rem;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 0.05rem;
          line-height: 0.12rem;
          font-weight: 700;
          font-size: 0.1rem;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 0.06rem;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 0.16rem;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            font-size: 0.1rem;
            line-height: 0.12rem;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          line-height: 0.18rem;
          color: rgb(7, 17, 27);
          font-size: 0.12rem;
          margin-bottom: 0.08rem;
        }
        .imgs {
          .img {
            width: 0.71rem;
            height: 0.71rem;
            padding: 0 0.1rem;
          }
        }

        .recommend {
          line-height: 0.16rem;
          font-size: 0;

          .iconfont,
          .item {
            display: inline-block;
            margin: 0 0.08rem 0.04rem 0;
            font-size: 0.09rem;
          }

          .iconfont {
            color: rgb(0, 160, 220);
          }

          .item {
            padding: 0 0.06rem;
            border: 0.01rem solid rgba(7, 17, 27, 0.1);
            border-radius: 0.01rem;
            color: rgb(147, 153, 159);
            background: #ffffff;
            //  width: 0.4rem;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // display: inline-block;
            // -webkit-line-clamp: 1;
            // -webkit-box-orient: vertical;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 0.12rem;
          font-size: 0.1rem;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
