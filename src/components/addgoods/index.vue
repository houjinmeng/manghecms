<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" /> </router-link
      >补货管理
    </div>
    <!-- 搜索 -->
    <van-search
      v-model="data.key"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div
        slot="action"
        @click="onSearch"
        style="color:#8598d5;font-size:0.35rem"
      >
        搜索
      </div>
    </van-search>
    <!-- 列表 -->
    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="top">
        <div>设备号 : {{ item.machine_id }}</div>
        <div>{{ item.machine_name }}</div>
      </div>
      <div>
        <div class="bot">
          <div class="one">
            仓位总数 :&nbsp&nbsp
            <span>{{ item.conf_count }}</span>
          </div>
          <div class="one">
            现有库存 :&nbsp&nbsp
            <span>{{ item.stock_count }}</span>
          </div>
        </div>
        <div class="bot" style="padding:0 0.2rem 0.2rem">
          <div class="btn" @click="addgoods(item)">补货</div>
          <div
            class="btn"
            @click="
              addrecord(item.machine_id)
            "
          >
            补货记录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.onSearch();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        key: ""
      },
      list: []
    };
  },
  methods: {
    // 获取设备列表
    onSearch() {
      this.$http
        .post("/delivery/machine_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 补货清货
    addgoods(item) {
      window.sessionStorage.setItem("machine_name", item.machine_name);
      window.sessionStorage.setItem("machine_id", item.machine_id);
      this.$router.push("/addgoods/photos");
    },
    // 补货记录
    addrecord(id) {
      window.sessionStorage.setItem("machine_id", id);
      this.$router.push("/addrecord");
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  margin: 0.2rem auto;
  width: 95%;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    align-items: center;
    border-bottom: 1px solid #a8b8e2;
  }
  .bot {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    align-items: center;
    .one {
      display: flex;
      align-items: center;
      span {
        font-size: 0.4rem;
        color: #8698d5;
      }
    }
    .btn {
      width: 1.2rem;
      text-align: center;
      padding: 0.1rem;
      background-color: #8598d5;
      color: #fff;
      border-radius: 0.1rem;
    }
  }
}
</style>
