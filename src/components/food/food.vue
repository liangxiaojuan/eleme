<template>
  <transition name="fade">
    <div v-show="showFlag" class="food">
      <div class="food-marker" @click.stop.prevent="showFlag=false"></div>
      <div class="food-content">
        <div class="image-header">
         <img :src="_recombineImg(food.image_path)" alt="" class="img">
          <p class="description">{{food.description}}</p>
        </div>
        <div class="food-info">
             <h2 class="name">{{food.name}}</h2>
                <!-- <p class="desc">{{food.description}}</p> -->
                <div class="extra">
                  <span class="count">月售{{food.month_sales}}份</span><span class="count">好评{{food.satisfy_rate}}%</span>
                </div>
                 <div class="discount" v-if="food.activity">
                 <span class="nummber">{{(food.specfoods[0].price/food.specfoods[0].original_price*10).toFixed(1)}}折</span>
                 <span class="count">每单限{{food.activity ? food.activity.max_quantity: ''}}份优惠</span>
                </div>
                <div class="price" v-if=" food.specfoods  && food.specfoods.length>0">
                  <span class="now" >￥{{food.specfoods[0].price}}</span><span class="old"
                                                                v-if="food.specfoods[0].original_price">￥{{food.specfoods[0].original_price}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food" @increment="increment" @showMoveDot="callback"></cartControl>
                </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
// import BScroll from "better-scroll";
import Vue from "vue";
import { formatDate } from "../../common/js/date";
import { recombineImg } from "common/js/util";
import cartControl from "../cartControl/cartControl.vue";
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    },
    callback: {
      type: Function
    },
    increment: {
      type: Function
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true
    };
  },
  components: {
    cartControl
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      // this.$nextTick(() => {
      //   if (!this.scroll) {
      //     this.scroll = new BScroll(this.$el, {
      //       click: true
      //     });
      //   } else {
      //     this.scroll.refresh();
      //   }
      // });
    },
    _recombineImg(imgUrl) {
      return recombineImg(imgUrl, 320);
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
  }
};
</script>
<style lang="less" >
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0.48rem;
  z-index: 30;
  width: 100%;
  // background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.1rem;
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }

  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .food-marker {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
  }
  .food-content {
    position: relative;
    z-index: 13;
    width: 3.2rem;
    height: 4.28rem;
    background: #ffffff;
    border-radius: 0.05rem;
    .image-header {
      width: 3.2rem;
      height: 3.2rem;
      position: relative;
      .description {
        font-size: 0.12rem;
        color: #ddd;
        letter-spacing: 0;
        line-height: 0.12rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 0.1rem 0.1rem;
      }
      .img {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
    .food-info {
      position: relative;
      padding: .15rem .15rem 0;
      .name {
        margin: 0.02rem 0 0.08rem 0;
        font-size: 0.14rem;
        line-height: 0.14rem;
        // height: 0.14rem;
        color: #333;
        font-weight: 500;
      }
      .extra {
        font-size: 0.1rem;
        line-height: 0.1rem;
        color: rgb(147, 153, 159);
      }
      .discount {
        margin-top: 0.05rem;
        width: 1.2rem;
        height: 0.14rem;
        display: flex;
        border: 0.5px solid #ff3c15;
        font-size: 0.12rem;
        // justify-content: center;
        align-items: center;
        .nummber {
          width: 0.35rem;
          font-size: 0.12rem;
          color: #ffffff;
          // vertical-align: top;
          background-color: #ff3c15;
          padding: 0.01rem 0.02rem;
        }
        .count {
          color: #ff3c15;
          padding: 0.01rem 0rem;
        }
      }
      .price {
        font-weight: 700;
        line-height: 0.24rem;
        // margin: 0;
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
        font-size: 0.1rem;
      }
      .cartControl-wrapper {
        position: absolute;
        right: 0;
        bottom: 0.12rem;
      }
    }
  }
}
</style>
