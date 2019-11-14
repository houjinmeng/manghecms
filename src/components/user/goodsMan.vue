<template>
  <div class="txt">
    <div class="title">
      <router-link to="/user">
        <van-icon name="arrow-left" class="back" />
      </router-link>用户信息
    </div>
    <van-cell-group>
      <van-field v-model="num" label="账号" />
      <van-field v-model="name" label="使用人姓名" />
    </van-cell-group>
        <div class="title">账号权限</div>
    <van-cell-group>
      <van-field v-model="role" label="角色" />
      <van-field v-model="machine" label="指定设备" />
    </van-cell-group>
    <div class="btn">
        <el-button type="primary">删除用户</el-button>
        <el-button type="primary">保存用户</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: "",
      name: "",
      role:'',
      machine:''
    };
  }
};
</script>
<style scoped lang='less'>
body{background-color: #fff;}
.title {
  padding: 0.2rem;
  font-size: 0.4rem;
  text-align: center;
  position: relative;
  border-bottom: 2px solid #f2f2f2;
  .back {
    left: 0.2rem;
    position: absolute;
    top: 0.3rem;
  }
}
.btn{
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around
}
</style>