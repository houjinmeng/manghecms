<template>
  <div style="text-align:center" class="txt">
    <img
      src="../../assets/img/saoma.png"
      alt
      style="width:2rem;height:2rem;margin-top:3rem;margin-bottom:0.5rem"
    />
    <div style="text-align:center">
      <a href="http://sao315.com/w/api/saoyisao?redirect_uri=">
        <div class="btn">扫描设备二维码</div>
      </a>
    </div>
    <router-link to="/home">
      <div class="btn">返回</div>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    
  },
  data() {
    return {};
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("\\b" + name + "=([^&]*)");
      var r = location.href.match(reg);
      if (r != null) return unescape(r[1]);
    }
  }
};
</script>
<style scoped>
.btn {
  width: 3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #ffffff;
  background-color: #8598d5;
  margin: 0.3rem auto;
  font-size: 0.3rem;
  border-radius: 0.2rem;
}
</style>