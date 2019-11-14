<template>
  <div>
    <van-cell-group>
      <van-field v-model="SN" placeholder="系统生成的SN" label="设备号" />
      <van-field v-model="num" placeholder="仓位总数" label="仓位数量" />
    </van-cell-group>
    <div style="margin:0.5rem 0;text-align:center;">提示 : 系统默认仓位号码,从上到下,从左到右排序</div>
    <div style="text-align:center">
        <van-button type="info" style="width:90%">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SN: "",
      num: ""
    };
  }
};
</script>
<style>
</style>