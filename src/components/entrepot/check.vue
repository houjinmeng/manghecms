<template>
  <div>
    <div class="head" style="background:#fff">
      <van-icon name="arrow-left" class="back" @click="$router.back(-1)" />库存列表
    </div>
    <van-search
      v-model="data.goods_name"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch" style="color:#8598d5;font-size:0.35rem">搜索</div>
    </van-search>
    <div class="list" style="height:9.8rem;margin:0.2rem auto;width:95%">
      <div class="item" v-for="(item,index) in list" :key="index">
        <span style="flex:3">商品{{item.id}}</span>
        <span style="flex:4">{{item.goods_name}}</span>
        <span style="flex:1">{{item.number}}</span>
        <span
          style="flex:1.5;height:0.6rem;line-height:0.6rem;text-align:center;background:#8598d5;color:#fff;border-radius:0.2rem"
          @click="fenpei(item)"
        >分配</span>
      </div>
    </div>
    <div
      style="background:#8598d5;width:3rem;text-align:center;font-size:0.3rem;padding:0.2rem;margin:0 auto;color:#fff;border-radius:0.2rem"
      @click="showadd=true"
    >添加库存</div>
    <!-- 分配库存 -->
    <van-popup v-model="show" position="bottom" :style="{height:'65%'}">
      <div style="padding:0.2rem;font-size:0.3rem;box-sizing:border-box">商品出库</div>
      <div class="list" style="height:6.5rem;width:95%;margin:0 auto">
        <div class="item">
          <span>商品名称</span>
          <span style="color:#8598d5">{{goods_name}}</span>
        </div>
        <div class="item">
          <span>分配对象</span>
          <el-select
            v-model="data.obj_id"
            placeholder="请选择"
            size="small"
            popper-class="select-option"
            style="width:3rem"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.stock_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <van-cell-group>
            <van-field
              v-model="data.number"
              label="出库数量"
              placeholder="请输入数量"
              rows="1"
              type="number"
              input-align="right"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="btn" @click="fenpeiok">保 存</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.onSearch();
    this.getman();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        goods_name: "",
        stock_id: window.sessionStorage.getItem("stockid"),
        goods_id: "",
        number: "",
        obj_id: ""
      },
      goods_name: "",
      list: [],
      show: false,
      options: []
    };
  },
  methods: {
    // 库存列表
    onSearch() {
      this.$http
        .post("/stock/inventory_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 获取分配对象
    getman() {
      this.$http
        .post("/stock/inventory_obj", this.$qs.stringify(this.data))
        .then(res => {
          this.options = res.data;
        });
    },
    // 分配
    fenpei(item) {
      this.data.goods_id = item.goods_id;
      this.goods_name = item.goods_name;
      this.show = true;
    },
    // 分配保存
    fenpeiok() {
      this.$http
        .post("/stock/inventory_allocation", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("分配成功");
            this.getlist();
            this.show = false;
          } else {
            this.$toast.fail("分配失败");
          }
        });
    }
  }
};
</script>
<style scoped>
.list >>> .van-cell{
  padding: 0.2rem !important
}
.van-popup {
  background-color: #f0f2f5 !important;
}
.btn {
  width: 5rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
  font-size: 0.35rem;
  margin: 0.3rem auto;
  color: #fff;
}
</style>