<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/addgoods">
        <van-icon name="arrow-left" class="back" /> </router-link
      >拍照记录
    </div>
    <div style="padding:0.2rem;text-align:center">
      <van-uploader
        v-model="fileList"
        capture="camera"
        preview-size="2.2rem"
        :max-count="1"
      />
      <div class="btn">
        <el-button
          type="primary"
          style="background:#8598d5;border:none"
          @click="upload"
          >确定</el-button
        >
        <el-button
          type="primary"
          style="background:#8598d5;border:none"
          @click="tiaoguo"
          >跳过</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      token: window.sessionStorage.getItem("token"),
      machine_id: window.sessionStorage.getItem("machine_id")
    };
  },
  methods: {
    // 确定
    upload() {
      if (this.fileList.length == 0) {
        this.$toast.fail("请拍照上传");
        return false;
      } else {
        let formData = new FormData();
        for (var i = 0; i < this.fileList.length; i++) {
          formData.append(`img[]`, this.fileList[i].file);
        }
        formData.append("token", this.token);
        formData.append("machine_id", this.machine_id);
        this.$http({
          method: "post", // 指定请求方式
          url: "/delivery/step_one", // 请求接口
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;"
          },
          data: formData
        })
          .then(res => {
            if (res.data.detail_id != undefined) {
              this.$toast.success("上传成功");
              window.sessionStorage.setItem("detail_id", res.data.detail_id);
              this.$router.push("/everymachine");
            } else {
              this.$toast.fail("上传失败");
            }
          })
          .catch(err => {
            this.$toast.fail("系统异常");
            reject(err);
          });
      }
    },
    // 跳过
    tiaoguo() {
      if (this.fileList.length == 10) {
        this.$toast.fail("请拍照上传");
        return false;
      } else {
        let formData = new FormData();
        for (var i = 0; i < this.fileList.length; i++) {
          formData.append(`img[]`, this.fileList[i].file);
        }
        formData.append("token", this.token);
        formData.append("machine_id", this.machine_id);
        this.$http({
          method: "post", // 指定请求方式
          url: "/delivery/step_one", // 请求接口
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;"
          },
          data: formData
        })
          .then(res => {
            if (res.data.detail_id != undefined) {
              // this.$toast.success("上传成功");
              window.sessionStorage.setItem("detail_id", res.data.detail_id);
              this.$router.push("/everymachine");
            } else {
              this.$toast.fail("上传失败");
            }
          })
          .catch(err => {
            this.$toast.fail("系统异常");
            reject(err);
          });
      }
    }
  }
};
</script>
<style scoped>
.btn {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
}
</style>
