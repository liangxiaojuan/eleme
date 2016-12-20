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
      <div class="tab-item" >
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
    <router-view :seller="seller"></router-view>

  </div>
</template>
<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl";
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border: 1px solid rgba(7,17,27,0.1);*/
  border-1px(rgba(7,17,27,0.1));
  }
  .tab .tab-item {
    flex: 1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .tab .tab-item .active{
    color: rgb(240,20,20);
  }
</style>
