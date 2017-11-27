<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleList($event)">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="iconfont icon-gouwuche" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="shopcart-food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price * food.count}}</span></div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList()"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import cartControl from "../cartControl/cartControl.vue";
import BScroll from "better-scroll";
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{ price: 20, count: 2 }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      fold: true
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = false;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert("支付" + this.totalPrice + "元");
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      //          let rf = el.offestHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
  components: {
    cartControl
  }
};
</script>
<style lang="less" scoped>
// @import '../../common/stylus/mixin.less';

.shopCart {
  position: fixed;
  left: 0rem;
  bottom: 0rem;
  z-index: 50;
  width: 100%;
  height: 0.48rem;

  .content {
    display: flex;
    background: #141d27;

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -0.1rem;
        margin: 0 0.12rem;
        padding: 0.06rem;
        width: 0.56rem;
        height: 0.56rem;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.24rem;
          height: 0.24rem;
          line-height: 0.24rem;
          text-align: center;
          border-radius: 0.16rem;
          font-size: 0.09rem;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 0, 0, 0.4);
        }

        .logo {
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 50%;
          background: #2b343c;

          &.highlight {
            background: rgb(0, 160, 220);
          }

          .icon-gouwuche {
            line-height: 0.44rem;
            font-size: 0.24rem;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 0.12rem;
        line-height: 0.24rem;
        padding-right: 0.12rem;
        box-sizing: border-box;
        border-right: 0.01rem solid rgba(255, 255, 255, 0.1);
        font-size: 0.16rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);

        &.highlight {
          color: #ffffff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 0.24rem;
        margin-left: 0.12rem;
        margin-top: 0.12rem;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.1rem;
      }
    }

    .content-right {
      flex: 0 0 1.05rem;
      width: 1.05rem;

      .pay {
        height: 0.48rem;
        line-height: 0.48rem;
        text-align: center;
        font-size: 0.12rem;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        background: #2b333b;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #ffffff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 0.32rem;
      bottom: 0.22rem;
      z-index: 200;
      transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      // &.drop-enter-active, &.drop-leave-active {
      // transition: all 0.4s linear
      // }
      // &.drop-enter, &.drop-leave-active {
      // opacity: 0
      // transform translate3d(24rem, 0, 0)
      // }
      .inner {
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);

    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.5s;
      transform: translate3d(0, -100%, 0);
    }

    &.fade-enter,
    &.fade-leave-active {
      transform: translate3d(0, 0, 0);
    }

    .list-header {
      height: 0.4rem;
      line-height: 0.4rem;
      padding: 0 0.18rem;
      background: #f3f5f7;
      border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 0.14rem;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 0.12rem;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 0.18rem;
      max-height: 2.17rem;
      overflow: hidden;
      background: #ffffff;

      .shopcart-food {
        position: relative;
        padding: 0.12rem 0;
        box-sizing: border-box;
        // border-1rem(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 0.24rem;
          font-size: 0.14rem;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 0.9rem;
          bottom: 0.12rem;
          line-height: 0.24rem;
          font-size: 0.14rem;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartControl-wrapper {
          position: absolute;
          right: 0;
          bottom: 0.06rem;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(0.1rem);
  -webkit-backdrop-filter: blur(0.1rem);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 1;
    transition: all 0.5s;
    background: rgba(7, 17, 27, 0.6);
  }

  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
