<template>
  <div class="txt">
    <div class="head" style="background:#fff">
      <router-link to="/machinelist">
        <van-icon name="arrow-left" class="back" /> </router-link
      >分配设备
    </div>
    <div class="box" v-for="(item,index) in list" :key="index" @click="choose(item.org_id)">
      <div>{{item.org_name}}</div>
      <div :class="[data.org_id == item.org_id ? 'yes' : 'no']"></div>
    </div>
    <div style="height:1rem"></div>
    <!-- 底部保存 -->
    <div class="addbtn" @click="keep">保存</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getorg();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        machine_id:window.sessionStorage.getItem("machineid"),
        org_id:''
      },
      list: []
    };
  },
  methods: {
    // 获取分配对象
    getorg() {
      this.$http
        .post("/org/org_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 选择分配对象
    choose(id){
      this.data.org_id=id
    },
    // 保存
    keep(){
      this.$http.post('/machine/machine_allocation',this.$qs.stringify(this.data)).then(res=>{
        if(res.data.code==1){
          this.$toast.success('分配成功')
          this.$router.push('/machinelist')
        }else{
          this.$toast.fail(res.data.msg)
        }
      })
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
  box-sizing: border-box
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
