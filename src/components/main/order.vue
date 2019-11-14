<template>
  <div>
    <van-search placeholder="请输入订单编号" v-model="value" @blur="onSearch" />
    <div class="status">
      <div class="head">
        <div>全部</div>
        <div>成功</div>
        <div>未支付</div>
        <div>失败退款</div>
      </div>
      <div class="head">
        <div style="visibility: hidden;">全部</div>
        <div>不正常</div>
        <div>部分成功</div>
        <div>手工更正</div>
      </div>
    </div>
    <div style="font-size:0.3rem;text-align:center;margin:0.2rem 0">
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
    <div class="list" style="width:95%;margin:0 auto;height:8rem">
      <div class="item" @click="edit">
        <span>22641451221</span>
        <span>¥ 30</span>
        <span>2019-08-30</span>
        <span>不正常</span>
        <van-icon name="arrow" />
      </div>
      <div class="item">
        <span>22641451221</span>
        <span>¥ 30</span>
        <span>2019-08-30</span>
        <span>正常</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-pagination
      v-model="currentPage"
      :page-count="12"
      mode="simple"
      style="margin:0.2rem"
    />
    <!-- 订单编辑 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '55%' }"
      @close="close"
    >
      <div class="edit">
        <span>订单编号:15645165189</span>
        <span style="color:red">不正常</span>
      </div>
      <div class="list" v-if="list" style="width:95%;margin:0 auto">
        <div class="item" @click="(list = false), (hand = true)">
          <span>手工退款</span>
        </div>
        <div class="item" @click="editdialog = true">更改状态</div>
      </div>
      <div class="hand" v-if="hand">
        <el-input
          v-model="input"
          placeholder="请输入退款金额"
          style="width:60%"
          type="number"
        ></el-input>
        <el-button type="primary" style="background:#8598d5;border:none">确定</el-button>
      </div>
    </van-popup>
    <!-- 修改订单状态 -->
    <van-dialog
      v-model="editdialog"
      title="更改订单状态"
      show-cancel-button
      @confirm="editStatus"
      style="text-align:center;"
    >
      <el-select
        v-model="status"
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
      value: "",
      value1: "",
      value2: "",
      currentPage: 1,
      show: false,
      editdialog: false,
      options: [
        { value: "1", label: "成功" },
        { value: "2", label: "未支付" },
        { value: "3", label: "失败退款" }
      ],
      status: "",
      input: "",
      list: true,
      hand: false
    };
  },
  methods: {
    onSearch() {},
    a() {},
    edit() {
      this.show = true;
    },
    editStatus() {
      console.log(this.status);
    },
    // 关闭弹出层
    close() {
      this.list = true;
      this.hand = false;
    }
  }
};
</script>
<style lang="less" scoped>
// 头部日期搜索
.head {
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  div {
    width: 18%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background-color: #8598d5;
    color: #fff;
    font-size: 0.2rem;
    border-radius: 0.2rem;
  }
}
.status {
  background-color: #fff;
  margin-top: 0.05rem;
}
.edit {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3rem
}
.hand {
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
