<template>
  <div class="txt">
    <div class="head">
      <router-link to="/user">
        <van-icon name="arrow-left" class="back" />
      </router-link>用户信息
    </div>
    <van-cell-group>
      <van-field
        v-model="data.username"
        label="账号"
        placeholder="请输入手机号"
        :error-message="phone"
        @blur="phonetest(data.username)"
        type="number"
        oninput="if(value.length>11)value=value.slice(0,11)"
      />
      <van-field
        v-model="data.password"
        label="密码"
        placeholder="请输入密码"
        :error-message="pass"
        @blur="passtest(data.password)"
      />
      <van-field
        v-model="data.nickname"
        label="使用人姓名"
        placeholder="请输入"
        :error-message="name"
        @blur="nametest(data.nickname)"
      />
    </van-cell-group>
    <div class="select" style="position: relative;">
      <span style="margin-right:1.3rem">角色</span>
      <el-select
        v-model="data.rule_id"
        placeholder="请选择职位"
        size="small"
        style="width:41%"
        @change="change(data.rule_id)"
      >
        <el-option
          v-for="item in ruleOption"
          :key="item.rule_id"
          :label="item.rule_name"
          :value="item.rule_id"
        ></el-option>
      </el-select>
      <transition name="el-zoom-in-top">
        <div
          v-show="rule"
          style="color:red;;font-size:0.25rem;line-height:0;position: absolute;bottom:-0.12rem;left:2.2rem"
        >请选择角色</div>
      </transition>
    </div>
    <!-- 库管 -->
    <div class="select" v-show="data.rule_id==8">
      <span style="margin-right:1.3rem">归属</span>
      <el-select v-model="data.stock_ids" placeholder="请选择仓库" size="small" style="width:41%">
        <el-option
          v-for="item in Option"
          :key="item.id"
          :label="item.stock_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <!-- 设备管理员补货人员 -->
    <div class="select" v-show="data.rule_id==7||data.rule_id==10">
      <span style="margin-right:1.3rem">归属</span>
      <!-- <input type="text" style="padding:0.15rem 0;border:none;background:#f2f2f2;width:70%" v-model="a" disabled @click="showmachine=true"> -->
      <div
        style="padding:0.15rem 0;border:none;background:#f2f2f2;width:70%;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;"
        @click="showmachine=true"
      >{{a}}</div>
    </div>
    <!-- 运营财务监督 -->
    <!-- <div class="select" v-show="data.rule_id==3||data.rule_id==11||data.rule_id==9">
      <span style="margin-right:1.3rem">归属</span>
      <div
        style="padding:0.15rem 0;border:none;background:#f2f2f2;width:70%;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;"
      >{{a}}</div>
    </div>-->
    <div @click="ok" class="btn">保存用户</div>
    <!-- 指定设备 -->
    <van-popup v-model="showmachine" position="bottom" :style="{ height: '75%' }">
      <div style="background:#f2f2f2;padding:0.2rem;height:100%" id="edit">
        <div style="padding:0 0.2rem;font-size:0.35rem;font-weight:800;text-align:center">指定设备</div>
        <van-search placeholder="请输入设备名称" show-action>
          <div slot="action" class="search">搜索</div>
        </van-search>
        <div class="card">
          <div class="item" v-for="(item,index) in Option" :key="index" @click="choose(item)">
            <div class="name">{{item.machine_name}}</div>
            <div :class="[ item.selected==true ? 'yes' : 'no' ]"></div>
          </div>
        </div>
        <div class="btn" style="margin-top:0.5rem" @click="baocun">保 存</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getjuese();
  },
  data() {
    return {
      a: "请指定设备",
      machine_id: [],
      machine_name: [],
      showmachine: false,
      phone: "",
      pass: "",
      name: "",
      rule: false,
      data: {
        token: window.sessionStorage.getItem("token"),
        username: "",
        password: "",
        nickname: "",
        machine_ids: "",
        stock_ids: "",
        rule_id: ""
      },
      ruleOption: [],
      Option: []
    };
  },
  methods: {
    // 指定设备保存
    baocun() {
      this.data.machine_ids = this.machine_id.join(",");
      this.a = this.machine_name.join(",");
      this.showmachine = false;
    },
    // 指定设备
    choose(item) {
      if (item.selected == false) {
        item.selected = true;
        this.machine_id.push(item.machine_id);
        this.machine_name.push(item.machine_name);
      } else {
        item.selected = false;
        this.machine_id.splice(this.machine_id.indexOf(item.machine_id), 1);
        this.machine_name.splice(
          this.machine_name.indexOf(item.machine_name),
          1
        );
      }
    },
    // 手机号验证格式
    phonetest(value) {
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value == "") {
        this.phone = "";
      } else if (!reg.test(value)) {
        this.phone = "请输入正确的手机号";
        return false;
      } else {
        this.phone = "";
      }
      return true;
    },
    passtest(v) {
      if (v != "") {
        this.pass = "";
      }
    },
    nametest(v) {
      if (v != "") {
        this.name = "";
      }
    },
    // 保存用户
    ok() {
      if (this.data.username == "") {
        this.phone = "请输入正确的手机号";
        return false;
      } else if (this.data.password == "") {
        this.pass = "请输入密码";
        return false;
      } else if (this.data.nickname == "") {
        this.name = "请输入姓名";
        return false;
      } else if (this.data.rule_id == "") {
        this.rule = true;
        return false;
      }
      this.$http
        .post("/client/client_add", this.$qs.stringify(this.data))
        .then(res => {
          if(res.data.code==1){
            this.$toast.success('保存成功')
            this.$router.push('/user')
          }else{
            this.$toast.fail(res.data.msg)
          }
        });
    },
    // 角色列表
    getjuese() {
      this.$http
        .post("/client/rule_list", this.$qs.stringify(this.data))
        .then(res => {
          this.ruleOption = res.data;
        });
    },
    change(id) {
      if (id == "") {
        this.rule = true;
      } else {
        this.rule = false;
      }
      this.getaddress();
    },
    // 作用域
    getaddress() {
      this.$http
        .post("/client/client_domain", this.$qs.stringify(this.data))
        .then(res => {
          if (typeof res.data == 'object') {
            res.data.forEach(i => {
              i.selected = false;
            });
            this.Option = res.data;
          }
        });
    }
  }
};
</script>
<style scoped>
.yes {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #88f183;
  border-radius: 50%;
}
.no {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #f2f2f2;
  border-radius: 50%;
}
.card {
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.2rem;
  height: 70%;
  overflow: auto;
}
.card .item {
  padding: 0.2rem;
  font-size: 0.3rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
}
.search {
  width: 1.2rem;
  height: 0.6rem;
  text-align: center;
  line-height: 0.6rem;
  color: #8598d5;
  border-radius: 0.1rem;
  font-size: 0.3rem;
}
.van-search__content {
  background-color: #fff !important;
}
.van-search {
  background-color: #f0f2f5 !important;
}
.select {
  padding: 0.1rem 0.3rem;
  display: flex;
  align-items: center;
  font-size: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
.select >>> .el-select input {
  border: none !important;
  background-color: #f2f2f2;
}
.btn {
  width: 5rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
  font-size: 0.35rem;
  margin: 0 auto;
  color: #fff;
  margin-top: 2rem;
}
</style>