<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" /> </router-link
      >设备列表
    </div>
    <div class="box" v-for="(item, index) in list" :key="index">
        <div>设 &nbsp备 &nbsp号 : {{ item.machine_id }}</div>
        <div style="margin-top:0.1rem">设备名称 : {{ item.machine_name }}</div>
        <div style="margin-top:0.1rem">当前版本 : {{item.soft_version}}</div>
      <div class="one">
          <div style="margin-top:0.1rem">设备状态 : {{item.status}}</div>
        <div class="btn" @click="up(item.machine_id)" v-show="item.status=='有新版本待升级'">升级</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: { token: window.sessionStorage.getItem("token") ,machine_id:''},
      list: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/version/machine_upgrade_list", this.$qs.stringify(this.data))
        .then(res => {
        res.data.forEach(i => {
            if(i.status==1){
                i.status='有新版本待升级'
            }else{
                i.status='已是最新版本'
            }
        });
          this.list = res.data;
        });
    },
    // 升级
    up(id) {
      this.$dialog
        .confirm({
          message: "确定升级该设备吗"
        })
        .then(() => {
          this.data.machine_id = id;
          this.$http
            .post("/version/machine_upgrade", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("升级成功");
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
  }
};
</script>
<style scoped lang="less">
.box {
  background-color: #fff;
  font-size: 0.28rem;
  padding: 0.1rem;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.1rem;
  margin-top: 0.1rem;
  .one{
      display: flex;
      justify-content: space-between
  }
  .btn {
    padding: 0.1rem 0.5rem;
    background-color: #8598d5;
    color: #fff;
    border-radius: 0.1rem;
  }
}
</style>
