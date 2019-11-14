<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="message"
        label="仓库名称"
        type="textarea"
        placeholder="请输入仓库名称"
        rows="1"
        autosize
      />
    </van-cell-group>
    <div style="text-align:center;margin-top:1rem">
      <el-button type="primary" style="width:80%">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  }
};
</script>
<style>
</style>