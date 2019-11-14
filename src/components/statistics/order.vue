<template>
  <div>
    <!-- 收益统计 -->
    <div class="shouyi">
      <div class="top">
        <div>订单总数</div>
        <span>0.00 </span>
      </div>
    </div>
    <!-- 头部日期搜索 -->
    <div class="head">
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
        style="width:2.5rem"
        :editable="false"
        @change="a"
      ></el-date-picker>
      <span style="margin:0 0.2rem">至</span>
      <el-date-picker
        value-format="timestamp"
        v-model="value1"
        type="date"
        placeholder="选择日期"
        size="small"
        style="width:2.5rem"
        :editable="false"
        @change="a"
      ></el-date-picker>
    </div>
    <div style="padding:0 0.2rem">
      <!-- 订单状态表 -->
      <div class="list">
        <router-link to="">
          <div class="item">
            <div>成功</div>
            <div>
              <span>123</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </router-link>
        <router-link to="">
          <div class="item">
            <div>未支付</div>
            <div>
              <span>123</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ""
    };
  },
  methods: {
    // 时间搜索
    a() {}
  }
};
</script>
<style lang="less" scoped>
// 收益统计
.shouyi {
  width: 100%;
  color: #ffffff;
  margin-bottom: 0.2rem;
  background: url("../../assets/img/home.png") top left no-repeat;
  background-size: cover;
  .top {
    height: 2.48rem;
    text-align: center;
    padding-top: 0.5rem;
    box-sizing: border-box;
    font-size: 0.68rem;
    span {
      display: inline-block;
      margin-top: 0.1rem;
      font-weight: 800;
    }
  }
  .bottom {
    height: 1.28rem;
    display: flex;
    font-size: 0.31rem;
    border-top: 1px solid #dedde6;
    background-color: rgba(245, 241, 241, 0.336);
    color: #656566;
    .box {
      width: 50%;
      text-align: center;
      padding-top: 0.2rem;
      span {
        font-weight: 800;
        font-size: 0.36rem;
      }
    }
  }
}
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
// 直营店收入统计
.list {
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem 0;
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
