<template>
  <div>
    <div class="title">账号信息</div>
    <van-cell-group>
      <van-field v-model="num" label="账号" />
      <van-field v-model="name" label="使用人姓名" />
    </van-cell-group>
        <div class="title">账号权限</div>
    <van-cell-group>
      <van-field v-model="num" label="角色" />
      <van-field v-model="name" label="归属" />
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
      name: ""
    };
  }
};
</script>
<style>
body{background-color: #fff;}
.title{
    padding: 0.1rem;
    color: #cccccc
}
.btn{
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around
}
</style>