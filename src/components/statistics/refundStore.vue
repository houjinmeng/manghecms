<template>
  <div>
    <div class="head" style="background:#fff">
      <van-icon name="arrow-left" class="back" @click="$router.back(1)" />
      门店退款
    </div>
    <div style="padding:0 0.2rem">
      <div class="list">
      <div class="title"><div>直营店退款统计</div><div>2019.09.03</div></div>
      <div class="item">
        <div>
          <span class="name" style="width:2.5rem">望京店</span>
          <span class="num">888台</span>
        </div>
        <div>
          <span style="display:inline-block;width:2.4rem">合计: 0.00</span>
          <van-icon name="arrow" />
        </div>
      </div>
     <div class="item">
        <div>
          <span class="name" style="width:2.5rem">望京店</span>
          <span class="num">888台</span>
        </div>
        <div>
          <span style="display:inline-block;width:2.4rem">合计: 888888.00</span>
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
    justify-content: space-between
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
    align-items: center;
    .name {
      display: inline-block;
      width: 1.2rem;
    }
    .num {
      display: inline-block;
      width: 1.2rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      border: 1px solid #a8b8e2;border-radius: 0.2rem
    }
  }
}
</style>
