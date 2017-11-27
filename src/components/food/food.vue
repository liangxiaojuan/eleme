<template>
  <transition name="fade">
    <div v-show="showFlag" class="food">
      <div class="fond-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="iconfont icon-weibiaoti6-copy"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating"> 好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name="buy">
            <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px"
                  v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" :src=rating.avatar alt="" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i class="iconfont"
                     :class="{'icon-damuzhi':rating.rateType === 0,'icon-down':rating.rateType === 1,}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import cartControl from "../cartControl/cartControl.vue";
import split from "../split/split.vue";
import ratingselect from "../ratingselect/ratingselect.vue";
import Vue from "vue";
import { formatDate } from "../../common/js/date";
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, "count", 1);
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
    cartControl,
    ratingselect,
    split
  }
};
</script>
<style lang="less" >
// @import '../../common/stylus/mixin.less';

.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0.48rem;
  z-index: 30;
  width: 100%;
  background: #ffffff;

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .back {
      position: absolute;
      top: 0.1rem;
      left: 0;

      .iconfont {
        display: block;
        padding: 0.1rem;
        font-size: 0.2rem;
        color: #ffffff;
      }
    }
  }

  .content {
    position: relative;
    padding: 0.18rem;

    .title {
      line-height: 0.14rem;
      margin-bottom: 0.08rem;
      font-size: 0.14rem;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }

    .detail {
      margin-bottom: 0.18rem;
      line-height: 0.1rem;
      font-size: 0;
      height: 10rem;

      .sell-count, .rating {
        font-size: 0.1rem;
        display: inline-block;
        color: rgb(147, 153, 159);
      }

      .sell-count {
        margin-right: 0.12rem;
      }
    }

    .price {
      font-weight: 7rem;
      line-height: 0.24rem;

      .now {
        margin-right: 0.08rem;
        font-size: 0.14rem;
        color: rgb(240, 20, 20);
      }

      .old {
        font-size: 0.1rem;
        color: rgb(147, 153, 159);
        text-decoration: line-through;
      }
    }

    .cartControl-wrapper {
      position: absolute;
      right: 0.12rem;
      bottom: 0.12rem;
    }

    .buy {
      position: absolute;
      right: 0.18rem;
      bottom: 0.18rem;
      z-index: 10;
      height: 0.24rem;
      line-height: 0.24rem;
      padding: 0 0.12rem;
      box-sizing: border-box;
      border-radius: 0.12rem;
      font-size: 0.1rem;
      color: #fff;
      background: rgb(0, 160, 220);

      &.buy-enter-active, &.buy-leave-active {
        transition: all 0.2s;
        opacity: 0;
      }

      &.buy-enter, &.buy-leave-active {
        opacity: 0;
      }
    }
  }

  .info {
    padding: 0.18rem;

    .title {
      line-height: 0.14rem;
      margin-bottom: 0.06rem;
      font-size: 0.14rem;
      color: rgb(7, 17, 27);
    }

    .text {
      font-size: 0.12rem;
      line-height: 0.24rem;
      padding: 0 0.08rem;
      color: rgb(77, 85, 93);
    }
  }

  .rating {
    padding-top: 0.18rem;

    .title {
      line-height: 0.14rem;
      margin-left: 0.18rem;
      font-size: 0.14rem;
      color: rgb(7, 17, 27);
    }

    .rating-wrapper {
      padding: 0 0.18rem;

      .rating-item {
        position: relative;
        padding: 0.16rem 0;
        // border-1rem(rgba(1, 17, 27, 0.1));

        .user {
          position: absolute;
          right: 0;
          top: 0.16rem;
          font-size: 0;
          line-height: 0.12rem;

          .name {
            display: inline-block;
            vertical-align: top;
            font-size: 0.1rem;
            color: rgb(147, 153, 159);
            margin-right: 0.06rem;
          }

          .avatar {
            border-radius: 50%;
          }
        }

        .time {
          margin-bottom: 0.06rem;
          line-height: 0.12rem;
          font-size: 0.1rem;
          color: rgb(147, 153, 159);
        }

        .text {
          line-height: 0.16rem;
          font-size: 0.12rem;
          color: rgb(7, 17, 27);

          .iconfont {
            margin-right: 0.04rem;
            line-height: 0.16rem;
            font-size: 0.12rem;
          }

          .icon-damuzhi {
            color: rgb(0, 160, 220);
          }

          .icon-down {
            color: rgb(147, 153, 159);
          }
        }
      }

      .no-rating {
        padding: 0.16rem 0;
        font-size: 0.12rem;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
