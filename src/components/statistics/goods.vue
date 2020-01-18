<template>
  <div class="bigbox">
    <div class="head" style="background:#fff">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" /> </router-link
      >销售排行
    </div>
    <!-- 头部日期搜索 -->
    <div class="head1" style="margin-top:0.1rem;height:4%">
      <div :class="[one == true ? 'yes' : 'no']" @click="today">今日</div>
      <div :class="[two == true ? 'yes' : 'no']" @click="yestday">昨日</div>
      <div :class="[three == true ? 'yes' : 'no']" @click="month">本月</div>
      <div :class="[four == true ? 'yes' : 'no']" @click="year">本年</div>
    </div>
    <div class="date" style="height:5%">
      <span style="margin-right:0.2rem">时间</span>
      <el-date-picker
        value-format="timestamp"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        size="small"
        style="width:2.7rem"
        :editable="false"
        @change="a"
        :clearable="false"
      ></el-date-picker>
      <span style="margin:0 0.2rem">至</span>
      <el-date-picker
        value-format="timestamp"
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        size="small"
        style="width:2.7rem"
        :editable="false"
        @change="b"
        :clearable="false"
      ></el-date-picker>
    </div>
    <!-- 设备sn搜索 -->
    <div style="text-align:center;font-size:0.3rem">选择设备
      <el-select
        v-model="data.machine_id"
        filterable
        placeholder="请选择设备"
        size="small"
        style="width:75%;margin-top:0.1rem"
        @change="getlist"
      >
        <el-option
          v-for="item in machine_list"
          :key="item.machine_name"
          :label="item.machine_name"
          :value="item.machine_id"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 商品列表 -->
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div style="flex:0.5">{{ index + 1 }}</div>
        <div style="flex:1.5">{{ item.goods_name }}</div>
        <div style="flex:1">{{ item.number }}件</div>
        <div style="flex:1">合计:{{ item.amount }}</div>
      </div>
    </div>

    <!-- <van-pagination v-model="currentPage" :page-count="12" mode="simple"/> -->
    <div style="height:10%"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    this.data.start_time = today.getTime() / 1000;
    this.data.end_time = today.getTime() / 1000 + 24 * 60 * 60 - 1;
    this.getlist();
    this.getmachine_list();
  },
  data() {
    return {
      one: true,
      two: false,
      three: false,
      four: false,
      start_time: new Date(),
      end_time: new Date(),
      value1: "",
      currentPage: 1,
      data: {
        token: window.sessionStorage.getItem("token"),
        start_time: "",
        end_time: "",
        machine_id: ""
      },
      list: [],
      machine_list: []
    };
  },
  methods: {
    // 设备列表
    getmachine_list() {
      this.$http
        .post("/machine/machine_list", this.$qs.stringify(this.data))
        .then(res => {
          this.machine_list = res.data.自营;
        });
    },
    // 获取列表
    getlist() {
      this.$http
        .post("/statistics/goods_statistics", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 日期选择搜索
    a() {
      this.data.start_time = this.start_time / 1000;
      this.getlist();
    },
    b() {
      this.data.end_time = this.end_time / 1000 + 24 * 60 * 60 - 1;
      this.getlist();
    },
    // 头部快捷按钮搜索
    today() {
      this.one = true;
      this.two = false;
      this.three = false;
      this.four = false;
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      this.data.end_time = today.getTime() / 1000 + 24 * 60 * 60 - 1;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    },
    yestday() {
      this.one = false;
      this.two = true;
      this.three = false;
      this.four = false;
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000 - 24 * 60 * 60;
      this.data.end_time = today.getTime() / 1000 - 1;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    },
    month() {
      this.one = false;
      this.two = false;
      this.three = true;
      this.four = false;
      let today = new Date();
      today.setDate(1);
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      let today1 = new Date();
      //today1.setHours(0, 0, 0, 0);
      this.data.end_time = Date.parse(today1) / 1000;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    },
    year() {
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = true;
      let today = new Date();
      today.setMonth(0);
      today.setDate(1);
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      let today1 = new Date();
      this.data.end_time = Date.parse(today1) / 1000;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    }
  }
};
</script>
<style>
.el-time-panel {
  left: -0.5rem !important;
}
</style>
<style lang="less" scoped>
.bigbox {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
}
// 头部日期搜索
.head1 {
  height: 10%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
  padding: 0.1rem 0;
  .no {
    width: 16%;
    height: 0.46rem;
    text-align: center;
    line-height: 0.46rem;
    background-color: #ccc;
    font-size: 0.25rem;
    border-radius: 0.1rem;
  }
  .yes {
    width: 16%;
    height: 0.46rem;
    text-align: center;
    line-height: 0.46rem;
    background-color: #8598d5;
    font-size: 0.25rem;
    border-radius: 0.1rem;
    color: #fff;
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
  height: 62%;
  overflow: auto;
  margin: 0.1rem auto;
  width: 97%;
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
