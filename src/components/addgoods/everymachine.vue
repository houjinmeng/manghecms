<template>
  <div style="height:100%;">
    <div class="head" style="background:#fff">
      <router-link to="/addgoods/photos">
        <van-icon name="arrow-left" class="back" /> </router-link
      >{{machine_name}}
    </div>
    <div id="title">
      <div class="top">
        <div>
          仓位总数:
          <span>{{ confnum }}</span>
        </div>
        <div>
          现有库存:
          <span>{{ stocknum }}</span>
        </div>
      </div>
      <div class="bot">
        <div class="left">
          <span
            :class="[addall == true ? 'yes' : 'no']"
            @click="add_all"
            style="border-radius: 0.2rem 0 0 0.2rem;"
            >批量补货</span
          >
          <span
            :class="[delall == true ? 'yes' : 'no']"
            @click="del_all"
            style="border-radius: 0 0.2rem 0.2rem 0;border-left:none"
            >批量清货</span
          >
        </div>
        <div class="right" @click="addover">补货完成</div>
      </div>
    </div>
    <div class="botbtn1" v-show="addall" @click="okadd">确认补货</div>
    <div class="botbtn1" v-show="delall" @click="okclear">确认清货</div>
    <!-- 列表 -->
    <div style="height:76%;overflow:auto;margin-top:0.1rem">
      <div class="addgoods" v-for="(item, index) in list" :key="index">
        <div style="display:flex;justify-content: space-between;margin-bottom:0.2rem">
          <div>货道 : <span style="font-size:0.32rem">{{ item.location }}</span></div>
          <div style="margin-right:1.8rem">库存 : <span style="font-size:0.32rem">{{ item.number }}</span></div>
        </div>
        
        <div class="botbtn" style="margin:0">
          <div style="margin-top:0.1rem">商品 : {{ item.goods_name }}</div>
          <div style="display:flex">
            <div
              @click="delgoods(item)"
              class="btn"
              style="margin-right:0.2rem"
            >
              清货
            </div>
            <div @click="addgoods(item)" style="margin:0" class="btn">补货</div>
          </div>
        </div>
        <div
          :class="[item.selected == true ? 'yesdot' : 'nodot']"
          v-show="addall || delall"
          @click="selected(item)"
        ></div>
      </div>
    </div>
    <!-- <ul class="choose">
      <li v-for="(item, key) in list" :key="key">
        <div>{{ machine_name }}-{{ item.location }}</div>
        <div>商品: {{ item.goods_name }}</div>
        <div>库存: {{ item.number }}</div>
        <div class="botbtn" style="margin:0">
          <div @click="addgoods(item)" style="margin:0">补货</div>
          <div @click="delgoods(item)" style="margin:0">清货</div>
        </div>
        <div
          :class="[item.selected == true ? 'yesdot' : 'nodot']"
          v-show="addall || delall"
          @click="selected(item)"
        ></div>
      </li>
    </ul> -->
    <div style="height:0.8rem"></div>
    <!-- 补货弹窗 -->
    <van-dialog
      v-model="showadd"
      :title="machine_name"
      show-cancel-button
      :lazy-render="false"
      :before-close="close"
    >
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;margin-bottom:0.3rem"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >货道号</span
        >
        <el-input
          style="width:45%"
          size="small"
          disabled=""
          v-model="location"
        ></el-input>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem"
        v-show="rule_name != '品牌运营管理员'"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >出库仓库</span
        >
        <el-input
          style="width:45%"
          size="small"
          disabled=""
          v-model="stock"
        ></el-input>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;position: relative;"
        v-show="(rule_name = '品牌运营管理员')"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >出库仓库</span
        >
        <el-select
          v-model="data.stock_id"
          placeholder="请选择仓库"
          size="small"
          style="width:45%"
          @change="changestock(data.stock_id)"
          popper-class="select-option"
        >
          <el-option
            v-for="item in stocks"
            :key="item.stock_id - 100"
            :label="item.stock_name"
            :value="item.stock_id"
          ></el-option>
        </el-select>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;position: relative;"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >商品</span
        >
        <el-select
          v-model="data.goods_id"
          placeholder="请选择商品"
          size="small"
          style="width:45%"
          @change="change(data.goods_id)"
          popper-class="select-option"
        >
          <el-option
            v-for="item in Option"
            :key="item.goods_id"
            :label="item.goods_name"
            :value="item.goods_id"
          ></el-option>
        </el-select>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;margin-bottom:0.3rem;position: relative;"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >商品数量</span
        >
        <el-input
          style="width:45%"
          size="small"
          placeholder="请在此输入"
          type="number"
          v-model="data.number"
        ></el-input>
      </div>
    </van-dialog>
    <!-- 批量补货弹窗 -->
    <van-dialog
      v-model="showadds"
      :title="machine_name"
      show-cancel-button
      :lazy-render="false"
      :before-close="closes"
    >
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;margin-bottom:0.3rem"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >货道号</span
        >
        <el-input
          style="width:45%"
          size="small"
          disabled=""
          v-model="location"
        ></el-input>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem"
        v-show="rule_name != '品牌运营管理员'"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >出库仓库</span
        >
        <el-input
          style="width:45%"
          size="small"
          disabled=""
          v-model="stock"
        ></el-input>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;position: relative;"
        v-show="(rule_name = '品牌运营管理员')"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >出库仓库</span
        >
        <el-select
          v-model="data.stock_id"
          placeholder="请选择仓库"
          size="small"
          style="width:45%"
          @change="changestock(data.stock_id)"
          popper-class="select-option"
        >
          <el-option
            v-for="item in stocks"
            :key="item.stock_id - 100"
            :label="item.stock_name"
            :value="item.stock_id"
          ></el-option>
        </el-select>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;position: relative;"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >商品</span
        >
        <el-select
          v-model="data.goods_id"
          placeholder="请选择商品"
          size="small"
          style="width:45%"
          @change="change(data.goods_id)"
          popper-class="select-option"
        >
          <el-option
            v-for="item in Option"
            :key="item.goods_id"
            :label="item.goods_name"
            :value="item.goods_id"
          ></el-option>
        </el-select>
      </div>
      <div
        style="text-align:center;margin-top:0.2rem;font-size:0.3rem;margin-bottom:0.3rem;position: relative;"
      >
        <span style="display:inline-block;width:1.5rem;text-align:left"
          >商品数量</span
        >
        <el-input
          style="width:45%"
          size="small"
          placeholder="请在此输入"
          type="number"
          v-model="data.number"
        ></el-input>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
    if (
      this.rule_name == "品牌运营管理员" ||
      this.rule_name == "代理运营管理员"
    ) {
      this.getstock();
    } else {
      this.getlist2();
    }
  },
  data() {
    return {
      confnum: "", //仓位数
      stocknum: 0, //库存数
      machine_name: window.sessionStorage.getItem("machine_name"),
      showadd: false,
      showadds: false,
      data: {
        token: window.sessionStorage.getItem("token"),
        machine_id: window.sessionStorage.getItem("machine_id"),
        goods_id: "",
        number: "",
        conf_id: "",
        detail_id: window.sessionStorage.getItem("detail_id"),
        stock_id: ""
      },
      rule_name: window.sessionStorage.getItem("rule_name"),
      // 补货完成点击跳过参数
      data1: {
        token: window.sessionStorage.getItem("token"),
        machine_id: window.sessionStorage.getItem("machine_id"),
        img: [],
        detail_id: window.sessionStorage.getItem("detail_id")
      },
      addall: false,
      delall: false,
      list: [],
      Option: [],
      stocks: [],
      location: "",
      stock: "个人仓库",
      num: "", // 所选商品库存
      locations: [], // 货道集合
      conf_ids: [],
      goods_name: [], // 选择的商品名称集合
      itemnum: "" // 单个货道的库存
    };
  },
  methods: {
    // 补货完成
    addover() {
      this.$dialog
        .confirm({
          message: "补货完成是否拍照记录",
          cancelButtonText: "跳过",
          confirmButtonText: "拍照"
        })
        .then(() => {
          this.$router.push("/afterphotos");
        })
        .catch(() => {
          let formData = new FormData();
          formData.append("token", this.data.token);
          formData.append("machine_id", this.data.machine_id);
          formData.append("detail_id", this.data.detail_id);
          this.$http({
            method: "post", // 指定请求方式
            url: "/delivery/step_four", // 请求接口
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;"
            },
            data: formData
          })
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("补货完成");
                this.$router.push("/home");
              } else {
                this.$toast.fail("上传失败");
              }
            })
            .catch(err => {
              this.$toast.fail("系统异常");
              reject(err);
            });
        });
    },
    // 选择多个货道
    selected(item) {
      if (item.selected == false) {
        item.selected = true;
        this.locations.push(item.location);
        this.conf_ids.push(item.conf_id);
        let obj = { goods_id: item.goods_id, num: item.number };
        this.goods_name.push(obj);
      } else {
        item.selected = false;
        this.locations.splice(this.locations.indexOf(item.location), 1);
        this.conf_ids.splice(this.conf_ids.indexOf(item.conf_id), 1);
        this.goods_name.forEach(i => {
          if (i.goods_id == item.goods_id)
            this.goods_name.splice(this.goods_name.indexOf(i), 1);
        });
      }
    },
    // 选择商品
    change(id) {
      if (this.goods_name.length == 0) {
        this.Option.forEach(res => {
          if (res.goods_id == id) {
            this.num = res.number;
          }
        });
      } else {
        if (
          this.goods_name[0].goods_id != id &&
          this.goods_name[0].goods_id != null &&
          this.goods_name[0].num != 0
        ) {
          this.$toast.fail("请选择货道原有商品");
        } else {
          this.Option.forEach(res => {
            if (res.goods_id == id) {
              this.num = res.number;
            }
          });
        }
      }
    },
    // 选择仓库
    changestock(id) {
      this.getlist3();
    },
    // 列表
    getlist() {
      this.stocknum = 0;
      this.$http
        .post("/delivery/step_two", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            i.selected = false;
            this.stocknum = this.stocknum + i.number;
          });
          this.list = res.data;
          this.confnum = this.list.length;
        });
    },
    // 仓库列表
    getstock() {
      this.$http
        .post("/stock/stock_list", this.$qs.stringify(this.data))
        .then(res => {
          this.stocks = res.data;
          if (this.stocks.length == 1) {
            this.data.stock_id = this.stocks[0].stock_id - 0;
          }
          this.getlist3();
        });
    },
    // 商品列表
    getlist2() {
      this.$http
        .post("/delivery/select_list", this.$qs.stringify(this.data))
        .then(res => {
          this.data.stock_id = res.data.stock_id;
          let arry = Object.values(res.data);
          arry.pop();
          this.Option = arry;
        });
    },
    getlist3() {
      this.$http
        .post("/delivery/select_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(i => {
            if (i.stock_id == this.data.stock_id) {
              this.Option = i.goods_list;
            }
          });
        });
    },
    // 批量补货
    add_all() {
      this.goods_name = [];
      this.locations = [];
      this.conf_ids = [];
      this.showdot = !this.showdot;
      this.addall = !this.addall;
      this.delall = false;
    },
    // 确认批量补货
    okadd() {
      this.data.number = "";
      this.data.goods_id = "";
      for (var i = 0; i < this.goods_name.length; i++) {
        if (
          this.goods_name[i].goods_id == null ||
          this.goods_name[i].num == 0
        ) {
          this.goods_name.splice(i--, 1);
        }
      }
      if (this.goods_name.length > 1) {
        for (var n = 1; n < this.goods_name.length; n++) {
          if (this.goods_name[0].goods_id != this.goods_name[n].goods_id) {
            this.$toast.fail("请选择同种商品");
            return false;
          }
        }
      }
      this.location = this.locations.join(",");
      this.data.conf_id = this.conf_ids.join(",");
      this.showadds = true;
    },
    // 批量清货
    del_all() {
      this.locations = [];
      this.conf_ids = [];
      this.showdot = !this.showdot;
      this.delall = !this.delall;
      this.addall = false;
    },
    // 确认批量清货
    okclear() {
      this.$dialog
        .confirm({
          message: "确定清货吗"
        })
        .then(() => {
          this.data.conf_id = this.conf_ids.join(",");
          this.$http
            .post("/delivery/clear", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.getlist();
                this.delall = false;
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {});
    },
    // 单个补货
    addgoods(item) {
      // if(item.number!=0){
      //   this.data.goods_id=item.goods_id-0
      // }
      this.itemnum = item.number;
      this.locations = [];
      this.goods_name = [];
      let obj = { goods_id: item.goods_id, num: item.number };
      this.goods_name.push(obj);
      this.data.goods_id = "";
      this.data.number = "";
      this.locations.push(item.location);
      this.location = this.locations.join(",");
      this.data.conf_id = item.conf_id;
      this.showadd = true;
    },
    // 单个补货确认
    close(action, done) {
      if (action == "confirm") {
        if (this.data.goods_id == "") {
          this.$toast.fail("请选择商品");
          done(false);
          return false;
        } else if (
          this.data.goods_id != this.goods_name[0].goods_id &&
          this.goods_name[0].num != 0
        ) {
          this.$toast.fail("请选择货道原有商品");
          done(false);
          return false;
        } else if (this.data.number == "") {
          this.$toast.fail("请输入数量");
          done(false);
          return false;
        } else if (
          this.num - 0 <
          (this.data.number - 0) * this.locations.length
        ) {
          this.$toast.fail("此商品最大库存为" + this.num);
          done(false);
          return false;
        } else {
          this.$http
            .post("/delivery/step_three", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("补货成功");
                this.getlist();
                if (
                  this.rule_name == "品牌运营管理员" ||
                  this.rule_name == "代理运营管理员"
                ) {
                  this.getlist3();
                } else {
                  this.getlist2();
                }
                this.addall = false;
                done();
              } else {
                this.$toast.fail(res.data.msg);
                done(false);
              }
            });
        }
      } else {
        done();
      }
    },
    // 多个补货确认
    closes(action, done) {
      if (action == "confirm") {
        if (this.data.goods_id == "") {
          this.$toast.fail("请选择商品");
          done(false);
          return false;
        } else if (this.data.number == "") {
          this.$toast.fail("请输入数量");
          done(false);
          return false;
        } else if (
          this.num - 0 <
          (this.data.number - 0) * this.locations.length
        ) {
          this.$toast.fail("此商品最大库存为" + this.num);
          done(false);
          return false;
        } else if (this.goods_name.length != 0) {
          if (this.data.goods_id != this.goods_name[0].goods_id) {
            this.$toast.fail("请选择货道原有商品");
            done(false);
            return false;
          } else {
            this.$http
              .post("/delivery/step_three_s", this.$qs.stringify(this.data))
              .then(res => {
                if (res.data.code == 1) {
                  this.$toast.success("补货成功");
                  this.getlist();
                  this.getlist2();
                  this.addall = false;
                  done();
                } else {
                  this.$toast.fail(res.data.msg);
                  done(false);
                }
              });
          }
        } else {
          this.$http
            .post("/delivery/step_three_s", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("补货成功");
                this.getlist();
                this.getlist2();
                this.addall = false;
                done();
              } else {
                this.$toast.fail(res.data.msg);
                done(false);
              }
            });
        }
      } else {
        done();
      }
    },
    // 清货
    delgoods(item) {
      this.$dialog
        .confirm({
          message: "确定清货吗"
        })
        .then(() => {
          this.data.conf_id = item.conf_id;
          this.$http
            .post("/delivery/clear", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("清货成功");
                this.getlist();
              } else {
                this.$toast.fail("清货失败");
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
.yesdot {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #8698d5;
  border-radius: 25%;
  border: 1px solid #8698d5;
  position: absolute;
  top: 0.1rem;
  right: 0.2rem;
}
.nodot {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #f2f2f2;
  border-radius: 25%;
  border: 1px solid #8698d5;
  position: absolute;
  top: 0.1rem;
  right: 0.2rem;
}
.addgoods {
  background-color: #fff;
  font-size: 0.28rem;
  padding: 0.1rem;
  width: 95%;
  margin: 0 auto 0.1rem;
  border-radius: 0.2rem;
  border: 1px solid #8698d5;
  position: relative;
  box-sizing: border-box;
  .botbtn {
    display: flex;
    justify-content: space-between;
    .btn {
      padding: 0.1rem;
      border: 1px solid #8698d5;
      border-radius: 0.2rem;
      color: #8698d5;
      padding: 0.1rem 0.4rem;
      text-align: center;
    }
  }
}
.choose {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0.2rem;
  overflow: hidden;
  box-sizing: border-box;
}
.choose li:nth-child(even) {
  margin-left: 4%;
}
.choose li {
  float: left;
  width: 48%;
  //height: 2rem;
  border: 1px solid #8698d5;
  margin-bottom: 0.2rem;
  border-radius: 0.2rem;
  padding: 0.1rem;
  font-size: 0.25rem;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  div {
    margin-bottom: 0.05rem;
  }
  .botbtn {
    display: flex;
    justify-content: space-between;
    div {
      padding: 0.1rem;
      border: 1px solid #8698d5;
      border-radius: 0.2rem;
      color: #8698d5;
      width: 0.8rem;
      text-align: center;
    }
  }
}
#title {
  background-color: #fff;
  .top {
    border-bottom: 1px solid #f2f2f2;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      font-size: 0.3rem;
    }
    span {
      font-size: 0.4rem;
      color: #8698d5;
      margin-left: 0.1rem;
    }
  }
  .bot {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;
    position: relative;
  }
  .right {
    padding: 0.1rem;
    background-color: #8698d5;
    color: #fff;
    border-radius: 0.2rem;
  }
  .left {
    display: flex;
    span {
      display: inline-block;
      border: 1px solid #8698d5;
    }
    .yes {
      display: inline-block;
      padding: 0.1rem;
      background-color: #8698d5;
      color: #fff;
    }
    .no {
      display: inline-block;
      padding: 0.1rem;
    }
  }
}
.botbtn1 {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
  background-color: #8698d5;
  margin: 0;
  font-size: 0.4rem;
  z-index: 2;
}
</style>
