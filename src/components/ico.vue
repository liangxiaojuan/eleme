<template>
    <div class="ico" :style="iconStyle">
        {{name}}
    </div>
</template>

<script>
export default {
    props: ['color', 'name'],
    computed: {
        iconStyle() {
            return this.color ? { background: `#${this.color}` } : {};
        }
    }
};
</script>

<style lang="stylus" scoped>
.ico {
    // margin-right: 0.16rem;
    // font-size: 0.293333rem;
    // font-style: normal;
    // height: 0.373333rem;
    // width: 0.373333rem;
    width 20px;
    height 20px
    font-size 12px;
    display: flex;
    justify-content center
    align-items center
    // text-align: center;
    border-radius: 5px;
    // display: inline-block;
    color: #ffffff;
    margin 0
}
</style>

