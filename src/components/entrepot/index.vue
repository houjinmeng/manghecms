<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route="">
      <van-tabbar-item to="/entrepot/pool"
        ><span>总库</span
        ><img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/pooln.png')
              : require('../../assets/img/pool.png')
          "
        />
      </van-tabbar-item>

      <!-- <van-tabbar-item icon="setting-o" to="/entrepot/store">门店库存</van-tabbar-item> -->
      <van-tabbar-item icon="search" to="/entrepot/machine"
        ><span> 设备库存</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/shebeiy.png')
              : require('../../assets/img/shebein.png')
          "
      /></van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/entrepot/person"
        ><span> 个人库存</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active
              ? require('../../assets/img/persony.png')
              : require('../../assets/img/person.png')
          "/></van-tabbar-item
    ></van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style></style>
