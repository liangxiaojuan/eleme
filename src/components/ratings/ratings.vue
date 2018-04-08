<template>
  <div class="ratings">
  <div>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.rating}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rating}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.rating"></star>
            <span class="score">{{seller.rating}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.rating"></star>
            <span class="score">{{seller.rating}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.rating}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect  @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
    <div class="rating-wrapper border-1px">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">
                {{rating.deliveryTime}}
              </span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
              <i class="iconfont icon-damuzhi"></i>
              <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
            </div>
            <div class="time">
              {{rating.rateTime | formatDate}}
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
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
const ALL = 2;
//  const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: true
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
    console.log(this.seller);
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
@import '../../common/stylus/mixin.less';

.ratings {
  position: absolute;
  top: 1.74rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: 0.18rem 0 0.18rem 0.18rem;

    .overview-left {
      flex: 0 0 1.37rem;
      width: 1.37rem;
      padding: 0.06rem 0rem;
      border-right: 0.01rem solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320rem) {
        flex: 0 0 1.10rem;
        width: 1.10rem;
      }

      .score {
        margin-bottom: 0.12rem;
        line-height: 0.28rem;
        font-size: 0.24rem;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 0.08rem;
        line-height: 0.12rem;
        font-size: 0.12rem;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 0.10rem;
        font-size: 0.12rem;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 0.06rem 0 0.06rem 0.24rem;

      @media only screen and (max-width: 3.20rem) {
        padding-left: 0.06rem;
      }

      .score-wrapper {
        line-height: 0.18rem;
        margin-top: 0.08rem;
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

      .avatar {
        flex: 0 0 0.28rem;
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
          margin-bottom: 0.4rem;
          line-height: 0.12rem;
          font-weight: 700;
          font-size: 0.10rem;
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
            font-size: 0.10rem;
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

        .recommend {
          line-height: 0.16rem;
          font-size: 0;

          .iconfont, .item {
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
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 0.12rem;
          font-size: 0.10rem;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
