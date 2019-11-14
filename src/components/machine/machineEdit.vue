<template>
  <div class="txt">
    <div class="head">
      <router-link to="/machinelist">
        <van-icon name="arrow-left" class="back" />
      </router-link>设备编辑
    </div>
    <van-cell-group>
      <van-field v-model="SN" placeholder="系统生成的SN" label="设备号" />
      <van-field v-model="data.machine_name" placeholder="请输入 例如:望京设备一" label="设备名称" />
      <van-field v-model="data.comment" placeholder="请输入" label="设备备注" />
      <van-field v-model="data.address" placeholder="例: 北京市朝阳区" label="设备地址" />
      <van-field v-model="data.address2" placeholder="例: 望京港旅大厦" label="补充地址" />
    </van-cell-group>
    <!-- 上传广告 -->
    <div class="upbox" style="padding:0.1rem 0.3rem">
      <div style="display:flex;align-items: center;">
        <div style="width:1.8rem">上传广告</div>
        <video src="../../assets/img/ss.mp4" style="width:1rem;height:1rem" controls preload="auto" autoplay></video>
      </div>
      <img
        src="../../assets/img/zengjia.png"
        alt
        style="width:0.5rem;height:0.5rem"
        @click="show=true"
      />
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
      <img
        src="../../assets/img/zengjia.png"
        alt
        style="width:0.5rem;height:0.5rem"
        @click="show=true"
      />
    </div>
    <!-- 上传选择 -->
    <van-popup v-model="show">
      <div class="choose">
        <router-link to="/sucai">
          <div style="border-bottom: 1px solid #ccc" class="choose_div">素材库</div>
        </router-link>
        <van-uploader>
          <div class="choose_div">本地导入</div>
        </van-uploader>
      </div>
    </van-popup>
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
      show: false,
      fileList: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
      data: {
        token: window.sessionStorage.getItem("token"),
        machine_id: window.sessionStorage.getItem("machineid"),
        machine_name: "",
        address: "",
        address2: "",
        comment: ""
      },
      SN: "",
      name: "",
      address: "",
      more: ""
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/machine/machine_edit_list", this.$qs.stringify(this.data))
        .then(res => {
          this.data.machine_name = res.data.machine_name;
          this.data.address = res.data.address;
          this.data.address2 = res.data.address2;
          this.data.comment = res.data.comment;
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