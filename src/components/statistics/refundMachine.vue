<template>
  <div>
    <div class="head" style="background:#fff">
      <van-icon name="arrow-left" class="back" @click="$router.back(1)" />
      设备退款明细
    </div>
    <div style="padding:0 0.2rem">
      <div class="list">
        <div class="title">
          <div>万达设备退款明细</div>
          <div>2019.09.03</div>
        </div>
        <div class="item">
          <div>
            <span class="name">望京店</span>
          </div>
          <div>
            <span>合计: 0.00</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="item">
          <div>
            <span class="name">中关村店</span>
          </div>
          <div>
            <span>合计: 0.00</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.list {
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem 0;
  .title {
    border-bottom: 1px solid #a8b8e2;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
  }
}
</style>
