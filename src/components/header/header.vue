<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="recombineImg(seller.image_path)">
      </div>
      <div class="content">
        <div class="title">
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          蜂鸟配送/{{seller.order_lead_time}}分钟送达/{{seller.piecewise_agent_fee.description}}
        </div>
        <div class="support">
          公告:
          <span class="text">{{seller.promotion_info}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <!-- <span class="bulletin-title"></span> -->
      <ico :name="seller.activities[0]['icon_name']" :color="seller.activities[0]['icon_color']"></ico>
      <span class="bulletin-text">{{seller.activities[0]['description']}}</span>
      <i class="icon iconfont icon-zuoyoujiantou"></i>
      <span class="bulletin-text bulletin-number">共{{seller.activities.length}}个活动</span>
    </div>
    <div class="background">
      <img :src="seller.promotion_info" alt="" class="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail" @click="hideDetail" transition="fade">
        <div class="detail-wrapper clearFix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.rating"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.activities">
                <!-- <span class="icon" :class="classMap[seller.supports[index].type]"></span> -->
                    <ico :name="item['icon_name']" :color="item['icon_color']"></ico>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.promotion_info}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-cha"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import { recombineImg } from "common/js/util";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    },
    recombineImg(str) {
      return recombineImg(str, 130);
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    star: require("../star/star.vue"),
    ico: require("../ico")
  }
};
</script>
<style lang="less" scoped>
// @import '../../common/stylus/mixin.less';

.header {
  position: relative;
  color: #fff;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.5);
  background-image: url("https://fuss10.elemecdn.com/2/a4/fd07830d7ff7b241cab959998eb4apng.png?imageMogr/format/webp/thumbnail/!40p/blur/50x40/");
  .content-wrapper {
    position: relative;
    padding: 0.24rem 0.12rem 0.18rem 0.24rem;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 0.02rem;
      }
    }

    .content {
      display: inline-block;
      font-size: 0.12rem;
      margin-left: 0.16rem;

      .title {
        margin: 0.02rem 0 0.08rem 0;

        .brand {
          display: inline-block;
          vertical-align: top;
          width: 0.3rem;
          height: 0.18rem; // bg-image('brand');
          background-size: 0.3rem 0.18rem;
          background-repeat: no-repeat;
        }

        .name {
          font-size: 0.16rem;
          line-height: 0.18rem;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 0.1rem;
        line-height: 0.12rem;
        font-size: 0.12rem;
      }

      .support {
        // width : 10%;
        // display inline-block
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 0.12rem;
        font-size: 0.12rem;
        width: 2.4rem;
      }
    }

    .supports-count {
      position: absolute;
      right: 0.12rem;
      bottom: 0.14rem;
      padding: 0 0.08rem;
      height: 0.24rem;
      line-height: 0.24rem;
      border-radius: 0.12rem;
      background: rgba(0, 0, 0, 0.2);
      text-align: content;

      .count {
        font-size: 0.1rem;
        vertical-align: top;
      }

      .icon {
        margin-left: 0.02rem;
        line-height: 0.24rem;
        font-size: 0.1rem;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    background-color: rgba(7, 17, 27, 0.2);
    height: 0.28rem;
    line-height: 0.28rem;
    padding: 0 0.22rem 0 0.12rem;
    white-space: normal; // overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // width: 100%;
    // text-overflow: ellipsis;
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 0.08rem;
      width: 0.22rem;
      height: 0.12rem; // bg-image('bulletin');
      background-size: 0.22rem 0.12rem;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      margin: 0 0.04rem;
      font-size: 0.12rem;
      color: #ffffff;
      &.bulletin-number {
        position: absolute;
        // font-size: 0.2rem;
        right: 0.1rem;
        top: 0rem;
      }
    }

    .icon {
      position: absolute;
      font-size: 0.16rem;
      right: 0rem;
      top: -0.01rem;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(0.1rem);
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.9);
    -webkit-backdrop-filter: blur(10rem);

    &.fade-enter-active {
      animation: bounce-in 0.5s;
    }

    &.fade-leave-active {
      animation: bounce-out 0.5s;
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }

      50% {
        transform: scale(1.5);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes bounce-out {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.5);
      }

      100% {
        transform: scale(0);
      }
    }
  }
}

.detail-wrapper {
  width: 100%;
  min-height: 100%;

  .detail-main {
    margin-top: 0.32rem;
    padding-bottom: 0.32rem;

    .name {
      line-height: 0.16rem;
      text-align: center;
      font-size: 0.16rem;
      font-weight: 7rem;
    }

    .star-wrapper {
      margin-top: 0.18rem;
      padding: 0.02rem 0;
      text-align: center;
    }

    .title {
      width: 90%;
      display: flex;
      margin: 0.28rem auto 0 auto;

      .line {
        flex: 1;
        position: relative;
        top: -0.1rem;
        border-bottom: 0.01rem solid rgba(255, 255, 255, 0.2);
      }

      .text {
        padding: 0.05rem 0.08rem;
        font-size: 0.12rem;
        font-weight: 7rem;
        border-radius: 0.05rem;
        border: 1px solid #555;
        background-color: #262626;
      }
    }

    .supports {
      width: 90%;
      margin: 0.22rem auto;

      .support-item {
        padding: 0 0.12rem;
        font-size: 0rem;
        margin-bottom: 0.12rem;

        &:last-child {
          margin-bottom: 0rem;
        }

        .icon {
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          vertical-align: top;
          margin-right: 0.06rem;
          background-size: 0.16rem 0.16rem;
          background-repeat: no-repeat;
        }

        .text {
          margin-left: 0.05rem;
          line-height: 0.12rem;
          font-size: 0.12rem;
          color: #ffffff;
        }
      }
    }

    .bulletin {
      width: 90%;
      height: 2rem;
      margin: 0.22rem auto;

      .content {
        padding: 0 0.12rem;
        line-height: 0.16rem;
        font-size: 0.12rem;
      }
    }
  }
}

.detail-close {
  position: relative;
  width: 0.32rem;
  height: 0.32rem;
  margin: -0.64rem auto 0 auto;
  clear: both;
  font-size: 0.32rem;
}
</style>
