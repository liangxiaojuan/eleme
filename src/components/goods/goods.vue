<template>
  <div class="good">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item border-1px" :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text">
            <ico v-if="item.icon_url" :img="item.icon_url"></ico> 
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}
            <span class="text">{{item.description}}</span>
          </h1>
       
          <ul>
            <li v-for="(food,index) in item.foods"  :key="index" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="_recombineImg(food.image_path)" alt="" >
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.month_sales}}份</span><span class="count">好评{{food.satisfy_rate}}%</span>
                </div>
                 <div class="discount" v-if="food.activity">
                 <span class="nummber">{{(food.specfoods[0].price/food.specfoods[0].original_price*10).toFixed(1)}}折</span>
                 <span class="count">每单限{{food.activity ? food.activity.max_quantity: ''}}份优惠</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.specfoods[0].price}}</span><span class="old"
                                                                v-if="food.specfoods[0].original_price">￥{{food.specfoods[0].original_price}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food" @increment="incrementTotal" @showMoveDot="showMoveDotFun"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      
      <shopCart :select-foods="selectFoods" :delivery-price="seller.float_delivery_fee"
                :min-price="seller.float_minimum_order_amount" ref="shopCart"></shopCart>
      <food :food="selectedFood" ref="food"></food>
             <transition
        appear
        @after-appear = 'afterEnter'
        @before-appear="beforeEnter"
        v-for="(item,index) in showMoveDot"
        >
           <div class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
        </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import shopCart from "../shopcart/shopCart.vue";
import cartControl from "../cartControl/cartControl.vue";
import food from "../food/food.vue";
import data from "common/json/menu.json";
import { recombineImg } from "common/js/util";
//  const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrolly: 0,
      selectedFood: {},
      showMoveDot: [],
      elLeft: "",
      elBottom: "",
      windowHeight: null // 屏幕的高度
    };
  },
  created() {
    //      this.$http.get('/api/goods').then((response) => {
    //        response = response.body;
    //        if (response.errno === ERR_OK) {
    //         this.goods = response.data;
    //       this.$nextTick(() => {
    //        this._initScroll();
    //        this._calculateHeight();
    //       });
    //        }
    //      });
    // console.log(this.seller);
    // this.seller = seller;
    this.goods = data;
    this.$nextTick(() => {
      this._initScroll();
      this._calculateHeight();
    });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  mounted() {
    //      this.$nextTick(() => {
    //       this._initScroll();
    //      });
    this.windowHeight = window.innerHeight;
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on("scroll", pos => {
        this.scrolly = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        // 去掉自带click事件的点击
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        // 去掉自带click事件的点击
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    incrementTotal(target) {
      this.$refs.shopCart.drop(target);
    },
    _recombineImg(imgUrl) {
      return recombineImg(imgUrl);
    },
    beforeEnter(el) {
      el.style.transform = `translate3d(0,${37 +
        this.elBottom -
        this.windowHeight}px,0)`;
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
      el.children[0].style.opacity = 0;
    },
    showMoveDotFun(showMoveDot, elLeft, elBottom) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      // this.showMoveDot = showMoveDot;
      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },
    afterEnter(el) {
      el.style.transform = `translate3d(0,0,0)`;
      el.children[0].style.transform = `translate3d(0,0,0)`;
      el.style.transition =
        "transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.children[0].style.transition = "transform .55s linear";
      this.showMoveDot = this.showMoveDot.map(item => false);
      el.children[0].style.opacity = 1;
      el.children[0] &&
        el.children[0].addEventListener("transitionend", () => {
          // console.log(this.$refs.shopCart);
          this.$refs.shopCart.listenInCart();
        });
      el.children[0] &&
        el.children[0].addEventListener("webkitAnimationEnd", () => {
          this.$refs.shopCart.listenInCart();
        });
    }
  },
  components: {
    shopCart,
    cartControl,
    food,
    ico: require("../ico")
  }
};
</script>
<style lang="less">
@import "../../common/stylus/mixin.less";

.good {
  display: flex;
  position: absolute;
  width: 100%;
  top: 1.74rem;
  bottom: 0.46rem;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 0.8rem;
    width: 0.8rem;
    background: #f3f5f7;
    .menu-item {
      display: table;
      width: 0.68rem;
      height: 0.54rem;
      line-height: 0.14rem;
      padding: 0 0.06rem;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -0.01rem;
        background: #fff;
        font-weight: 700;

        .text {
          .border-none();
        }
      }

      .icon {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        vertical-align: top;
        margin-right: 0.04rem;
        background-size: 0.12rem 0.12rem;
        background-repeat: no-repeat;
        // &.decrease
        // bg-image('decrease_3')
        // &.discount
        // bg-image('discount_3')
        // &.guarantee
        // bg-image('guarantee_3')
        // &.invoice
        // bg-image('invoice_3')
        // &.special
        // bg-image('special_3')
      }

      .text {
        display: table-cell;
        width: 56rem;
        vertical-align: middle;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0.135rem;
        color: rgb(51, 51, 51);
        // text-align: left;
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    // padding-right: 3rem;
    width: 2rem;
    .food-list {
      .title {
        padding-left: 0.14rem;
        height: 0.26rem;
        line-height: 0.26rem;
        border-left: 0.02rem solid #d9dde1;
        font-size: 0.12rem;
        font-weight: 700;
        color: #666;
        background: #f3f5f7;
      }
      .text {
        color: rgb(147, 153, 159);
        font-size: 0.12rem;
      }

      .food-item {
        display: flex;
        margin: 0.05rem;
        padding-bottom: 0.18rem;
        .border-1px(rgba(7, 17, 27, 0.1));
        // justify-content: flex-start;

        &:last-child {
          .border-none();
          margin-bottom: 0rem;
        }

        .icon {
          flex: 0 0 0.75rem;
          margin-right: 0.1rem;
          display: flex;
          align-items: flex-start;
          img {
            width: 0.75rem;
          }
        }

        .content {
          flex: 1;

          .name {
            margin: 0.02rem 0 0.08rem 0;
            font-size: 0.14rem;
            line-height: 0.14rem;
            // height: 0.14rem;
            color: #333;
            font-weight: 500;
          }

          .desc,
          .extra {
            font-size: 0.1rem;
            line-height: 0.1rem;
            color: rgb(147, 153, 159);
          }

          .desc {
            margin-bottom: 0.08rem;
            line-height: 0.12rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .extra {
            .count {
              margin-right: 0.12rem;
            }
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
  }
  .ball {
    position: fixed;
    left: 0.3rem;
    bottom: 0.3rem;
    z-index: 49;
    // transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);

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
</style>
