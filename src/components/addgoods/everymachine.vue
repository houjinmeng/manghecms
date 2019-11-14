<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/addgoods">
        <van-icon name="arrow-left" class="back" />
      </router-link>补货中
    </div>
    <div id="title">
      <div class="top">
        <div>
          仓位总数:
          <span>69</span>
        </div>
        <div>
          现有库存:
          <span>169</span>
        </div>
      </div>
      <div class="bot">
        <div class="left">
          <span
            :class="[ addall==true ? 'yes' : 'no' ]"
            @click="add_all"
            style="border-radius: 0.2rem 0 0 0.2rem;border-right:none"
          >批量补货</span>
          <span
            :class="[ delall==true ? 'yes' : 'no' ]"
            @click="del_all"
            style="border-radius: 0 0.2rem 0.2rem 0;border-left:none"
          >批量清货</span>
        </div>
        <div class="right" v-show="addall">确认补货</div>
        <div class="right" v-show="delall">确认清货</div>
      </div>
    </div>
    <ul class="choose">
      <li v-for="(item,key) in list" :key="key">
        <div>望京设备-1</div>
        <div>商品: 农夫山泉</div>
        <div>库存: 10个</div>
        <div class="botbtn">
          <div>补货</div>
          <div>清货</div>
        </div>
        <div :class="[ 1==2 ? 'yesdot' : 'nodot' ]" v-show="addall||delall"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist()
  },
  data() {
    return {
      data:{
        token:window.sessionStorage.getItem('token'),
        machine_id:window.sessionStorage.getItem('machine_id')
      },
      addall: false,
      delall: false,
      list: [
        { b: "1" },
        { b: "2" },
        { b: "3" },
        { b: "4" },
        { b: "5" },
        { b: "6" }
      ]
    };
  },
  methods: {
    // 列表
    getlist(){
      this.$http.post('/delivery/step_two',this.$qs.stringify(this.data)).then(res=>{
        this.list=res.data
      })
    },
    // 批量补货
    add_all() {
      this.showdot = !this.showdot;
      this.addall = !this.addall;
      this.delall = false;
    },
    // 批量清货
    del_all() {
      this.showdot = !this.showdot;
      this.delall = !this.delall;
      this.addall = false;
    }
  }
};
</script>
<style lang='less' scoped>
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
.choose {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0.2rem 0;
  overflow: hidden;
}
.choose li {
  float: left;
  width: 46%;
  height: 2rem;
  border: 1px solid #8698d5;
  margin-left: 0.2rem;
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
</style>