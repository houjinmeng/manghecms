<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route="">
      <van-tabbar-item to="/statistics/market">
        <span>销售统计</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/market.png')
              : require('../../assets/img/marketn.png')
          "
        />
      </van-tabbar-item>
      <van-tabbar-item to="/statistics/order">
      <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/ordery.png')
              : require('../../assets/img/ordern.png')
          "
        />
        <span>订单统计</span>
      </van-tabbar-item>
      <van-tabbar-item to="/statistics/refund">
      <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/refund.png')
              : require('../../assets/img/refundn.png')
          "
        />
        <span>退款统计</span>
      </van-tabbar-item>
      <van-tabbar-item to="/statistics/goods">
      <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/good.png')
              : require('../../assets/img/goodsn.png')
          "
        />
        <span>商品统计</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        normal: "//img.yzcdn.cn/icon-normal.png",
        active: "//img.yzcdn.cn/icon-active.png"
      }
    };
  }
};
</script>
<style>
</style>