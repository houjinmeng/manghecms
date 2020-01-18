<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/addrecord">
        <van-icon name="arrow-left" class="back" /> </router-link
      >补货记录详情
    </div>
    <div style="padding:0.2rem 0.4rem;font-size:0.3rem;background:#fff">
      时间 &nbsp {{ (date * 1000) | formatDate }}
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="title">设备号 : {{machine_id}}</div>
      <div class="item">
        <div style="text-align:center;flex:1">仓位</div>
        <div style="text-align:center;flex:1">动作</div>
        <div style="text-align:center;flex:3">商品</div>
        <div style="text-align:center;flex:1">数量</div>
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div style="text-align:center;flex:1">{{ item.location }}</div>
        <div style="text-align:center;flex:1">{{ item.type }}</div>
        <div style="text-align:center;flex:3">{{ item.goods_name }}</div>
        <div style="text-align:center;flex:1">{{ item.number }}</div>
      </div>
    </div>
    <!-- 补货前照片 -->
    <div class="list">
      <div class="title">补货前照片</div>
      <div class="item">
        <van-uploader
          v-model="before"
          disabled
          preview-size="2rem"
          :max-count="1"
        />
      </div>
    </div>
    <!-- 补货后照片 -->
    <div class="list">
      <div class="title">补货后照片</div>
      <div class="item">
        <van-uploader
          v-model="after"
          disabled
          preview-size="2rem"
          :max-count="1"
        />
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
    this.getlist();
  },
  data() {
    return {
      machine_id:window.sessionStorage.getItem("machine_id"),
      date: window.sessionStorage.getItem("date"),
      data: {
        token: window.sessionStorage.getItem("token"),
        id: window.sessionStorage.getItem("msgid")
      },
      before: [],
      after: [],
      list: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/delivery/delivery_detail", this.$qs.stringify(this.data))
        .then(res => {
          res.data.log.forEach(i => {
            if (i.type == 0) {
              i.type = "补货";
            } else {
              i.type = "清货";
            }
          });
          res.data.before.forEach(res => {
            res.url = "http://liujunfeng.imwork.net:28246" + res.url;
          });
          res.data.after.forEach(res => {
            res.url = "http://liujunfeng.imwork.net:28246" + res.url;
          });
          this.before = res.data.before;
          this.after = res.data.after;
          this.list = res.data.log;
        });
    }
  }
};
</script>
<style scoped>
.list >>> .van-icon {
  visibility: hidden !important;
}
.list {
  width: 95%;
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem auto;
}
.item {
  display: flex;
  padding: 0.2rem;
  font-size: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
.title {
  border-bottom: 1px solid #a8b8e2;
  padding: 0.2rem;
}
</style>
