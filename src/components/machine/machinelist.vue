<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" /> </router-link
      >设备列表
    </div>
    <van-search
      v-model="data.where"
      placeholder="请输入设备名称、地址"
      show-action
      shape="round"
      style="height:7%"
    >
      <div
        slot="action"
        @click="getlist"
        style="color:#8598d5;font-size:0.35rem"
      >
        搜索
      </div>
    </van-search>
    <div class="status">
      <!-- <div class="title">设备状态</div> -->
      <div class="btn" style="margin:0">
        <div :class="[this.all == true ? 'yes' : 'one']" @click="getlist">
          全部{{ allnum }}
        </div>
        <div :class="[this.out == true ? 'yes' : 'one']" @click="getout">
          离线{{ outnum }}
        </div>
        <div :class="[this.on == true ? 'yes' : 'one']" @click="geton">
          在线{{ onnum }}
        </div>
        <!-- <div class="one">自营166</div> -->
      </div>
    </div>
    <!-- 设备列表 -->
    <div style="padding:0 0.2rem">
      <!-- 自营 -->
      <div class="list1" v-show="ziying">
        <div class="title">
          <h3 style="font-size:0.3rem">自营</h3>
          <span style="font-size:0.3rem">{{ ziyingnum }}台</span>
        </div>
        <div
          class="item"
          @click="
            (rule_name == '品牌运营管理员' || rule_name == '代理运营管理员') &&
              setmachine(item)
          "
          v-for="(item, index) in list"
          :key="index"
        >
          <div style="display:flex;align-items:center;">
            <span style="display:inline-block;width:3.6rem"
              >{{ item.machine_name }} ></span
            >
            <span
              :class="[item.is_online == '在线' ? 'online' : 'outline']"
            ></span>
            {{ item.is_online }}
          </div>
          <div style="display:flex;align-items:center;">
            <van-icon
              name="warning"
              size="1.4em"
              color="red"
              style="margin-right:0.1rem"
              v-show="item.status != '正常'"
            />
            <span>{{ item.status }}</span>
          </div>
        </div>
      </div>
      <!-- 组织 -->
      <div class="list1" v-for="(item, index) in zuzhi" :key="index">
        <div class="title">
          <h3 style="font-size:0.3rem">{{ title[index] }}</h3>
          <span style="font-size:0.3rem">{{ item.length }}台</span>
        </div>
        <div class="item" v-for="(item, index) in item" :key="index + 100">
          <div style="display:flex;align-items:center;">
            <span style="display:inline-block;width:3.6rem">{{
              item.machine_name
            }}</span>
            <span
              :class="[item.is_online == '在线' ? 'online' : 'outline']"
            ></span>
            {{ item.is_online }}
          </div>
          <div style="display:flex;align-items:center;">
            <van-icon
              name="warning"
              size="1.4em"
              color="red"
              style="margin-right:0.1rem"
              v-show="item.status != '正常'"
            />
            <span>{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 设备编辑弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="dialog">
        <div class="title">
          <div class="top">
            <span class="left">{{ machine_name }}</span>
            <span style="color:red">{{ status }}</span>
          </div>
          <div style="font-size:0.28rem;text-align:left">
            地址:{{ address }}
          </div>
        </div>
        <div style="padding:0 0.2rem;background-color: #f0f2f5">
          <div class="menu">
            <router-link to="/machineEdit">
              <div class="item">
                <span>设备编辑</span>
                <van-icon name="arrow" />
              </div>
            </router-link>
            <router-link to="/huodao">
              <div class="item">
                <span>货道设置</span>
                <van-icon name="arrow" />
              </div>
            </router-link>
            <router-link to="/outgoods">
              <div class="item">
                <span>设备出货</span>
                <van-icon name="arrow" />
              </div>
            </router-link>
            <div class="item" @click="remove">
              <span>解绑设备</span>
              <van-icon name="arrow" />
            </div>
            <router-link to="/Positions">
              <div class="item" v-show="rule_name == '品牌运营管理员'">
                <span>分配设备</span>
                <van-icon name="arrow" />
              </div>
            </router-link>
            <div class="item" @click="editdialog = true">
              <span>修改设备状态</span>
              <van-icon name="arrow" />
            </div>
            <div class="item" @click="reset">
              <span>重启设备</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div style="background-color: #f0f2f5;height:0.2rem"></div>
        <div style="padding:0 0.2rem;background-color: #f0f2f5">
          <div
            style="text-align:center;padding:0.2rem;background:#fff;border-radius: 0.2rem;font-size:0.3rem"
            @click="show = false"
          >
            取消
          </div>
        </div>
        <div style="background-color: #f0f2f5;height:0.2rem"></div>
      </div>
    </van-popup>
    <!-- 修改设备状态 -->
    <van-dialog
      v-model="editdialog"
      title="修改设备状态"
      show-cancel-button
      @confirm="editStatus"
      style="text-align:center;"
    >
      <el-select
        v-model="status1"
        placeholder="请选择"
        style="margin:0.3rem;z-index:10000"
        size="small"
        popper-class="select-option"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nofenpei: false,
      fenpeinum: "",
      fenpeilist: [],
      machine_name: "",
      address: "",
      rule_name: window.sessionStorage.getItem("rule_name"),
      // 顶部状态快速搜索按钮
      all: true,
      on: false,
      out: false,
      // 数量统计
      allnum: 0,
      onnum: 0,
      outnum: 0,

      ziying: false,
      data: {
        token: window.sessionStorage.getItem("token"),
        where: ""
      },
      list: [],
      zuzhi: [],
      title: [],
      status: "",
      status1: "",
      show: false,
      editdialog: false,
      options: [
        { value: 0, label: "正常" },
        { value: 1, label: "故障" }
      ],
      ziyingnum: "",
      ziyingon: "",
      zuzhion: []
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    // 设置列表
    setmachine(item) {
      window.sessionStorage.setItem("machineid", item.machine_id);
      this.address = item.address;
      this.machine_name = item.machine_name;
      this.status = item.is_online;
      if (item.status == "正常") {
        this.status1 = 0;
      } else {
        this.status1 = 1;
      }
      this.show = true;
    },
    // 获取设备列表
    getlist() {
      this.list = [];
      this.zuzhi = [];
      this.all = true;
      this.out = false;
      this.on = false;
      this.allnum = 0;
      this.$http
        .post("/machine/machine_list", this.$qs.stringify(this.data))
        .then(res => {
          this.title = Object.keys(res.data);
          this.zuzhi = Object.values(res.data);
          Object.values(res.data).forEach(i => {
            this.allnum += i.length;
          });
          let online = [];
          Object.values(res.data).forEach(i => {
            i.forEach(r => {
              if (r.is_online == "在线") {
                online.push(r);
              }
            });
          });
          this.onnum = online.length;
          this.outnum = this.allnum - this.onnum;
          this.title.forEach(item => {
            if (item == "自营") {
              this.ziying = true;
              this.list = res.data.自营;
              this.ziyingnum = this.list.length;
              let a = [];
              this.list.forEach(item => {
                if (item.is_online == "在线") {
                  a.push(item);
                }
              });
              this.ziyingon = a.length;
              this.title.splice(this.title.indexOf(item), 1);
              this.zuzhi.splice(this.title.indexOf(item), 1);
              this.zuzhi.forEach(item => {
                let b = [];
                item.forEach(item1 => {
                  if (item1.is_online == "在线") {
                    b.push(item);
                  }
                });
                this.zuzhion.push(b.length);
              });
            }
          });
        })
        .catch(err => {
          this.$toast('登录超时,请重新登录')
          this.$router.push('/')
        });
    },
    // 在线设备列表
    geton() {
      this.all = false;
      this.out = false;
      this.on = true;
      this.zuzhi = [];
      this.list = [];
      this.$http
        .post("/machine/machine_list", this.$qs.stringify(this.data))
        .then(res => {
          this.title = Object.keys(res.data);
          let arry = [];
          arry = arry.concat(Object.values(res.data));
          for (let i = 0; i < arry.length; i++) {
            for (let r = arry[i].length - 1; r >= 0; r--) {
              if (arry[i][r].is_online == "离线") {
                arry[i].splice(r, 1);
              }
            }
          }
          this.zuzhi = this.zuzhi.concat(arry);
          this.title.forEach(item => {
            if (item == "自营") {
              this.ziying = true;
              res.data.自营.forEach(i => {
                if (i.is_online == "在线") {
                  this.list.push(i);
                }
              });
              this.ziyingnum = this.list.length;
              let a = [];
              this.list.forEach(item => {
                if (item.is_online == "在线") {
                  a.push(item);
                }
              });
              this.ziyingon = a.length;
              this.title.splice(this.title.indexOf(item), 1);
              this.zuzhi.splice(this.title.indexOf(item), 1);
              this.zuzhi.forEach(item => {
                let b = [];
                item.forEach(item1 => {
                  if (item1.is_online == "在线") {
                    b.push(item);
                  }
                });
                this.zuzhion.push(b.length);
              });
            }
          });
        });
    },
    // 离线设备列表
    getout() {
      this.zuzhi = [];
      this.list = [];
      this.all = false;
      this.on = false;
      this.out = true;
      this.$http
        .post("/machine/machine_list", this.$qs.stringify(this.data))
        .then(res => {
          this.title = Object.keys(res.data);
          let arry = [];
          arry = arry.concat(Object.values(res.data));
          for (let i = 0; i < arry.length; i++) {
            for (let r = arry[i].length - 1; r >= 0; r--) {
              if (arry[i][r].is_online == "在线") {
                arry[i].splice(r, 1);
              }
            }
          }
          this.zuzhi = this.zuzhi.concat(arry);
          this.title.forEach(item => {
            if (item == "自营") {
              this.ziying = true;
              res.data.自营.forEach(i => {
                if (i.is_online == "离线") {
                  this.list.push(i);
                }
              });
              this.ziyingnum = this.list.length;
              let a = [];
              this.list.forEach(item => {
                if (item.is_online == "在线") {
                  a.push(item);
                }
              });
              this.ziyingon = a.length;
              this.title.splice(this.title.indexOf(item), 1);
              this.zuzhi.splice(this.title.indexOf(item), 1);
              this.zuzhi.forEach(item => {
                let b = [];
                item.forEach(item1 => {
                  if (item1.is_online == "在线") {
                    b.push(item);
                  }
                });
                this.zuzhion.push(b.length);
              });
            }
          });
        });
    },
    // 解绑设备
    remove() {
      this.$dialog
        .confirm({
          title: "是否解绑设备",
          message: "解绑设备后,此台设备将从该组织里删除"
        })
        .then(() => {
          let data = {
            token: this.data.token,
            machine_id: window.sessionStorage.getItem("machineid")
          };
          this.$http
            .post("/machine/machine_delete", this.$qs.stringify(data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("解绑成功");
                this.show = false;
                this.getlist();
              } else {
                this.$toast.fail("解绑失败");
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 重启设备
    reset() {
      this.$dialog
        .confirm({
          title: "是否重启设备",
          message: "重启过程大约需要30~60秒"
        })
        .then(() => {
          let data = {
            token: this.data.token,
            machine_id: window.sessionStorage.getItem("machineid")
          };
          this.$http
            .post("/machine/machine_restart", this.$qs.stringify(data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
                console.log(res.data);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 修改设备状态
    editStatus() {
      let data = {
        token: this.data.token,
        machine_id: window.sessionStorage.getItem("machineid"),
        status: this.status1
      };
      this.$http
        .post("/machine/machine_status", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 1) {
            this.show = false;
            this.$toast.success("修改成功");
            this.getlist();
          } else {
            this.$toast.fail("修改失败");
          }
        });
    }
  }
};
</script>
<style>
.van-search__content {
  border-radius: 0.1rem !important;
  border: 1px solid #cccccc;
}
.select-option {
  z-index: 2100 !important;
}
</style>
<style lang="less" scoped>
.online {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  background-color: #86f2b2;
  margin-right: 0.1rem;
}
.outline {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 0.1rem;
}
.status {
  background-color: #fff;
  margin-top: 0.1rem;
  padding: 0 0.2rem;
  margin-bottom: 0.1rem;
  .title {
    padding: 0.2rem;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
    font-size: 0.36rem;
  }
  .btn {
    display: flex;
    padding: 0.2rem 0;
    justify-content: space-around;
    .one {
      width: 30%;
      color: #8399d3;
      border: 1px solid #ccc;
      text-align: center;
      font-size: 0.3rem;
      padding: 0.1rem 0;
      border-radius: 0.1rem;
    }
    .yes {
      width: 30%;
      color: #ffffff;
      text-align: center;
      font-size: 0.3rem;
      padding: 0.1rem 0;
      border-radius: 0.1rem;
      background-color: #8399d3;
    }
  }
}
// 设备列表
.list1 {
  background-color: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #a8b8e2;
    padding: 0.2rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.2rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #ccc;
  }
  .item:last-child {
    border: none;
  }
}
// 设备弹出菜单
.dialog {
  .title {
    background-color: #f0f2f5;
    padding: 0.2rem 0.4rem;
    .top {
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      margin-bottom: 0.05rem;
      font-weight: 800;
    }
  }
  .menu {
    background-color: #fff;
    border-radius: 0.2rem;
    .item {
      padding: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      font-size: 0.3rem;
    }
  }
}
</style>
