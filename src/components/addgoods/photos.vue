<template>
  <div>
    <div>补货前是否拍照记录</div>
    <van-uploader v-model="fileList" multiple capture='camera' />
    <div class="btn">
        <el-button type="primary">确定</el-button>
        <el-button type="primary">跳过</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        // Uploader 根据文件后缀来判断是否为图片文件
      ]
    };
  }
};
</script>
<style>
.btn{
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around
}
</style>