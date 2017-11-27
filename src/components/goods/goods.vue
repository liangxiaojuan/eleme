<template>
  <div class="good">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item border-1px" :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type>0" class=" icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods"  :key="index" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" alt="" width="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span class="count">好评{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food" @increment="incrementTotal"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice" ref="shopCart"></shopCart>
      <food :food="selectedFood" ref="food"></food>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import shopCart from "../shopcart/shopCart.vue";
import cartControl from "../cartControl/cartControl.vue";
import food from "../food/food.vue";
import data from "common/json/ratings.json";
//  const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrolly: 0,
      selectedFood: {}
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
    this.goods = data.goods;
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
    }
  },
  components: {
    shopCart,
    cartControl,
    food
  }
};
</script>
<style lang="less">
// @import '../../common/stylus/mixin.less';

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
      width: 0.56rem;
      height: 0.54rem;
      line-height: 0.14rem;
      padding: 0 0.12rem;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -0.01rem;
        background: #fff;
        font-weight: 700;

        .text {
          // border-none();
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
        // border-1rem(rgba(7, 17, 27, 0.1));
        font-size: 0.12rem;
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    .food-list {
      .title {
        padding-left: 0.14rem;
        height: 0.26rem;
        line-height: 0.26rem;
        border-left: 0.02rem solid #d9dde1;
        font-size: 0.12rem;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }

      .food-item {
        display: flex;
        margin: 0.18rem;
        padding-bottom: 0.18rem;
        // border-1rem(rgba(7, 17, 27, 0.1));

        &:last-child {
          // border-none();
          margin-bottom: 0rem;
        }

        .icon {
          flex: 0 0 0.57rem;
          margin-right: 0.1rem;
        }

        .content {
          flex: 1;

          .name {
            margin: 0.02rem 0 0.08rem 0;
            font-size: 0.14rem;
            line-height: 0.14rem;
            height: 0.14rem;
            color: rgb(7, 17, 27);
          }

          .desc, .extra {
            font-size: 0.1rem;
            line-height: 0.1rem;
            color: rgb(147, 153, 159);
          }

          .desc {
            margin-bottom: 0.08rem;
            line-height: 0.12rem;
          }

          .extra {
            .count {
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
            right: 0;
            bottom: 0.12rem;
          }
        }
      }
    }
  }
}
</style>
