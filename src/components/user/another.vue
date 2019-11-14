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
        input-align="right"
        disabled
      />
      <van-field
        v-model="data.password"
        label="密码"
        placeholder="请输入密码"
        input-align="right"
        disabled
      />
      <van-field
        v-model="data.nickname"
        label="使用人姓名"
        placeholder="请输入"
        input-align="right"
        disabled
      />
    </van-cell-group>
    <div class="select">
      <span>角色</span>
      <el-select
        v-model="data.rule_id"
        placeholder="请选择职位"
        size="small"
        style="width:41%"
        @change="changerule"
      >
        <el-option
          v-for="item in ruleOption"
          :key="item.rule_id"
          :label="item.rule_name"
          :value="item.rule_id"
        ></el-option>
      </el-select>
    </div>
    <!-- 库管 -->
    <div class="select" v-show="data.rule_id==8">
      <span style="margin-right:1.3rem">归属</span>
      <el-select v-model="data.stock_ids" placeholder="请选择仓库" size="small" style="width:41%">
        <el-option v-for="item in Option" :key="item.id" :label="item.stock_name" :value="item.id"></el-option>
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
    <div style="display:flex">
      <div @click="del" class="btn">删除用户</div>
      <div @click="ok" class="btn">保存用户</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
    this.getrule_list();
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
        user_id: window.sessionStorage.getItem("user_id"),
        machine_ids: "",
        stock_ids: "",
        rule_id: ""
      },
      ruleOption: [],
      Option: []
    }
  },
  methods: {
    changerule() {
      this.getaddress();
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
    // 指定设备保存
    baocun() {
      this.data.machine_ids = this.machine_id.join(",");
      this.a = this.machine_name.join(",");
      this.showmachine = false;
      if (this.a == "") {
        this.a = "请指定设备";
      }
    },
    // 获取用户信息
    getlist() {
      this.$http
        .post("/client/client_edit_list", this.$qs.stringify(this.data))
        .then(res => {
          Object.assign(this.data, res.data);
          let a = Object.keys(res.data.rule);
          this.data.rule_id = a[0] - 0;
          this.getaddress(res.data.domain);
          this.data.stock_ids=res.data.domain[0].stock_id
        });
    },
    // 删除用户
    del() {},
    // 保存
    ok() {
      this.$http
        .post("/client/client_edit_save", this.$qs.stringify(this.data))
        .then(res => {
          if(res.data.code==1){
            this.$toast.success('保存成功')
            this.$router.push('/user')
          }else{
            this.$toast.fail('保存失败')
          }
        });
    },
    // 获取角色列表
    getrule_list() {
      this.$http
        .post("/client/rule_list", this.$qs.stringify(this.data))
        .then(res => {
          this.ruleOption = res.data;
        });
    },
    // 作用域
    getaddress(v) {
      this.$http
        .post("/client/client_domain", this.$qs.stringify(this.data))
        .then(res => {
          if (typeof res.data == "object") {
            res.data.forEach(i => {
              i.selected = false;
            });
            this.Option = res.data;
            v.forEach(a => {
              this.Option.forEach(b => {
                if (a.machine_id == b.machine_id) {
                  b.selected = true;
                  this.machine_id.push(b.machine_id);
                  this.machine_name.push(b.machine_name);
                }
              });
            });
            this.data.machine_ids = this.machine_id.join(",");
            this.a = this.machine_name.join(",");
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
  justify-content: space-between;
  align-items: center;
  font-size: 0.25rem;
  border-bottom: 1px solid #f2f2f2;
}
.select >>> .el-select input {
  border: none !important;
  background-color: #f2f2f2;
}
.btn {
  width: 3rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
  font-size: 0.35rem;
  margin: 0.4rem auto;
  color: #fff;
  margin-top: 3rem;
}
</style>