<template>
  <div>
    <!-- 收益统计 -->
    <div class="shouyi">
      <div class="top">
        <div>今日总收益</div>
        <span>
          0.00
          <span style="font-size:0.24rem">元</span>
        </span>
      </div>
      <div class="bottom">
        <div class="box" style="border-right:1px solid #918baa">
          <div>昨日总收益</div>
          <span>
            0.00
            <span style="font-size:0.22rem">元</span>
          </span>
        </div>
        <div class="box">
          <div>本月总收益</div>
          <span>
            0.00
            <span style="font-size:0.22rem">元</span>
          </span>
        </div>
      </div>
    </div>
    <div style="padding:0 0.2rem">
      <!-- 功能模块 -->
      <div class="same_box">
        <div class="same" style="border-right:1px solid #eeeeee" @click="machine">
          <img src="../../assets/img/shebei.png" alt />
          <div>
            <div class="top">设备管理</div>
            <div class="bot">在线0/16台 ></div>
          </div>
        </div>
        <div class="same" style="margin-left:0.2rem" @click="statistics">
          <img src="../../assets/img/jingying.png" alt />
          <div>
            <div class="top">经营统计</div>
            <div class="bot">经营详细概况 ></div>
          </div>
        </div>
      </div>
      <div class="function">
        <div class="box" @click="order">
          <img src="../../assets/img/order.png" alt />
          <div>订单查询</div>
        </div>
        <div class="box" @click="store">
          <img src="../../assets/img/mendian.png" alt />
          <div>门店管理</div>
        </div>
        <div class="box" @click="entrepot">
          <img src="../../assets/img/cangku.png" alt />
          <div>仓库管理</div>
        </div>
        <div class="box" @click="addmachine">
          <img src="../../assets/img/machine.png" alt />
          <div>设备注册</div>
        </div>
      </div>
      <!-- 设备管理 -->
      <div class="machine">
        <div class="title">设备管理</div>
        <div class="content">
          <div class="box">
            <img src="../../assets/img/rizhi.png" alt />
            <div>经营日志</div>
          </div>
          <router-link to="/goodsList">
            <div class="box">
              <img src="../../assets/img/goods.png" alt />
              <div>商品管理</div>
            </div>
          </router-link>
          <div class="box" @click="addgoods">
            <img src="../../assets/img/buji.png" alt />
            <div>补货管理</div>
          </div>
        </div>
      </div>
      <!-- 常用工具 -->
      <div class="machine">
        <div class="title">常用工具</div>
        <div class="content">
          <div class="box" @click="user">
            <img src="../../assets/img/yonghu.png" alt />
            <div>用户管理</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 设备管理
    machine() {
      this.$router.push("/machinelist");
    },
    // 注册设备
    addmachine() {
      this.$router.push("/addmachine");
    },
    // 经营统计
    statistics() {
      this.$router.push("/statistics");
    },
    // 订单查询
    order() {
      this.$router.push("/order");
    },
    // 门店管理
    store() {
      this.$router.push("/store");
    },
    // 仓库管理
    entrepot() {
      this.$router.push("/entrepot");
    },
    // 用户管理
    user() {
      this.$router.push("/user");
    },
    // 补货管理
    addgoods() {
      this.$router.push("/addgoods");
    }
  }
};
</script>
<style lang='less' scoped>
body {
  background: #f0f2f5 !important;
}
// 收益统计
.shouyi {
  width: 100%;
  color: #ffffff;
  margin-bottom: 0.2rem;
  background: url('../../assets/img/home.png') top left no-repeat;
  background-size: cover;
  .top {
    height: 3.48rem;
    text-align: center;
    padding-top: 1.1rem;
    box-sizing: border-box;
    font-size: 0.68rem;
    span {
      display: inline-block;
      margin-top: 0.1rem;
      font-weight: 800;
    }
  }
  .bottom {
    height: 1.28rem;
    display: flex;
    font-size: 0.31rem;
    border-top: 1px solid #dedde6;
    background-color: rgba(245, 241, 241, 0.336);
    color: #656566;
    .box {
      width: 50%;
      text-align: center;
      padding-top: 0.2rem;
      span {
        font-weight: 800;
        font-size: 0.36rem;
      }
    }
  }
}
.same_box {
  padding: 0.22rem;
  background-color: #fff;
  border-radius: 0.2rem;
  margin-top: 0.22rem;
  display: flex;
  .same {
    width: 50%;
    display: flex;
    align-items: center;
    img {
      width: 0.7rem;
      height: 0.7rem;
      margin-right: 0.3rem;
    }
    .top {
      font-size: 0.35rem;
    }
    .bot {
      font-size: 0.28rem;
      color: #ffa27c;
    }
  }
}
// 功能模块
.function {
  padding: 0.2rem;
  background-color: #fff;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  .box {
    color: #000;
    width: 24%;
    text-align: center;
    display: inline-block;
    font-size: 0.3rem;
    img {
      height: 0.7rem;
      width: 0.7rem;
    }
  }
}
// 设备管理
.machine {
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 0.2rem;
  margin-top: 0.2rem;
  width: 100%;
  .title {
    font-size: 0.28rem;
    font-weight: 800;
    border-bottom: 1px solid #eeeeee;
    padding: 0.2rem;
    padding-bottom: 0.05rem;
  }
  .content {
    padding: 0.2rem;
    .box {
      width: 24%;
      text-align: center;
      color: #000;
      display: inline-block;
      font-size: 0.3rem;
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
  }
}
</style>