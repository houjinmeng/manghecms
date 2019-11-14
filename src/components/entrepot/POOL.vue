<template>
  <div>
    <van-tabs type="line">
      <!-- 仓库列表 -->
      <van-tab title="仓库列表">
        <div class="list" style="height:10rem;width:95%;margin:0.2rem auto">
          <div class="item" @click="setStock(item.stock_id)" v-for="(item,index) in list" :key="index">
            <span>{{item.stock_name}}</span>
            <div>
              <span>管理</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div
          style="background:#8598d5;width:3rem;text-align:center;font-size:0.3rem;padding:0.2rem;margin:0 auto;color:#fff;border-radius:0.2rem"
          @click="showadd=true"
        >添加仓库</div>
        <!-- 添加仓库弹窗 -->
        <van-dialog v-model="showadd" title="添加仓库" show-cancel-button @confirm='addstock'>
          <div style="text-align:center"><el-input style="width:70%;margin:0.2rem" placeholder="请输入仓库名称" v-model="data.stock_name"></el-input></div>
        </van-dialog>
        <!-- 仓库编辑 -->
        <van-popup v-model="show" position="bottom" :style="{height:'65%'}">
          <div
            class="dialog"
            style="height:10%;line-height:0.4rem;padding:0.2rem;font-size:0.3rem;background:#f0f2f5;box-sizing:border-box"
          >朝阳仓库</div>
          <div style="background:#f0f2f5;padding:0 0.2rem;height:90%">
            <div class="list">
              <router-link to="/entrepot/editname">
                <div class="item">
                  <span>仓库名称</span>
                  <van-icon name="arrow" />
                </div>
              </router-link>
              <router-link to="/entrepot/check">
                <div class="item">
                  <span>查看库存</span>
                  <van-icon name="arrow" />
                </div>
              </router-link>
              <div class="item" @click="delet">
                <span>仓库删除</span>
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </van-popup>
      </van-tab>
      <!-- 日志 -->
      <van-tab title="出/入库日志">
        <div class="head">
          <div>全部</div>
          <div>出库</div>
          <div>入库</div>
        </div>
        <div class="date">
          <span style="margin:0 0.2rem">时间</span>
          <el-date-picker
            value-format="timestamp"
            v-model="value1"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width:2.5rem"
            :editable="false"
            @change="a"
          ></el-date-picker>
          <span style="margin:0 0.2rem">至</span>
          <el-date-picker
            value-format="timestamp"
            v-model="value1"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width:2.5rem"
            :editable="false"
            @change="a"
          ></el-date-picker>
        </div>
        <div class="list" style="width:95%;margin:0.2rem auto;height:8.9rem">
          <div class="item" style="text-align:center">
            <div>商品名称</div>
            <div>数量</div>
            <div>时间</div>
            <div>出库方</div>
            <div>动作</div>
            <div>入库方</div>
          </div>
          <div class="item" style="text-align:center">
            <div>农夫山泉</div>
            <div>102</div>
            <div>
              <div>2019</div>
              <div>8-30</div>
            </div>
            <div>张三</div>
            <div>出库</div>
            <div>李四的</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      showadd:false,
      data: { token: window.sessionStorage.getItem("token"),stock_name:'' },
      list: [],
      show: false,
      value1: ""
    };
  },
  methods: {
    // 仓库列表
    getlist() {
      this.$http
        .post("/stock/stock_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 设置仓库
    setStock(id){
      this.show=true
      window.sessionStorage.setItem('stockid',id)
    },
    // 添加仓库
    addstock(){
      this.$http.post('/stock/stock_add',this.$qs.stringify(this.data)).then(res=>{
        if(res.data.code==1){
          this.$toast.success('添加成功')
          this.getlist()
        }else{
          this.$toast.fail('添加失败')
        }
      })
    },
    a() {},
    delet() {
      this.$dialog
        .confirm({
          title: "",
          message: "确定删除该仓库吗"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang='less' scoped>
// 头部日期搜索
.head {
  margin-top: 0.15rem;
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  div {
    width: 16%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background-color: #8598d5;
    color:#fff;
    font-size: 0.3rem;
    border-radius: 0.2rem
  }
}
.date {
  padding: 0.2rem;
  background-color: #fff;
  display: flex;
  align-items: center;
}
</style>