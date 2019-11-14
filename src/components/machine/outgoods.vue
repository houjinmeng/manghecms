<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/machinelist">
        <van-icon name="arrow-left" class="back" />
      </router-link>设备出货
    </div>
    <van-search placeholder="请输入商品名称" v-model="value" @blur="onSearch" />
    <div style="text-align:center;background:#fff;padding:0.1rem 0">
      时间
      <el-date-picker
        value-format="timestamp"
        v-model="value1"
        type="date"
        placeholder="选择日期"
        size="mini"
        style="width:2.8rem"
        :editable="false"
        @change="a"
      ></el-date-picker>至
      <el-date-picker
        value-format="timestamp"
        v-model="value2"
        type="date"
        placeholder="选择日期"
        size="mini"
        style="width:2.8rem"
        :editable="false"
      ></el-date-picker>
    </div>
    <div class="list">
      <div class="item">
        <span>2019-08-31 11:09:27</span>
        <span style="margin:0 0.3rem">农夫山泉</span>
        <span class="btn">出货</span>
      </div>
    </div>
    <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      currentPage:1
    };
  },
  methods: {
    onSearch() {},
    a() {
      console.log(this.value1);
    }
  }
};
</script>
<style scoped>
.btn {
  display: inline-block;
  height: 0.3rem;
  width: 0.6rem;
  background-color: skyblue;
  color: #fff;
  line-height: 0.3rem;
  text-align: center;
}
</style>