<template>
  <div>
    <div class="head" style="background:#fff">
      <van-icon name="arrow-left" class="back" @click="$router.back(1)" />
      编辑组织
    </div>
    <div style="padding:0 0.1rem">
      <div class="list">
        <div class="title">组织信息</div>
        <van-cell-group>
          <van-field
            v-model="data.org_name"
            placeholder="请在此输入"
            label="组织名称"
            input-align="right"
            :error-message="name"
            @blur="nametest(data.org_name)"
            error-message-align="right"
            disabled=""
          />
          <van-field
            v-model="data.org_type"
            placeholder="描述不多于10个字"
            label="组织类型"
            input-align="right"
            :error-message="type"
            @blur="typetest(data.org_type)"
            error-message-align="right"
            disabled=""
          />
          <van-field
            v-model="data.username"
            placeholder="请在此输入"
            label="管理员账号"
            input-align="right"
            :error-message="user"
            @blur="usertest(data.username)"
            error-message-align="right"
            disabled=""
          />
          <van-field
            v-model="data.password"
            placeholder="请在此输入"
            label="管理员密码"
            input-align="right"
            :error-message="mima"
            @blur="mimatest(data.password)"
            error-message-align="right"
            disabled=""
          />
        </van-cell-group>
      </div>
      <div class="list">
        <div class="title">商品管理</div>
        <div class="goodprice">
          <div>商品定价</div>
          <el-select
            v-model="data.goods_price"
            placeholder="请选择定价方式"
            size="small"
            style="width:45%"
            @change="change(data.goods_price)"
          >
            <el-option
              v-for="item in Option"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
          <div
            style="font-size:0.2rem;color:red;padding:0 0.2rem;position: absolute;right:0;bottom:0"
            v-show="showprice"
          >
            请选择定价方式
          </div>
        </div>
        <div class="goodprice">
          <div>是否允许下级添加商品</div>
          <div style="display:flex;align-items:center">
            <div :class="[yes == true ? 'yes' : 'no']" @click="yunxu"></div>
            <div>允许</div>
            <div :class="[no == true ? 'yes' : 'no']" @click="noyunxu"></div>
            <div>不允许</div>
          </div>
          <div
            style="font-size:0.2rem;color:red;padding:0 0.2rem;position: absolute;right:0;bottom:0"
            v-show="show"
          >
            请选择允许或不允许
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="ok">保 存</div>
  </div>
</template>

<script>
export default {
  mounted() {
    let obj = JSON.parse(window.sessionStorage.getItem("zuzhi"));
    this.data = Object.assign(this.data, obj);
    if (this.data.add_goods == 1) {
      this.yes = true;
    } else {
      this.no = true;
    }
  },
  data() {
    return {
      name: "",
      type: "",
      user: "",
      mima: "",
      data: {
        token: window.sessionStorage.getItem("token"),
        org_name: "",
        username: "",
        password: "",
        org_type: "",
        goods_price: "",
        add_goods: ""
      },
      Option: [
        { id: 1, value: "下级自由定价" },
        { id: 2, value: "不低于最低定价" },
        { id: 3, value: "执行统一价格" }
      ],
      yes: false,
      no: false,
      showprice: false,
      show: false
    };
  },
  methods: {
    // 输入框监测
    nametest(v) {
      if (v == "") {
        this.name = "请输入组织名称";
      } else {
        this.name = "";
      }
    },
    typetest(v) {
      if (v == "") {
        this.type = "请输入组织类型";
      } else {
        this.type = "";
      }
    },
    usertest(v) {
      if (v == "") {
        this.user = "请输入管理员账号";
      } else {
        this.user = "";
      }
    },
    mimatest(v) {
      if (v == "") {
        this.mima = "请输入管理员密码";
      } else {
        this.mima = "";
      }
    },
    change(v) {
      if (v == "") {
        this.showprice = true;
      } else {
        this.showprice = false;
      }
    },
    // 允许单选
    yunxu() {
      this.show = false;
      this.yes = true;
      this.no = false;
      this.data.add_goods = 1;
    },
    noyunxu() {
      this.show = false;
      this.yes = false;
      this.no = true;
      this.data.add_goods = 2;
    },
    // 保存
    ok() {
      if (this.data.org_name == "") {
        this.name = "请输入组织名称";
        return false;
      } else if (this.data.org_type == "") {
        this.type = "请输入组织类型";
        return false;
      } else if (this.data.username == "") {
        this.user = "请输入管理员账号";
        return false;
      } else if (this.data.password == "") {
        this.mima = "请输入管理员密码";
        return false;
      } else if (this.data.goods_price == "") {
        this.showprice = true;
        return false;
      } else if (this.data.goods_add == "") {
        this.show = true;
        return false;
      } else {
        this.$http
          .post("/org/org_edit", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("保存成功");
              this.$router.push("/zuzhi");
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.list >>> .van-cell {
  padding: 0.2rem !important;
}
.list >>> .el-input__inner {
  border: none !important;
  background-color: #f2f2f2 !important;
}
</style>
<style lang="less" scoped>
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
.list {
  border-radius: 0.2rem;
  background-color: #fff;
  margin-top: 0.2rem;
  .title {
    font-size: 0.3rem;
    padding: 0.2rem;
    border-bottom: 1px solid #f0f2f5;
    font-weight: 800;
  }
  .goodprice {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.2rem;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }
}
.yes {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
  margin: 0 0.1rem;
}
.no {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #f2f2f2;
  border-radius: 0.1rem;
  margin: 0 0.1rem;
}
</style>
