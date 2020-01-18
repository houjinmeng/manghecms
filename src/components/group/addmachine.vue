<template>
  <div class="txt">
    <div class="head" style="background:#fff">
      <router-link to="/store">
        <van-icon name="arrow-left" class="back" /> </router-link
      >未分组设备列表
    </div>
    <div
      class="box"
      v-for="(item, index) in list"
      :key="index"
      @click="choose(item)"
    >
      <div>{{ item.machine_name }}</div>
      <div :class="[item.selected == true ? 'yes' : 'no']"></div>
    </div>
    <div style="height:1rem"></div>
    <!-- 底部保存 -->
    <div class="addbtn" @click="ok">保存</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
    let a = JSON.parse(window.sessionStorage.getItem("machineIds"));
    if (a != null) {
      this.machine_id = a;
    }
    window.sessionStorage.removeItem("machineIds");
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        group_id: window.sessionStorage.getItem("group_id"),
        machine_ids: ""
      },
      list: [],
      machine_id: []
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$http
        .post("/group/group_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.not_yet_list.forEach(i => {
            i.selected = false;
          });
          this.list = res.data.not_yet_list;
        });
    },
    // 选择设备
    choose(i) {
      if (i.selected == false) {
        i.selected = true;
        this.machine_id.push(i.machine_id);
        this.data.machine_ids = this.machine_id.join(",");
      } else {
        i.selected = false;
        this.machine_id.splice(this.machine_id.indexOf(i.machine_id), 1);
        this.data.machine_ids = this.machine_id.join(",");
      }
    },
    // 保存
    ok() {
      this.$http
        .post("/group/group_select", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.machine_id=[]
            this.$toast.success("保存成功");
            this.$router.push("/store");
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
.box {
  padding: 0.2rem;
  font-size: 0.3rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
}
.yes {
  width: 0.4rem;
  height: 0.4rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
}
.no {
  width: 0.4rem;
  height: 0.4rem;
  background-color: #f2f2f2;
  border-radius: 0.1rem;
  border: 1px solid #8598d5;
  box-sizing: border-box;
}
.addbtn {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #8598d5;
  text-align: center;
  color: #fff;
  font-size: 0.4rem;
}
</style>
