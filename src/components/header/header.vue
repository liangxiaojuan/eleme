<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" src="seller.promotion_info">
      </div>
      <div class="content">
        <div class="title">
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          蜂鸟配送/{{seller.order_lead_time}}分钟送达/{{seller.piecewise_agent_fee.description}}
        </div>
        <div class="support">
          公告: <span class="text">{{seller.promotion_info}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <!-- <span class="bulletin-title"></span> -->
      <ico :name="seller.activities[0]['icon_name']" :color="seller.activities[0]['icon_color']"></ico>
      <span class="bulletin-text">{{seller.activities[0]['description']}}</span>
      <i class="icon iconfont icon-zuoyoujiantou"></i>
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
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <!-- <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li> -->
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
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
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    'star': require('../star/star.vue'),
    'ico': require('../ico')
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.header {
  position: relative;
  color: #fff;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.5);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;

      .title {
        margin: 2px 0 8px 0;

        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          // bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .support {
        // width : 10%;
        // display inline-block
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 12px;
        font-size: 12px;
        width: 240px;

        // .text {
        //   display: inline-block;
        //   line-height: 12px;
        //   font-size: 12px;
        // }
      }
    }

    .supports-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.2);
      text-align: content;

      .count {
        font-size: 10px;
        vertical-align: top;
      }

      .icon {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    background-color: rgba(7, 17, 27, 0.2);
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: normal;
    // overflow: hidden;
    // text-overflow: ellipsis;
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      // bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }

    .icon {
      position: absolute;
      font-size: 20px;
      right: 12px;
      top: 0px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10px);

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
    margin-top: 64px;
    padding-bottom: 64px;

    .name {
      line-height: 16px;
      text-align: center;
      font-size: 16px;
      font-weight: 700px;
    }

    .star-wrapper {
      margin-top: 18px;
      padding: 2px 0;
      text-align: center;
    }

    .title {
      width: 80%;
      display: flex;
      margin: 28px auto 0 auto;

      .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .text {
        padding: 0px 12px;
        font-size: 16px;
        font-weight: 700px;
      }
    }

    .supports {
      width: 80%;
      margin: 22px auto;

      .support-item {
        padding: 0 12px;
        font-size: 0px;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 0px;
        }

        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
        }

        .text {
          line-height: 12px;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }

    .bulletin {
      width: 80%;
      height: 200px;
      margin: 22px auto;

      .content {
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
      }
    }
  }
}

.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
</style>
