<template>
  <div class="txt">
    <div class="head">
      <van-icon name="arrow-left" class="back" @click="$router.back(1)" />素材库
    </div>
    <ul class="choose">
      <li>
        <img src="../../assets/img/jingying.png" alt style="width:100%;height:100%" />
        <div :class="[ 1==2 ? 'yesdot' : 'nodot' ]"></div>
      </li>
      <li>
        <img src="../../assets/img/mendian.png" alt style="width:100%;height:100%" />
      </li>
      <li>
        <img src="../../assets/img/mendian.png" alt style="width:100%;height:100%" />
      </li>
       <li>
        <video src="../../assets/img/ss.mp4" style="width:100%;height:100%" controls preload="auto" autoplay></video>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.yesdot {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #8698d5;
  border-radius: 25%;
  border: 1px solid #8698d5;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.nodot {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #f2f2f2;
  border-radius: 25%;
  border: 1px solid #8698d5;
  position: absolute;
  top: 0rem;
  right: 0rem;
}
.choose {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0.2rem 0;
  overflow: hidden;
}
.choose li {
  float: left;
  width: 29.6%;
  height: 2rem;
  /* border: 1px solid #8698d5; */
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
  /* border-radius: 0.2rem; */
  font-size: 0.25rem;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}
</style>