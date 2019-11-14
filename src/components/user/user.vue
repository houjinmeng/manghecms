<template>
  <div class="txt">
    <div class="head">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" />
      </router-link>下级用户
    </div>
    <div>
      <div class="item" v-for="(item,index) in list" :key="index" @click="edit(item.user_id)">
        <div>{{item.nickname}}</div>
        <div style="color:#656565">
          {{item.rule_name}}&nbsp&nbsp&nbsp
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <router-link to="/adduser">
      <div style="text-align:center;margin-top:1rem">
        <el-button
          size="small"
          style="background-color:#8598d5;color:#fff;font-size:0.4rem;width:60%;border-radius: 0.2rem"
        >添加用户</el-button>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token")
      },
      list: []
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    // 补货员编辑
    edit(id) {
      window.sessionStorage.setItem('user_id',id)
      this.$router.push("/user/another");
    },
    // 获取用户列表
    getlist() {
      this.$http
        .post("/client/client_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    }
  }
};
</script>
<style scoped lang='less'>
.item {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
</style>