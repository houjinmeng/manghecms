<template>
  <div>
    <!-- 收益统计 -->
    <div class="shouyi">
      <div class="top" style="position: relative;">
        <router-link to="/home"
          ><div
            style="font-size:0.5rem;top:0.18rem;left:0.1rem;position: absolute;color:#fff"
          >
            <van-icon name="arrow-left" />
          </div>
        </router-link>
        <div>总销售额</div>
        <span>
          {{ count }}
          <span style="font-size:0.24rem">元</span>
        </span>
      </div>
      <div
        class="bottom"
        v-show="rule_name == '品牌运营管理员' || rule_name == '品牌监督管理员'"
      >
        <div class="box" style="border-right:1px solid #f2f2f2">
          <div>{{ time }}直营收入</div>
          <span> {{ onecount }} </span>元
        </div>
        <div class="box" style="border-right:1px solid #f2f2f2">
          <div>{{ time }}下级收入</div>
          <span> {{ twocount }} </span>元
        </div>
        <!-- <div class="box">
          <div>直营店收入</div>
          <span>
            0.00
            <span style="font-size:0.22rem">元</span>
          </span>
        </div> -->
      </div>
    </div>
    <!-- 头部日期搜索 -->
    <div class="head" style="margin-top:0.1rem">
      <div :class="[one == true ? 'yes' : 'no']" @click="today">今日</div>
      <div :class="[two == true ? 'yes' : 'no']" @click="yestday">昨日</div>
      <div :class="[three == true ? 'yes' : 'no']" @click="month">本月</div>
      <div :class="[four == true ? 'yes' : 'no']" @click="year">本年</div>
    </div>
    <div class="date">
      <span style="margin:0 0.2rem">时间</span>
      <el-date-picker
        value-format="timestamp"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        size="small"
        style="width:2.7rem"
        :editable="false"
        @change="a"
        :clearable="false"
      ></el-date-picker>
      <span style="margin:0 0.2rem">至</span>
      <el-date-picker
        value-format="timestamp"
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        size="small"
        style="width:2.7rem"
        :editable="false"
        @change="b"
        :clearable="false"
      ></el-date-picker>
    </div>
    <!-- 直营店收入统计 -->
    <div class="list" v-show="num != 0">
      <div class="title">直营-收入统计</div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div>{{ item.machine_name }}</div>
        <span>合计: {{ item.income }}</span>
      </div>
      <div
        class="item"
        v-for="(item, index) in group1"
        :key="index + 1000"
        @click="everyMachine(item)"
      >
        <div>
          <span class="name">{{ item.group_name }}</span>
          <span class="num">{{ item.machine_list.length }}台</span>
        </div>
        <div>
          <span style="display:inline-block;">合计: {{ item.num }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 渠道商收入统计 -->
    <div class="list" v-show="list1.length != 0">
      <div class="title">下级-收入统计</div>
      <div
        class="item"
        v-for="(item, index) in list1"
        :key="index - 100"
        @click="everyGroup(item)"
      >
        <div>
          <span class="name">{{ item.org_name }}</span>
          <span class="num">{{ item.machine_list.length }}台</span>
        </div>
        <div>
          <span style="display:inline-block;">合计: {{ item.num }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  destroyed() {
    window.sessionStorage.removeItem("date");
  },
  mounted() {
    let date = window.sessionStorage.getItem("date");
    if (date == 1) {
      this.today();
    } else if (date == 2) {
      this.yestday();
    } else if (date == 3) {
      this.month();
    } else {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      this.data.end_time = today.getTime() / 1000 + 24 * 60 * 60 - 1;
      this.getlist();
    }
  },
  data() {
    return {
      rule_name: window.sessionStorage.getItem("rule_name"),
      one: true,
      two: false,
      three: false,
      four: false,
      start_time: new Date(),
      end_time: new Date(),
      data: {
        token: window.sessionStorage.getItem("token"),
        start_time: "",
        end_time: ""
      },
      list: [], //直营店
      group1: [], //直营分组
      list1: [], //下级
      num: "", // 直营设备计数
      count: "", // 收益总额
      onecount: 0, // 直营收益
      twocount: 0, // 下级收益
      time: "今日" // 收益动态时间
    };
  },
  methods: {
    // 时间搜索
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
      this.list1 = [];
      this.group1 = [];
      this.onecount = 0;
      this.twocount = 0;
      this.$http
        .post("/statistics/sell_statistics", this.$qs.stringify(this.data))
        .then(res => {
          res.data.level1.forEach(i => {
            this.onecount += i.income;
          });
          this.onecount=this.onecount.toFixed(2)-0
          if (res.data.level2 != undefined) {
            res.data.level2.forEach(r => {
              this.twocount += r.income;
            });
            this.twocount=this.twocount.toFixed(2)-0
          }
          //this.count = res.data.all_income;
          this.count = this.onecount + this.twocount;
          this.num = res.data.level1.length;
          if (res.data.level1_group != undefined) {
            if (res.data.level1_group.length != 0) {
              res.data.level1_group.forEach(i => {
                if (i.machine_ids != "") {
                  let a = i.machine_ids.split(",");
                  let obj = {
                    group_name: i.group_name,
                    machine_list: [],
                    num: 0
                  };
                  a.forEach(r => {
                    res.data.level1.forEach(item => {
                      if (r == item.machine_id) {
                        obj.machine_list.push(item);
                        res.data.level1.splice(
                          res.data.level1.indexOf(item),
                          1
                        );
                      }
                    });
                  });
                  obj.machine_list.forEach(b => {
                    obj.num += b.income;
                  });
                  this.group1.push(obj);
                }
              });
              this.list = res.data.level1;
            } else {
              this.list = res.data.level1;
            }
          } else {
            this.list = res.data.level1;
          }
          if (res.data.level2 != undefined) {
            if (res.data.level2.length != 0) {
              res.data.org_list.forEach(i => {
                let obj = {
                  org_name: "",
                  machine_list: [],
                  num: 0,
                  org_id: ""
                };
                res.data.level2.forEach(r => {
                  if (i.org_id == r.org_id) {
                    obj.org_id = i.org_id;
                    obj.org_name = i.org_name;
                    obj.machine_list.push(r);
                    this.list1.push(obj);
                  }
                });
                obj.machine_list.forEach(item => {
                  obj.num += item.income;
                });
              });
            }
          }
        });
    },
    // 直营分组明细
    everyMachine(item) {
      window.sessionStorage.setItem("group_name", item.group_name);
      window.sessionStorage.setItem("start_time", this.data.start_time);
      window.sessionStorage.setItem("end_time", this.data.end_time);
      this.$router.push("/market/machine");
    },
    // 下级代理明细
    everyGroup(item) {
      window.sessionStorage.setItem("org_id", item.org_id);
      window.sessionStorage.setItem("org_name", item.org_name);
      window.sessionStorage.setItem("start_time", this.data.start_time);
      window.sessionStorage.setItem("end_time", this.data.end_time);
      this.$router.push("/market/store");
    },
    // 头部快捷按钮搜索
    today() {
      this.time = "今日";
      this.one = true;
      this.two = false;
      this.three = false;
      this.four = false;
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      this.data.end_time = today.getTime() / 1000 + 24 * 60 * 60 - 1;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    },
    yestday() {
      this.time = "昨日";
      this.one = false;
      this.two = true;
      this.three = false;
      this.four = false;
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000 - 24 * 60 * 60;
      this.data.end_time = today.getTime() / 1000 - 1;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    },
    month() {
      this.time = "本月";
      this.one = false;
      this.two = false;
      this.three = true;
      this.four = false;
      let today = new Date();
      today.setDate(1);
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      let today1 = new Date();
      //today1.setHours(0, 0, 0, 0);
      this.data.end_time = Date.parse(today1) / 1000;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    },
    year() {
      this.time = "本年";
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = true;
      let today = new Date();
      today.setMonth(0);
      today.setDate(1);
      today.setHours(0, 0, 0, 0);
      this.data.start_time = today.getTime() / 1000;
      let today1 = new Date();
      this.data.end_time = Date.parse(today1) / 1000;
      this.start_time = this.data.start_time * 1000;
      this.end_time = this.data.end_time * 1000;
      this.getlist();
    }
  }
};
</script>
<style lang="less" scoped>
// 收益统计
.shouyi {
  width: 100%;
  color: #ffffff;
  margin-bottom: 0.2rem;
  background: url("../../assets/img/home.png") top left no-repeat;
  background-size: cover;
  .top {
    height: 2.48rem;
    text-align: center;
    padding-top: 0.5rem;
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
// 头部日期搜索
.head {
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
  .no {
    width: 16%;
    height: 0.46rem;
    text-align: center;
    line-height: 0.46rem;
    background-color: #ccc;
    font-size: 0.25rem;
    border-radius: 0.1rem;
  }
  .yes {
    width: 16%;
    height: 0.46rem;
    text-align: center;
    line-height: 0.46rem;
    background-color: #8598d5;
    font-size: 0.25rem;
    border-radius: 0.1rem;
    color: #fff;
  }
}
.date {
  padding: 0.2rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  font-size: 0.3rem;
}
// 直营店收入统计
.list {
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem auto;
  .title {
    border-bottom: 1px solid #a8b8e2;
    padding: 0.2rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
    .name {
      display: inline-block;
      width: 3rem;
    }
    .num {
      display: inline-block;
      width: 1.2rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      border: 1px solid #a8b8e2;
      border-radius: 0.2rem;
    }
  }
}
</style>
