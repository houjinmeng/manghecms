<template>
  <div>
    <div class="title">设备初始化审核</div>
    <div class="boxlist" v-for="(item, index) in list" :key="index">
      <div>
        <div>设备号 : {{ item.type_id }}</div>
        <div style="margin-top:0.1rem;display:flex;align-items:top">
          <div>UUID</div>&nbsp :&nbsp   
          <div
            style="width:4rem;word-wrap:break-word;overflow-x:auto;overflow-y:hidden"
            >{{ item.uuid }}</div
          >
        </div>
        <div style="margin-top:0.1rem">
          注册时间 : {{ (item.createtime * 1000) | formatDate }}
        </div>
      </div>
      <div>
        <div
          class="btn"
          style="margin-top:0.1rem;background:#f56c6c"
          @click="no(item.id)"
        >
          拒绝
        </div>
        <div class="btn" style="background:#409eff;margin-top:0.4rem" @click="ok(item.id)">
          同意
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm:ss"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        id: ""
      },
      list: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/machine/check_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 通过
    ok(id) {
      this.$dialog
        .confirm({
          message: "确定通过审核吗"
        })
        .then(() => {
          this.data.id = id;
          this.$http
            .post("/machine/check_success", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("审核成功");
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 拒绝
    no(id) {
      this.$dialog
        .confirm({
          message: "确定拒绝审核吗"
        })
        .then(() => {
          this.data.id = id;
          this.$http
            .post("/machine/check_error", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("审核已拒绝");
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style scoped lang="less">
.title {
  font-size: 0.4rem;
  padding: 0.2rem;
  text-align: center;
}
.boxlist {
  background-color: #fff;
  font-size: 0.28rem;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.1rem;
  .btn {
    padding: 0.1rem 0.5rem;
    color: #fff;
    border-radius: 0.1rem;
  }
}
</style>
