<template>
  <div>
    <div class="loading" v-show="tishi">
      <van-loading
        type="spinner"
        size="0.6rem"
        :vertical="true"
        style="margin:0.6rem 0"
        >提交中...</van-loading
      >
    </div>
    <div class="head" style="background:#fff">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" /> </router-link
      >升级管理
    </div>
    <van-cell-group>
      <van-field placeholder="请输入版本名称" label="版本名称" v-model="name" />
    </van-cell-group>
    <div style="text-align:center;margin-top:3rem">
      <van-uploader
        accept="*"
        style="margin:0.5rem 0.1rem"
        :after-read="upload"
      >
        <van-button icon="card" type="primary">上传文件</van-button>
      </van-uploader>
    </div>
    <div style="text-align:center;margin-top:3rem">
      <el-button
        size="small"
        style="background-color:#8598d5;color:#fff;font-size:0.4rem;width:60%;border-radius: 0.2rem"
        @click="ok"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tishi: false,
      token: window.sessionStorage.getItem("token"),
      name: "",
      size: "",
      app: null
    };
  },
  methods: {
    upload(file) {
      let fileName = file.file.name.lastIndexOf(".");
      let fileNameLength = file.file.name.length;
      let a = file.file.name.substring(fileName + 1, fileNameLength);
      if (a == "app" || a == "apk" || a == 1) {
        this.size = file.file.size / 1024 / 1024;
        this.app = file.file;
        this.$toast.success("上传成功,请点击提交");
      } else {
        this.$toast.fail("请选择正确格式的文件");
        return false;
      }
    },
    ok() {
      if (this.name.length == 0) {
        this.$toast.fail("请输入版本号");
        return false;
      }
      if (this.app == null) {
        this.$toast.fail("请上传正确格式的文件");
        return false;
      }
      let formData = new FormData();
      formData.append("app", this.app);
      formData.append("token", this.token);
      formData.append("size", this.size);
      formData.append("name", this.name);
      this.tishi=true
      this.$http({
        method: "post", // 指定请求方式
        url: "/version/app_uploads", // 请求接口
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;"
        },
        data: formData
      })
        .then(res => {
          if (res.data.code == 1) {
            this.tishi = false;
            this.$toast.success("提交成功");
            this.$router.push("/home");
          } else {
            //否则 Toast 提示
            this.$toast.fail(res.data.msg);
            this.tishi=false
          }
        })
        .catch(err => {
          this.tishi=false
          this.$toast.fail("系统异常");
          reject(err);
        });
    }
  }
};
</script>
<style></style>
