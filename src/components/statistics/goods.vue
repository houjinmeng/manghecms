<template>
  <div>
    <div
      style="text-align:center;font-size:0.4rem;padding:0.2rem;font-weight:800;background:#fff"
    >
      销售排行
    </div>
    <!-- 头部日期搜索 -->
    <div class="head" style="margin-top:0.1rem">
      <div>今日</div>
      <div>昨日</div>
      <div>本月</div>
      <div>本年</div>
    </div>
    <div class="date">
      <span style="margin:0 0.2rem">时间</span>
      <el-date-picker
        value-format="timestamp"
        v-model="value1"
        type="date"
        placeholder="选择日期"
        size="small"
        style="width:4rem"
        :editable="false"
        @change="a"
      ></el-date-picker>
    </div>
    <!-- 商品列表 -->
    <div style="padding:0.2rem">
      <div class="list">
      <div class="item">
        <div>1</div>
        <div>农夫山泉</div>
        <div>456件</div>
        <div>合计:0.00</div>
      </div>
    </div>
    </div>

    <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      currentPage: 1
    };
  },
  methods: {
    a() {}
  }
};
</script>
<style lang="less" scoped>
// 头部日期搜索
.head {
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
  div {
    width: 16%;
    height: 0.46rem;
    text-align: center;
    line-height: 0.46rem;
    background-color: #ccc;
    font-size: 0.25rem;
    border-radius: 0.1rem;
  }
}
.date {
  padding: 0.2rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  font-size: 0.3rem;
}
// 列表
.list {
  background-color: #fff;
  border-radius: 0.2rem;
  height: 8rem;
  overflow: auto;
  .title {
    border-bottom: 1px solid #a8b8e2;
    padding: 0.2rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
  }
}
</style>
