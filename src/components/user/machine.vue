<template>
  <div>
    <div class="title">账号信息</div>
    <van-cell-group>
      <van-field v-model="num" label="账号" />
      <van-field v-model="name" label="使用人姓名" />
    </van-cell-group>
    <div class="title">账号权限</div>
    <van-cell-group>
      <van-field v-model="role" label="角色" />
    </van-cell-group>
    <div class="item" @click="show=true">
      <div>指定设备</div>
      <div>请选择设备</div>
    </div>
    <div class="btn">
      <el-button type="primary">删除用户</el-button>
      <el-button type="primary">保存用户</el-button>
    </div>
    <!-- 指定设备 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
      <div style="padding:0.1rem">指定设备</div>
      <div class="list">
        <div class="item">
          <div>望京设备一</div>
          <van-checkbox v-model="checked" @click="a"></van-checkbox>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: "",
      name: "",
      role: "",
      machine: "",
      show: false,
      checked: true
    };
  },
  methods: {
    a() {
      console.log(this.checked);
    }
  }
};
</script>
<style>
body {
  background-color: #fff;
}
.title {
  padding: 0.1rem;
  color: #cccccc;
}
.btn {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
}
.item {
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.12rem;
  border-bottom: 1px solid #cccccc;
}
</style>