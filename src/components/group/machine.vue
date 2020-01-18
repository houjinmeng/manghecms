<template>
  <div class="txt">
    <div class="head" style="background:#fff">
      <router-link to="/store">
        <van-icon name="arrow-left" class="back" /> </router-link
      >{{ group_name }}设备列表
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
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        group_id: window.sessionStorage.getItem("group_id"),
        machine_ids: ""
      },
      group_name: "",
      list: [],
      machine_id: []
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.machine_id=[]
      this.$http
        .post("/group/group_list", this.$qs.stringify(this.data))
        .then(res => {
          let keys = Object.keys(res.data);
          let value = Object.values(res.data);
          keys.forEach(i => {
            if (i == "not_yet_list") {
              keys.splice(keys.indexOf(i), 1);
              value.splice(keys.indexOf(i), 1);
            }
          });
          value.forEach(item => {
            if (this.data.group_id == item.group_id) {
              this.group_name = item.group_name;
              item.machine_list.forEach(r => {
                r.selected = true;
                this.machine_id.push(r.machine_id);
              });
              this.list = item.machine_list;
            }
          });
          this.data.machine_ids = this.machine_id.join(",");
        });
    },
    // 选择设备
    choose(item) {
      if (item.selected == true) {
        item.selected = false;
        this.machine_id.splice(this.machine_id.indexOf(item.machine_id), 1);
        this.data.machine_ids = this.machine_id.join(",");
      } else {
        item.selected = true;
        this.machine_id.push(item.machine_id);
        this.data.machine_ids = this.machine_id.join(",");
      }
    },
    // 保存
    ok() {
      this.$http
        .post("/group/group_select", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("保存成功");
            this.data.machine_ids=""
            this.getlist()
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
