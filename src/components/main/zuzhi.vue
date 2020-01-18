<template>
  <div class="txt">
    <div class="head">
      <router-link to="/home"
        ><van-icon name="arrow-left" class="back"
      /></router-link>
      组织列表
    </div>
    <div class="item" v-for="(item, index) in list" :key="index" @click="edit(item)">
      <div >{{ item.org_name }}</div>
      <div >管理员:{{ item.username }}</div>
      <div >{{ item.org_type }}<van-icon name="arrow" /></div>
    </div>
    <div style="height:1rem"></div>
    <router-link to="/addzuzhi"> <div class="btn">添加组织</div></router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: { token: window.sessionStorage.getItem("token")},
      list: []
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$http
        .post("/org/org_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    edit(item){
      window.sessionStorage.setItem("zuzhi",JSON.stringify(item))
      this.$router.push('/editzuzhi')
    }
  }
};
</script>
<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  font-size: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
.btn {
  background-color: #8598d5;
  color: #fff;
  position: fixed;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  width: 100%;
}
</style>
