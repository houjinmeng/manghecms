<template>
  <div class="bigbox">
    <div class="head" style="background:#fff">
      <van-icon
        name="arrow-left"
        class="back"
        @click="$router.back(-1)"
      />库存列表
    </div>
    <van-search
      v-model="data.goods_name"
      placeholder="请输入商品名称"
      show-action
      shape="round"
      style="height:7%"
    >
      <div
        slot="action"
        @click="onSearch"
        style="color:#8598d5;font-size:0.35rem"
      >
        搜索
      </div>
    </van-search>
    <div class="list" style="height:75%;margin:0.1rem auto;width:97%">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span style="flex:3">商品{{ item.id }}</span>
        <span style="flex:4">{{ item.goods_name }}</span>
        <span style="flex:1">{{ item.number }}</span>
        <span
          style="flex:1.5;height:0.6rem;line-height:0.6rem;text-align:center;background:#8598d5;color:#fff;border-radius:0.2rem"
          @click="fenpei(item)"
          v-show="
            rule_name != '代理监督管理员' || rule_name != '品牌监督管理员'
          "
          >分配</span
        >
      </div>
    </div>
    <div
      style="background:#8598d5;width:3rem;text-align:center;font-size:0.3rem;padding:0.2rem;margin:0.2rem auto;color:#fff;border-radius:0.2rem"
      @click="add"
      v-show="rule_name != '代理监督管理员' || rule_name != '品牌监督管理员'"
    >
      添加库存
    </div>
    <!-- 分配库存 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
      <div style="padding:0.2rem;font-size:0.3rem;box-sizing:border-box">
        商品出库
      </div>
      <div class="list" style="height:6.5rem;width:95%;margin:0 auto">
        <div class="item">
          <span>商品名称</span>
          <span style="color:#8598d5">{{ goods_name }}</span>
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
    <!-- 添加库存 -->
    <van-popup v-model="showadd" position="bottom" :style="{ height: '65%' }">
      <div style="padding:0.2rem;font-size:0.3rem;box-sizing:border-box">
        添加库存
      </div>
      <div class="list" style="height:6.5rem;width:95%;margin:0 auto">
        <div class="item">
          <span>商品名称</span>
          <el-select
            v-model="data.goods_id"
            placeholder="请选择商品"
            size="small"
            popper-class="select-option"
            style="width:60%"
          >
            <el-option
              v-for="item in options1"
              :key="item.goods_id"
              :label="item.goods_name"
              :value="item.goods_id"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>添加数量</span>
          <el-input
            size="small"
            style="width:60%"
            placeholder="请在此输入"
            v-model="data.number"
          ></el-input>
        </div>
      </div>
      <div class="btn" @click="addok">保 存</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.onSearch();
    this.getman();
    this.getlist();
  },
  data() {
    return {
      rule_name: window.sessionStorage.getItem("rule_name"),
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
      show: false, //分配库存
      showadd: false, //添加库存
      options: [], //分配对象
      options1: [] //商品列表
    };
  },
  methods: {
    // 添加库存
    add() {
      this.data.goods_id = "";
      this.showadd = true;
    },
    addok() {
      if (this.data.goods_id == "") {
        this.$toast.fail("请选择商品");
      } else if (this.data.number == "") {
        this.$toast.fail("请输入数量");
      } else {
        this.$http
          .post("/stock/inventory_add", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("添加成功");
              this.onSearch();
              this.data.number = "";
              this.showadd = false;
            } else {
              this.$toast.fail(res.data.msg);
              this.showadd = false;
            }
          });
      }
    },
    // 库存列表
    onSearch() {
      this.$http
        .post("/stock/inventory_list", this.$qs.stringify(this.data))
        .then(res => {
          if (this.data.goods_name != "") {
            this.list = [];
            res.data.forEach(r => {
              if (r.goods_name.search(this.data.goods_name) != -1) {
                this.list.push(r);
              }
            });
          } else {
            this.list = res.data;
          }
        });
    },
    // 获取分配对象
    getman() {
      this.$http
        .post("/stock/inventory_obj", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.id != this.data.stock_id) {
              this.options.push(i);
            }
          });
        });
    },
    // 商品列表
    getlist() {
      this.$http
        .post("/stock/goods_list", this.$qs.stringify(this.data))
        .then(res => {
          this.options1 = res.data;
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
      if (this.data.obj_id == "") {
        this.$toast.fail("请选择分配对象");
        return false;
      } else if (this.data.number == "") {
        this.$toast.fail("请输入分配数量");
        return false;
      } else {
        this.$http
          .post("/stock/inventory_allocation", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("分配成功");
              this.onSearch();
              this.show = false;
            } else {
              this.$toast.fail("分配失败");
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.bigbox {
  position: fixed;
  width: 100%;
  height: 100%;
}
.list >>> .van-cell {
  padding: 0.2rem !important;
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
