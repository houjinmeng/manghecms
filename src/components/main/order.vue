<template>
  <div style="height:100%">
    <div
      style="height:7%;display:flex;background:#fff;justify-content: space-between;"
    >
      <router-link to="/home"
        ><div style="font-size:0.4rem;margin:0.15rem 0.1rem">
          <van-icon name="arrow-left" />
        </div>
      </router-link>
      <van-search
        v-model="data.unique_order_id"
        placeholder="请输入订单编号"
        show-action
        shape="round"
        style="height:100%;width:90%"
      >
        <div
          slot="action"
          @click="getlist"
          style="color:#8598d5;font-size:0.35rem"
        >
          搜索
        </div>
      </van-search>
    </div>
    <div style="font-size:0.3rem;text-align:center;margin:0.2rem 0">
      时间
      <el-date-picker
        value-format="timestamp"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        size="mini"
        style="width:2.8rem"
        :editable="false"
        @change="a"
        :clearable="false"
      ></el-date-picker
      >至
      <el-date-picker
        value-format="timestamp"
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        size="mini"
        style="width:2.8rem"
        :editable="false"
        @change="b"
        :clearable="false"
      ></el-date-picker>
    </div>
    <div class="status">
      <div class="head">
        <div :class="[one == true ? 'yes' : 'no']" @click="all">全部</div>
        <div :class="[two == true ? 'yes' : 'no']" @click="success">成功</div>
        <div :class="[three == true ? 'yes' : 'no']" @click="nopay">未支付</div>
      </div>
      <div class="head">
        <div :class="[four == true ? 'yes' : 'no']" @click="normal">不正常</div>
        <div :class="[five == true ? 'yes' : 'no']" @click="somenormal">
          部分成功
        </div>
        <div :class="[six == true ? 'yes' : 'no']" @click="hands">手工更正</div>
      </div>
    </div>
    <div class="list" style="width:95%;margin:0.1rem auto;height:70%">
      <div
        @click="
          (rule_name != '品牌监督管理员' || rule_name != '代理监督管理员') &&
            (item.error == '不正常' || item.error == '部分成功') &&
            item.status == '已支付' &&
            edit(item)
        "
        v-for="(item, index) in orderlist"
        :key="index"
        style="font-size:0.25rem;position: relative;padding:0.2rem 0.2rem 0 0.2rem"
      >
        <div
          style="position: absolute;font-size:0.1rem;color:red;top:0.1rem;right:0.2rem"
          v-show="item.hand == true"
        >
          手工更正
        </div>
        <span>订单号 : {{ item.unique_order_id }}</span>
        <div class="item" style="padding:0.2rem 0">
          <span style="flex:0.6">¥ {{ item.amount }}</span>
          <span style="flex:1.3">{{
            (item.createtime * 1000) | formatDate
          }}</span>
          <span style="flex:0.5;text-align:center">{{ item.status }}</span>
          <div style="flex:0.8;text-align:right">
            <span v-if="item.status == '已支付'">{{ item.error }}</span>
            <van-icon
              name="arrow"
              v-show="
                (item.error == '不正常' || item.error == '部分成功') &&
                  item.status == '已支付'
              "
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <van-pagination
      v-model="currentPage"
      :page-count="12"
      mode="simple"
      style="margin:0.2rem"
    /> -->
    <!-- 订单编辑 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '55%' }"
      @close="close"
    >
      <div class="edit">
        <span>订单编号:{{ ordernum }}</span>
        <span style="color:red">{{ orderstatus }}</span>
      </div>
      <div class="list" v-if="list" style="width:95%;margin:0 auto">
        <div class="item" @click="(list = false), (hand = true)">
          <span>手工退款</span>
        </div>
        <!-- <div class="item" @click="editdialog = true">更改状态</div> -->
      </div>
      <div class="hand" v-if="hand">
        <el-input
          v-model="data1.amount"
          placeholder="请输入退款金额"
          style="width:60%"
          type="number"
        ></el-input>
        <el-button
          type="primary"
          style="background:#8598d5;border:none"
          @click="surepay"
          >确定</el-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy/MM/dd hh:mm:ss"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  mounted() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    this.data.start_time = today.getTime() / 1000;
    this.data.end_time = today.getTime() / 1000 + 24 * 60 * 60 - 1;
    this.getlist();
  },
  data() {
    return {
      rule_name: window.sessionStorage.getItem("rule_name"),
      // 订单快速查询状态
      one: true,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      ordernum: "", // 订单号
      orderstatus: "", // 订单状态
      start_time: new Date(),
      end_time: new Date(),
      data: {
        token: window.sessionStorage.getItem("token"),
        start_time: "",
        end_time: "",
        unique_order_id: ""
        //amount:''
      },
      data1: {
        token: window.sessionStorage.getItem("token"),
        unique_order_id: "",
        amount: ""
      },
      orderlist: [],
      value: "",
      currentPage: 1,
      show: false,
      editdialog: false,
      list: true,
      hand: false,
      date: new Date()
    };
  },
  methods: {
    // 日期选择
    a() {
      this.data.start_time = this.start_time / 1000;
      this.getlist();
    },
    b() {
      this.data.end_time = this.end_time / 1000 + 24 * 60 * 60 - 1;
      this.getlist();
    },
    // 获取列表
    getlist() {
      this.orderlist = [];
      this.one = true;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = false;
      this.six = false;
      this.$http
        .post("/order/order_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            i.hand = false;
            if (i.error == 0) {
              i.error = "不正常";
            } else if (i.error == 1) {
              i.error = "成功";
            } else if (i.error == 2) {
              i.error = "部分成功";
            } else {
              i.hand = true;
              i.error = "成功";
            }
            if (i.status == 0) {
              i.status = "未支付";
            } else {
              i.status = "已支付";
            }
          });
          this.orderlist = res.data;
        });
    },
    // 快速订单状态查询
    all() {
      this.orderlist = [];
      this.one = true;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = false;
      this.six = false;
      this.getlist();
    },
    success() {
      this.orderlist = [];
      this.one = false;
      this.two = true;
      this.three = false;
      this.four = false;
      this.five = false;
      this.six = false;
      this.$http
        .post("/order/order_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.error == 1) {
              i.error = "成功";
              i.status = "已支付";
              this.orderlist.push(i);
            }
          });
        });
    },
    nopay() {
      this.orderlist = [];
      this.one = false;
      this.two = false;
      this.three = true;
      this.four = false;
      this.five = false;
      this.six = false;
      this.$http
        .post("/order/order_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.status == 0) {
              i.status = "未支付";
              this.orderlist.push(i);
            }
          });
        });
    },
    normal() {
      this.orderlist = [];
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = true;
      this.five = false;
      this.six = false;
      this.$http
        .post("/order/order_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.error == 0 && i.status == 1) {
              i.error = "不正常";
              i.status = "已支付";
              this.orderlist.push(i);
            }
          });
        });
    },
    somenormal() {
      this.orderlist = [];
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = true;
      this.six = false;
      this.$http
        .post("/order/order_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.error == 2 && i.status == 1) {
              i.error = "部分成功";
              i.status = "已支付";
              this.orderlist.push(i);
            }
          });
        });
    },
    hands() {
      this.orderlist = [];
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
      this.five = false;
      this.six = true;
      this.$http
        .post("/order/order_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.error == 3) {
              i.error = "成功";
              i.status = "已支付";
              i.hand = true;
              this.orderlist.push(i);
            }
          });
        });
    },
    // 编辑
    edit(i) {
      this.ordernum = i.unique_order_id;
      this.orderstatus = i.error;
      this.data1.unique_order_id = i.unique_order_id;
      this.show = true;
    },
    // 手工退款确定
    surepay() {
      if (this.data1.amount == "") {
        this.$toast.fail("请输入退款金额");
      } else {
        this.$http
          .post("/order/refund", this.$qs.stringify(this.data1))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success(res.data.msg);
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
      }
    },
    // 关闭弹出层
    close() {
      this.list = true;
      this.hand = false;
    }
  }
};
</script>
<style lang="less" scoped>
// 头部日期搜索
.head {
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  .no {
    width: 18%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background-color: #ccc;
    font-size: 0.25rem;
    border-radius: 0.1rem;
  }
  .yes {
    width: 18%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background-color: #8598d5;
    font-size: 0.25rem;
    border-radius: 0.1rem;
    color: #fff;
  }
}
.status {
  background-color: #fff;
  margin-top: 0.05rem;
}
.edit {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3rem;
}
.hand {
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
