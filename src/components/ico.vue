<template>
    <div class="ico" :style="iconStyle">
        {{name}}
    </div>
</template>

<script>
import { recombineImg } from "common/js/util";
export default {
  props: ["color", "name", "img"],
  computed: {
    iconStyle() {
      if (this.img) {
        return {
          width: "0.10rem",
          height: "0.10rem",
          "background-image": `url(${recombineImg(this.img)})`
        };
      }
      return this.color ? { background: `#${this.color}` } : {};
    }
  }
};
</script>

<style lang="less" scoped>
.ico {
  // margin-right: 0.16rem;
  // font-size: 0.293333rem;
  // font-style: normal;
  // height: 0.373333rem;
  // width: 0.373333rem;
  width: 0.18rem;
  height: 0.18rem;
  font-size: 0.12rem;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // text-align: center;
  border-radius: 0.02rem;
  // display: inline-block;
  color: #ffffff;
  margin: 0;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>

