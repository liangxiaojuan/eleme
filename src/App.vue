<template>
  <div>
    <!-- 头部 -->
    <v-header :seller="seller"></v-header>
    <!-- 主体切换 -->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link v-bind:to="'/goods'">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <!-- 头部 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>
<script type="text/ecmascript-6">
import header from "./components/header/header.vue";
import { urlParse } from "common/js/util";
// import data from 'common/json/data.json';
import seller from "common/json/seller.json";
//  const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {},
      id: (() => {
        let queryParam = urlParse();
        return queryParam.id;
      })()
    };
  },
  created() {
    //  this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
    //    response = response.body;
    //    if (response.errno === ERR_OK) {
    //      this.seller = response.data;
    //      this.seller = Object.assign({}, this.seller, response.data);
    //    }
    //  });
  console.log(seller);
    this.seller = seller;
  },
  components: {
    "v-header": header
  }
};
</script>
<style lang="less" scoped>
@import "common/stylus/mixin.less";

.tab {
  display: flex;
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  /* border: 1px solid rgba(7,17,27,0.1); */
  .border-1px(rgba(7, 17, 27, 0.1));
}

.tab .tab-item {
  flex: 1;
  text-align: center;
}

.tab .tab-item a {
  display: block;
  font-size: 0.14rem;
  color: rgb(77, 85, 93);
}

.tab .tab-item .active {
  color: #3190e8;
  font-weight: 700;
  a {
    :after {
      content: "";
      position: absolute;
      bottom: -0.266667rem;
      left: 0;
      right: 0;
      height: 0.08rem;
      background-color: #2395ff;
    }
  }
}
</style>
