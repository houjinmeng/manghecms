<template>
  <div class="bigbox">
    <van-tabs type="line" style="position: relative;">
      <router-link to="/home"
        ><div style="font-size:0.4rem;top:0.18rem;left:0.1rem;position: absolute;"><van-icon name="arrow-left"/></div>
      </router-link>
      <!-- 仓库列表 -->
      <van-tab title="仓库列表">
        <div class="list" style="height:90%;width:97%;margin:0.1rem auto">
          <div
            class="item"
            @click="setStock(item.stock_id, item.stock_name)"
            v-for="(item, index) in list"
            :key="index"
          >
            <span>{{ item.stock_name }}</span>
            <div>
              <span>管理</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div
          style="background:#8598d5;width:3rem;text-align:center;font-size:0.3rem;padding:0.2rem;margin:0.2rem auto;color:#fff;border-radius:0.2rem"
          @click="showadd = true"
          v-show="
            rule_name == '代理运营管理员' || rule_name == '品牌运营管理员'
          "
        >
          添加仓库
        </div>
        <!-- 添加仓库弹窗 -->
        <van-dialog
          v-model="showadd"
          title="添加仓库"
          show-cancel-button
          :before-close="close"
        >
          <div style="text-align:center">
            <el-input
              style="width:70%;margin:0.2rem"
              placeholder="请输入仓库名称"
              v-model="data.stock_name"
            ></el-input>
          </div>
        </van-dialog>
        <!-- 仓库编辑 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
          <div
            class="dialog"
            style="height:10%;line-height:0.4rem;padding:0.2rem;font-size:0.3rem;background:#f0f2f5;box-sizing:border-box"
          >
            {{ stock_name }}
          </div>
          <div style="background:#f0f2f5;padding:0 0.2rem;height:90%">
            <div class="list">
              <div
                class="item"
                v-show="
                  rule_name == '代理运营管理员' || rule_name == '品牌运营管理员'
                "
                @click="(showedit = true), (show = false)"
              >
                <span>仓库名称</span>
                <van-icon name="arrow" />
              </div>
              <router-link to="/entrepot/check">
                <div class="item">
                  <span>查看库存</span>
                  <van-icon name="arrow" />
                </div>
              </router-link>
              <div
                class="item"
                @click="delet"
                v-show="
                  rule_name == '代理运营管理员' || rule_name == '品牌运营管理员'
                "
              >
                <span>仓库删除</span>
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </van-popup>
        <!-- 仓库名称 -->
        <van-dialog
          v-model="showedit"
          title="仓库名称"
          show-cancel-button
          :before-close="close1"
        >
          <div style="text-align:center">
            <el-input
              style="width:70%;margin:0.2rem"
              placeholder="请输入仓库名称"
              v-model="edit.stock_name"
            ></el-input>
          </div>
        </van-dialog>
      </van-tab>
      <!-- 日志 -->
      <van-tab title="出/入库日志">
        <div class="head" style="height:4%">
          <div :class="[one == true ? 'yes' : 'no']" @click="getlist1">
            全部
          </div>
          <div :class="[two == true ? 'yes' : 'no']" @click="outlist">出库</div>
          <div :class="[three == true ? 'yes' : 'no']" @click="inlist">
            入库
          </div>
        </div>
        <div class="date" style="height:5%">
          <span style="margin:0 0.2rem;font-size:0.3rem">时间</span>
          <el-date-picker
            value-format="timestamp"
            v-model="start_time"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width:38%"
            :editable="false"
            @change="a"
            :clearable="false"
          ></el-date-picker>
          <span style="margin:0 0.2rem;font-size:0.3rem">至</span>
          <el-date-picker
            value-format="timestamp"
            v-model="end_time"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width:38%"
            :editable="false"
            @change="b"
            :clearable="false"
          ></el-date-picker>
        </div>
        <div class="list" style="width:100%;margin-top:0.1rem">
          <div class="box" v-for="(item, index) in list1" :key="index">
            <div class="one">
              <div>商品名称 : {{ item.goods_name }}</div>
              <div>数 &nbsp 量 : {{ item.number }}</div>
            </div>
            <div class="one">
              <div>
                时 &nbsp &nbsp &nbsp 间 : {{ (item.time * 1000) | formatDate }}
              </div>
              <div>动 &nbsp&nbsp作 : {{ item.status }}</div>
            </div>
            <div class="one">
              <div>出&nbsp 库&nbsp 方 : {{ item.stock_from }}</div>
              <div>入库方 : {{ item.stock_to }}</div>
            </div>
          </div>
          <!-- <div class="item" style="text-align:center">
            <div>商品名称</div>
            <div>数量</div>
            <div>时间</div>
            <div>出库方</div>
            <div>动作</div>
            <div>入库方</div>
          </div> -->
          <!-- <div class="item" style="text-align:center" v-for="(item,index) in list1" :key="index">
            <div>{{item.goods_name}}</div>
            <div>{{item.number}}</div>
            <div>
              <div>{{item.time*1000|formatDate}}</div>
              <div>{{item.time*1000|formatDateTwo}}</div>
            </div>
            <div>{{item.stock_from}}</div>
            <div>{{item.status}}</div>
            <div>{{item.stock_to}}</div>
          </div> -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "MM-dd"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    this.getlist(); // 仓库列表
    this.getlist1(); // 日志列表
  },
  data() {
    return {
      // 日志快捷按钮
      one: true,
      two: false,
      three: false,
      rule_name: window.sessionStorage.getItem("rule_name"),
      stock_name: "",
      showedit: false, //仓库名称
      showadd: false, //添加仓库
      data: { token: window.sessionStorage.getItem("token"), stock_name: "" },
      edit: {
        token: window.sessionStorage.getItem("token"),
        stock_name: "",
        stock_id: ""
      },
      start_time: "",
      end_time: "",
      rizhi: {
        token: window.sessionStorage.getItem("token"),
        start_time: "",
        end_time: ""
      },
      list: [], // 仓库列表
      list1: [], // 日志列表
      show: false,
      value1: ""
    };
  },
  methods: {
    // 选择日期
    a() {
      this.rizhi.start_time = this.start_time / 1000;
      this.getlist1()
    },
    b() {
      this.rizhi.end_time = this.end_time / 1000 + 24 * 60 * 60 - 1;
      this.getlist1();
    },
    // 仓库列表
    getlist() {
      this.$http
        .post("/stock/stock_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 出入库日志
    getlist1() {
      this.list1 = [];
      this.one = true;
      this.two = false;
      this.three = false;
      this.$http
        .post("/stock/inventory_log", this.$qs.stringify(this.rizhi))
        .then(res => {
          res.data.forEach(i => {
            if (i.status == 0) {
              i.status = "出库";
            } else {
              i.status = "入库";
            }
          });
          this.list1 = res.data;
        });
    },
    // 日志出库按钮
    outlist() {
      this.list1 = [];
      this.two = true;
      this.one = false;
      this.three = false;
      this.$http
        .post("/stock/inventory_log", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.status == 0) {
              i.status = "出库";
              this.list1.push(i);
            }
          });
        });
    },
    // 日至入库按钮
    inlist() {
      this.list1 = [];
      this.three = true;
      this.one = false;
      this.two = false;
      this.$http
        .post("/stock/inventory_log", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.status == 1) {
              i.status = "出库";
              this.list1.push(i);
            }
          });
        });
    },
    // 设置仓库
    setStock(id, name) {
      this.edit.stock_name = name;
      this.edit.stock_id = id;
      this.stock_name = name;
      this.show = true;
      window.sessionStorage.setItem("stockid", id);
    },
    // 确定添加仓库
    close(action, done) {
      if (action == "confirm") {
        if (this.data.stock_name == "") {
          this.$toast.success("请输入仓库名称");
          done(false);
          return false;
        }
        this.$http
          .post("/stock/stock_add", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("添加成功");
              this.getlist();
              done();
            } else {
              this.$toast.fail("添加失败");
            }
          });
      } else {
        done();
      }
    },
    // 修改仓库名称
    close1(action, done) {
      if (action == "confirm") {
        if (this.edit.stock_name == "") {
          this.$toast.success("请输入仓库名称");
          done(false);
          return false;
        }
        this.$http
          .post("/stock/stock_edit", this.$qs.stringify(this.edit))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("保存成功");
              this.getlist();
              done();
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
      } else {
        done();
      }
    },
    // 删除仓库
    delet() {
      this.show = false;
      this.$dialog
        .confirm({
          title: "",
          message: "确定删除该仓库吗"
        })
        .then(() => {
          // on confirm
          this.$http
            .post("/stock/stock_delete", this.$qs.stringify(this.edit))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("删除成功");
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style scoped>
.box {
  padding: 0.1rem 0;
  padding-left: 0.2rem;
  border-bottom: 2px solid #f1f1f1;
}
.box .one {
  display: flex;
}
.box .one div {
  flex: 1;
  font-size: 0.28rem;
}
.bigbox {
  position: fixed;
  width: 100%;
  height: 100%;
}
.bigbox >>> .van-tabs {
  height: 100%;
}
.bigbox >>> .van-tabs--line .van-tabs__wrap {
  height: 7% !important;
}
.bigbox >>> .van-tabs__content {
  height: 100%;
}
.bigbox >>> .van-tab__pane,
.van-tab__pane-wrapper {
  height: 90%;
}
/* 头部日期搜索 */
.head {
  margin-top: 0.1rem;
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}
.yes {
  width: 16%;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  background-color: #8598d5;
  color: #fff;
  font-size: 0.3rem;
  border-radius: 0.2rem;
}
.no {
  width: 16%;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  border: 1px solid #8598d5;
  box-sizing: border-box;
  color: #8598d5;
  font-size: 0.3rem;
  border-radius: 0.2rem;
}
.date {
  padding: 0.2rem;
  background-color: #fff;
  display: flex;
  align-items: center;
}
</style>
