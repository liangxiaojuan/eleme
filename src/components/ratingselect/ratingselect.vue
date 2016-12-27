<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2, $event)" :class="{'active': selectType === 2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span> </span>
      <span class="block positive" @click="select(0, $event)"
            :class="{'active': selectType === 0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1, $event)"
            :class="{'active': selectType === 1}">{{desc.negative}}<span
        class="count">{{nagatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent( $event)" :class="{'on':onlyContent}">
      <i class="iconfont icon-gou"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 0;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '吐槽'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      nagatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
//        this.dispatchEvent()
        this.$emit('increment', 'selectType', type); // 子组件通过 $emit触发父组件的方法 increment   还可以传参   this.$emit('increment' ,this.counter);
      },
      toggleContent (event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('increment', 'onlyContent', this.onlyContent);
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
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "ratingselect.styl";
</style>
