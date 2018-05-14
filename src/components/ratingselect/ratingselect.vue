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
    <!-- <div class="switch" @click="toggleContent( $event)" :class="{'on':onlyContent}">
      <i class="iconfont icon-gou"></i>
      <span class="text">只看有内容的评价</span>
    </div> -->
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
      default: true
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "吐槽"
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    nagatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectType = type;
      //        this.dispatchEvent()
      this.$emit("increment", "selectType", type); // 子组件通过 $emit触发父组件的方法 increment   还可以传参   this.$emit('increment' ,this.counter);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent = !this.onlyContent;
      this.$emit("increment", "onlyContent", this.onlyContent);
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
<style lang="less" scoped>
@import '../../common/stylus/mixin.less';

.ratingselect {
  .rating-type {
    padding: 0.18rem 0;
    margin: 0 0.18rem;
    .border-1px(rgba(7, 17, 27, 0.1));
    font-size: 0;

    .block {
      display: inline-block;
      padding: 0.08rem 0.12rem;
      margin-right: 0.08rem;
      border-radius: 0.01rem;
      font-size: 0.12rem;
      color: rgb(77, 85, 93);

      &.positive {
        background: rgba(0, 160, 220, 0.2);

        &.active {
          color: #ffffff;
          background: rgb(0, 160, 220);
        }
      }

      &.negative {
        background: rgba(77, 85, 93, 0.2);

        &.active {
          color: #ffffff;
          background: rgb(77, 85, 93);
        }
      }

      .count {
        font-size: 0.08rem;
        margin-left: 0.02rem;
        line-height: 0.16rem;
      }
    }
  }

  .switch {
    padding: 0.12rem 0.18rem;
    line-height: 0.24rem;
    font-size: 0.12rem;
    color: rgb(147, 153, 159);
    border: 0.01rem solid rgba(1, 17, 27, 0.1);
    font-size: 0;

    &.on {
      .iconfont {
        color: #00c850;
      }
    }

    .iconfont {
      display: inline-block;
      vertical-align: top;
      font-size: 0.24rem;
      margin-right: 0.04rem;
    }

    .text {
      font-size: 0.12rem;
    }
  }
}
</style>
