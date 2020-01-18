<template>
  <div class="txt1">
    <div class="loading" v-show="tishi">
      <van-loading
        type="spinner"
        size="0.6rem"
        :vertical="true"
        style="margin:0.6rem 0"
        >登陆中...</van-loading
      >
    </div>
    <div class="title">盲盒后台管理系统</div>
    <div class="box">
      <div style="margin-bottom:0.3rem" class="same">
        <img src="../../assets/img/user.png" alt />
        <input
          v-model="data.account"
          placeholder="手机号"
          @blur="phonetest(data.account)"
          oninput="if(value.length>11)value=value.slice(0,11)"
          @keyup.13="login"
        />
        <transition name="el-zoom-in-top">
          <div
            v-show="phoneShow"
            style="color:red;;font-size:0.25rem;line-height:0;position: absolute;bottom:-0.12rem"
          >
            请填写正确格式的手机号
          </div>
        </transition>
      </div>
      <div class="same">
        <img src="../../assets/img/mima.png" alt />
        <input
          v-model="data.password"
          placeholder="密码"
          @blur="blur"
          type="password"
          @keyup.13="login"
        />
        <transition name="el-zoom-in-top">
          <div
            v-show="passwordShow"
            style="color:red;;font-size:0.25rem;line-height:0;position: absolute;bottom:-0.12rem"
          >
            请输入密码
          </div>
        </transition>
      </div>
    </div>
    <div @click="login" class="btn">登录</div>
  </div>
</template>

<script>
export default {
  mounted() {
    let res = this.getQueryString("qrresult");
    if (res != null) {
      let a = {
        token: window.sessionStorage.getItem("token"),
        uuid: res.substring(0, res.length - 2)
      };
      this.$http
        .post("/machine/machine_binding", this.$qs.stringify(a))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("绑定成功");
            this.$router.push("/home");
          } else {
            this.$toast.fail(res.data.msg);
            this.$router.push("/addmachine");
          }
        })
        .catch(err => {
          this.$toast.fail("系统异常");
          this.$router.push("/addmachine");
          reject(err);
        });
    }
  },
  data() {
    return {
      tishi: false,
      data: {
        // account: "user1",
        // password: "111111"
        account: "",
        password: ""
      },
      phoneShow: false,
      passwordShow: false,
    };
  },
  methods: {
    blur() {
      document.body.addEventListener("focusout", function() {
        window.scrollTo(0, 0);
      });
    },
    login() {
      if (this.data.account == "") {
        this.phoneShow = true;
        return false;
      } else if (this.data.password == "") {
        this.passwordShow = true;
        return false;
      } else {
        this.tishi = true;
        this.$http
          .post("/user/login", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              window.sessionStorage.setItem(
                "token",
                res.data.data.userinfo.token
              );
              window.sessionStorage.setItem(
                "rule_name",
                res.data.data.rule_name
              );
              this.$router.push("/home");
              this.tishi = false;
            } else {
              this.tishi = false;
              this.$toast.fail(res.data.msg);
            }
          })
          .catch(error=>{
            this.tishi=false
            this.$toast.fail('网络错误')
          })
      }
    },
    // 手机号验证格式
    phonetest(value) {
      document.body.addEventListener("focusout", function() {
        window.scrollTo(0, 100);
      });
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value == "") {
        this.phoneShow = false;
      } else if (!reg.test(value)) {
        this.phoneShow = true;
        return false;
      } else {
        this.phoneShow = false;
      }
      return true;
    },
    // 获取扫码结果
    getQueryString(name) {
      var reg = new RegExp("\\b" + name + "=([^&]*)");
      var r = location.href.match(reg);
      if (r != null) return unescape(r[1]);
    }
  }
};
</script>
<style lang="less" scoped>
.txt1 {
  background: url("../../assets/img/login.png") top left no-repeat;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}
.title {
  text-align: center;
  font-size: 0.6rem;
  margin-top: 2.83rem;
  margin-bottom: 1.36rem;
  color: #fff;
}
.box {
  height: 2.5rem;
  width: 5.34rem;
  padding: 0.42rem 0.57rem;
  box-sizing: border-box;
  border: 1px solid #fff;
  margin: 0 auto;
  border-radius: 0.2rem;
  background-color: rgba(245, 241, 241, 0.336);
  .same {
    position: relative;
    img {
      position: absolute;
      left: 0.1rem;
      top: 0.15rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  input {
    height: 0.7rem;
    width: 100%;
    text-align: center;
    border-radius: 0.1rem;
    border: none;
    font-size: 0.3rem;
  }
}
.btn {
  width: 5.34rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #fedf7b;
  border-radius: 0.1rem;
  font-size: 0.35rem;
  margin: 0.4rem auto;
}
</style>
