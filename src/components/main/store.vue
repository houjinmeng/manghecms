<template>
  <div>
    <van-search placeholder="请输入订单编号" v-model="value" @blur="onSearch" />
    <div>迪士尼-朝阳</div>
    <div class="list">
      <div class="item" @click="show=true">
        <span>望京店</span>
        <span>北京市朝阳区望京港旅大厦</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 门店设置 -->
     <van-popup v-model="show" position="bottom" :style="{height:'65%'}">
      <div>门店设置</div>
      <div class="list">
        <div class="item">
          <span>门店编辑</span>
          <van-icon name="arrow" />
        </div>
        <div class="item">
            <span>门店设备</span>
            <van-icon name="arrow" />
        </div>
        <div class="item">
            <span>门店收益</span>
            <van-icon name="arrow" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      show:false
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
<style lang='less' scoped>
.list {
  border: 1px solid #cccccc;
  background-color: #fff;
  .item {
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.1rem;
    border-bottom: 1px solid #cccccc;
  }
  .item:last-child{
      border: none
  }
}
</style>