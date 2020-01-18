<template>
  <div class="txt">
    <div class="loading" v-show="tishi">
      <van-loading
        type="spinner"
        size="0.6rem"
        :vertical="true"
        style="margin:0.6rem 0"
        >上传中...</van-loading
      >
    </div>
    <div class="head">
      <router-link to="/machinelist">
        <van-icon name="arrow-left" class="back" /> </router-link
      >设备编辑
    </div>
    <van-cell-group>
      <van-field
        v-model="SN"
        placeholder="系统生成的SN"
        label="设备号"
        disabled=""
      />
      <van-field
        v-model="data.machine_name"
        placeholder="请输入 例如:望京设备一"
        label="设备名称"
      />
      <van-field v-model="data.comment" placeholder="请输入" label="设备备注" />
      <van-field
        v-model="data.address"
        placeholder="例: 北京市朝阳区"
        label="设备地址"
      />
      <van-field
        v-model="data.address2"
        placeholder="例: 望京港旅大厦"
        label="补充地址"
      />
    </van-cell-group>
    <!-- 上传广告 -->
    <div class="upbox" style="padding:0.1rem 0.3rem">
      <div style="display:flex;align-items: center;">
        <div style="width:1.8rem">上传广告</div>
        <video
          :src="url"
          style="width:1rem;height:1rem"
          controls
          preload="auto"
          autoplay
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          webkit-playsinline="true"
        ></video>
      </div>
      <van-uploader accept="*" :after-read="uploadlogo1" :before-read="before">
        <img
          src="../../assets/img/zengjia.png"
          alt
          style="width:0.5rem;height:0.5rem"
      /></van-uploader>
    </div>
    <!-- 上传logo -->
    <div class="upbox">
      <div style="display:flex;align-items: center;">
        <div style="width:1.8rem">上传Logo</div>
        <van-uploader
          v-model="fileList"
          disabled
          :max-count="1"
          preview-size="1rem"
          style="margin-top:0.2rem"
        />
      </div>
      <van-uploader :after-read="uploadlogo" :before-read="beforeupload">
        <img
          src="../../assets/img/zengjia.png"
          alt
          style="width:0.5rem;height:0.5rem"
      /></van-uploader>
    </div>
    <!-- 上传选择 -->
    <!-- <van-popup v-model="show">
      <div class="choose">
        <router-link to="/sucai">
          <div style="border-bottom: 1px solid #ccc" class="choose_div">素材库</div>
        </router-link>
        <van-uploader v-model="fileList">
          <div class="choose_div">本地导入</div>
        </van-uploader>
      </div>
    </van-popup> -->
    <div @click="ok" class="btn">保 存</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      tishi: false,
      show: false,
      fileList: [],
      data: {
        token: window.sessionStorage.getItem("token"),
        machine_id: window.sessionStorage.getItem("machineid"),
        machine_name: "",
        address: "",
        address2: "",
        comment: "",
        logo_id: "",
        video_id: ""
      },
      SN: "",
      name: "",
      address: "",
      more: "",
      url: ""
    };
  },
  methods: {
    // 获取列表信息
    getlist() {
      this.$http
        .post("/machine/machine_edit_list", this.$qs.stringify(this.data))
        .then(res => {
          this.data.machine_name = res.data.machine_name;
          this.data.address = res.data.address;
          this.data.address2 = res.data.address2;
          this.data.comment = res.data.comment;
          this.data.logo_id = res.data.logo_id;
          this.data.video_id = res.data.video_id;
          this.SN = res.data.machine_id;
          if (res.data.video_url != null) {
            this.url = "http://blind.goldenbrother.cn" + res.data.video_url;
          }
          if (res.data.logo_url != null) {
            this.fileList.push({
              url: "http://blind.goldenbrother.cn" + res.data.logo_url
            });
          }
        });
    },
    // 保存
    ok() {
      this.$http
        .post("/machine/machine_edit_save", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("保存成功");
            this.$router.push("/machinelist");
          } else {
            this.$$toast.fail("保存失败");
          }
        });
    },
    // logo上传前校验
    beforeupload(file) {
      let fileName = file.name;
      const isLt2M = file.size / 1024 / 1024 < 5;
      // let regex = /(.jpg|.jpeg|.gif|.png|.bmp|.tif|.psd|.dng|.cr2|.nef)$/;
      let regex = /(.jpg|.png)$/;
      if (!isLt2M) {
        this.$toast.fail("上传图片大小不能超过 5MB!");
        return false;
      }
      if (regex.test(fileName.toLowerCase())) {
        return true;
      } else {
        this.$toast.fail("可上传jpg、png格式图片");
        return false;
      }
    },
    // 上传logo
    uploadlogo(file) {
      this.tishi = true;
      let formData = new FormData();
      formData.append("token", this.data.token);
      formData.append("file", file.file);
      formData.append("type", 1);
      this.$http({
        method: "post", // 指定请求方式
        url: "/machine/material_add", // 请求接口
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;"
        },
        data: formData
      })
        .then(res => {
          if (res.data.url != undefined) {
            this.tishi = false;
            this.fileList = [];
            this.$toast.success("上传成功");
            this.data.logo_id = res.data.logo_id;
            let obj = { url: "http://blind.goldenbrother.cn" + res.data.url };
            this.fileList.push(obj);
          } else {
            //否则 Toast 提示
            this.$toast.fail(res.data.msg);
          }
        })
        .catch(err => {
          this.$toast.fail("系统异常");
          reject(err);
        });
    },
    // 上传广告前检验
    before(file){
      let fileName = file.name;
      let regex = /(.mp4)$/;
      if (regex.test(fileName.toLowerCase())) {
        return true;
      } else {
        this.$toast.fail("文件格式为mp4");
        return false;
      }
    },
    // 上传广告
    uploadlogo1(file) {
      this.tishi = true;
      let formData = new FormData();
      formData.append("token", this.data.token);
      formData.append("file", file.file);
      formData.append("type", 2);
      this.$http({
        method: "post", // 指定请求方式
        url: "/machine/material_add", // 请求接口
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;"
        },
        data: formData
      })
        .then(res => {
          this.tishi = false;
          if (res.data.url != null) {
            this.$toast.success("上传成功");
            this.data.video_id = res.data.video_id;
            this.url = "http://blind.goldenbrother.cn" + res.data.url;
          } else {
            this.tishi=false
            //否则 Toast 提示
            this.$toast.fail(res.data.msg);
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
<style scoped>
.txt >>> .van-popup {
  border-radius: 0.2rem;
}
.upbox >>> .van-icon-clear {
  visibility: hidden !important;
}
.upbox >>> .van-field__label {
  width: 1.8rem !important;
}
.upbox {
  display: flex;
  align-items: center;
  font-size: 0.3rem;
  padding: 0rem 0.3rem;
  border-bottom: 1px solid #f2f2f2;
  justify-content: space-between;
}
.btn {
  width: 5rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
  font-size: 0.35rem;
  margin: 0.4rem auto;
  color: #fff;
  margin-top: 3rem;
}
.choose {
  width: 5rem;
  text-align: center;
}
.choose_div {
  font-size: 0.4rem;
  padding: 0.2rem;
}
</style>
