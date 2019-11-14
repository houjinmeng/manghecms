<template>
  <div>
    <van-tabs type="line">
      <!-- 仓库列表 -->
      <van-tab title="仓库列表">
        <div class="list">
          <div class="item" @click="show=true">
            <span>朝阳仓库</span>
            <div>
              <span>分配</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <!-- 分配库存 -->
        <van-popup v-model="show" position="bottom" :style="{height:'65%'}">
          <div style="padding:0.2rem">
            <span style="margin-right:0.3rem">商品出库</span>
            <span>商品名称:农夫山泉</span>
          </div>
          <div class="list">
            <div class="item">
              <span>商品名称</span>
              <span>农夫山泉</span>
            </div>
            <div class="item">
              <span>分配对象</span>
              <el-select
                v-model="people"
                placeholder="请选择"
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
            </div>
            <div>
              <van-cell-group>
                <van-field
                  v-model="number"
                  label="出库数量"
                  placeholder="请输入数量"
                  rows="1"
                  type="number"
                />
              </van-cell-group>
            </div>
          </div>
          <div style="text-align:center;margin-top:1rem">
            <el-button type="primary" style="width:80%">保存</el-button>
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
            style="width:2rem"
            :editable="false"
            @change="a"
          ></el-date-picker>
        </div>
        <div class="list">
          <div class="item" style="text-align:center">
            <div style="flex:2">商品名称</div>
            <div style="flex:1">数量</div>
            <div style="flex:3">时间</div>
            <div style="flex:1.2">出库方</div>
            <div style="flex:1">动作</div>
            <div style="flex:1.2">入库方</div>
          </div>
          <div class="item" style="text-align:center">
            <div style="flex:2">农夫山泉</div>
            <div style="flex:1">102</div>
            <div style="flex:3">2019-08-30</div>
            <div style="flex:1.2">张三</div>
            <div style="flex:1">出库</div>
            <div style="flex:1.2">李四的</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      value1: "",
      people:'',
      options: [{ value: 1, label: "张三" }, { value: 2, label: "李四" }],
      number:''
    };
  },
  methods: {
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
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #000;
  div {
    width: 16%;
    height: 0.25rem;
    text-align: center;
    line-height: 0.25rem;
    background-color: #ccc;
  }
}
.date {
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
}
</style>