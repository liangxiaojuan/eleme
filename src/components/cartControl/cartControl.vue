<template>
  <div class="cartControl">
    <transition name="fade">
      <span class="iconfont icon-jian cart-decrease" v-show="food.count>0" @click="decreaseCart($event)"></span>
    </transition>
      <span class="cart-count" v-show="food.count > 0 ">
      {{food.count}}
    </span>
    <span class="iconfont icon-jia cart-add" @click="addCart($event)"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
          this.food.count--;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "cartControl.styl";
</style>
