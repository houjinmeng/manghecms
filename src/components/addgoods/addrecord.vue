<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/addgoods">
        <van-icon name="arrow-left" class="back" /> </router-link
      >补货记录
    </div>
    <!-- 搜索 -->
    <van-search
      v-model="data.key"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
    >
      <div
        slot="action"
        @click="getlist"
        style="color:#8598d5;font-size:0.35rem"
      >
        搜索
      </div>
    </van-search>
    <!-- 日期 -->
    <div
      style="padding:0.2rem;background:#fff;font-size:0.3rem;text-align:center;margin-top:0.1rem"
    >
      时间
      <el-date-picker
        value-format="timestamp"
        v-model="date"
        type="date"
        placeholder="选择日期"
        size="small"
        @change="choosedate(date)"
      >
      </el-date-picker>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="title">设备号 : {{data.machine_id}}</div>
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="msg(item.id, item.createtime)"
      >
        <div>{{ item.nickname }}</div>
        <div>
          <span>{{ (item.createtime * 1000) | formatDate }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy/MM/dd hh:mm:ss"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    this.data.time = today.getTime()/1000;
    this.getlist();
  },
  data() {
    return {
      date: new Date(),
      data: {
        token: window.sessionStorage.getItem("token"),
        machine_id: window.sessionStorage.getItem("machine_id"),
        time: "",
        key: ""
      },
      list: []
    };
  },
  methods: {
    // 选择日期
    choosedate(date) {
      this.data.time = date / 1000;
      this.getlist();
    },
    // 获取列表
    getlist() {
      this.$http
        .post("/delivery/delivery_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 补货详情
    msg(id, date) {
      window.sessionStorage.setItem("msgid", id);
      window.sessionStorage.setItem("date", date);
      this.$router.push("/recordmessage");
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  width: 95%;
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem auto;
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
