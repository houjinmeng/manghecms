<template>
  <div style="height:100%">
    <div class="head" style="background:#fff">
      <router-link to="/machinelist">
        <van-icon name="arrow-left" class="back" /> </router-link
      >设备出货
    </div>
    <van-search
      v-model="value"
      placeholder="请输入商品名称"
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
    <div style="text-align:center;background:#fff;padding:0.1rem 0;margin-bottom:0.2rem;font-size:0.3rem">
      时间
      <el-date-picker
        value-format="timestamp"
        v-model="value1"
        type="date"
        placeholder="选择日期"
        size="mini"
        style="width:2.8rem"
        :editable="false"
        @change="a"
      ></el-date-picker
      >至
      <el-date-picker
        value-format="timestamp"
        v-model="value2"
        type="date"
        placeholder="选择日期"
        size="mini"
        style="width:2.8rem"
        :editable="false"
      ></el-date-picker>
    </div>
    <div class="list" style="height:70%">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div>{{item.update_time*1000|formatDate}}
          <div style="text-align:center">{{item.update_time*1000|formatDateTwo}}</div>
        </div>
        <span>{{item.goods_name}}</span>
        <span class="btn" @click="outgoods(item)">出货</span>
      </div>
    </div>
    <van-pagination v-model="currentPage" :page-count="12" mode="simple" style="margin:0.1rem 0"/>
    <!-- 出货 -->
    <van-dialog
          v-model="show"
          title="仓库名称"
          show-cancel-button
          :before-close="close1"
        >
          <div style="text-align:center">
            <el-input
              style="width:70%;margin:0.2rem"
              placeholder="请输入商品数量"
              v-model="data.number"
              type="number"
            ></el-input>
          </div>
        </van-dialog>
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
      return formatDate(date, "hh:mm:ss"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    this.getlist()
  },
  data() {
    return {
      show:false,
      value: "",
      value1: "",
      value2: "",
      currentPage: 1,
      data:{
        token:window.sessionStorage.getItem('token'),
        machine_id:window.sessionStorage.getItem('machineid'),
        conf_id:"",
        number:""
      },
      list:[]
    };
  },
  methods: {
    // 出货列表
    getlist(){
      this.$http.post('/machine/conf_list',this.$qs.stringify(this.data)).then(res=>{
        this.list=res.data
      })
    },
    // 出货
    outgoods(i){
      this.data.conf_id=i.conf_id
      this.show=true
    },
    // 确定出货
    close1(action, done) {
      if (action == "confirm") {
        if (this.data.number == "") {
          this.$toast.success("请输入商品数量");
          done(false);
          return false;
        }
        this.$http
          .post("/api/machine/open", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("出货成功");
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
    onSearch() {},
    a() {
      console.log(this.value1);
    }
  }
};
</script>
<style scoped>
.btn {
  display: inline-block;
  height: 0.5rem;
  width: 1.2rem;
  line-height: 0.5rem;
  text-align: center;
  border-radius: 0.1rem;
  border: 1px solid #8598d5
}
</style>
