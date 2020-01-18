<template>
  <div class="txt">
    <div class="head" style="background:#fff">
      <router-link to="/home">
        <van-icon name="arrow-left" class="back" /> </router-link
      >分组管理
    </div>
    <div
      class="box"
      @click="
        (rule_name == '品牌运营管理员' || rule_name == '代理运营管理员') && edit1(item)
      "
      v-for="(item,index) in list" :key="index"
    >
      <div style="width:50%">{{item.group_name}}</div>
      <div class="num">{{item.machine_list.length}}</div>
      <van-icon name="arrow" />
    </div>
    <div style="height:1rem"></div>
    <!-- 添加分组按钮 -->
    <div
      class="addbtn"
      @click="showadd = true"
      v-show="rule_name == '品牌运营管理员' || rule_name == '代理运营管理员'"
    >
      添加分组
    </div>
    <!-- 分组设置弹窗 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <div class="list" style="margin-top:0.2rem">
        <div class="item" @click="(showedit = true), (show = false)">
          <span>分组编辑</span>
          <van-icon name="arrow" />
        </div>
        <router-link to="/group/machine">
          <div class="item">
            <span>分组设备管理</span>
            <van-icon name="arrow" /></div
        ></router-link>
        <router-link to="/group/addmachine">
          <div class="item">
            <span>分组添加设备</span>
            <van-icon name="arrow" /></div
        ></router-link>
      </div>
    </van-popup>
    <!-- 添加分组弹窗 -->
    <van-popup v-model="showadd" position="bottom" :style="{ height: '60%' }">
      <div style="padding:0.2rem;font-size:0.3rem">添加分组</div>
      <div class="list">
        <div class="item" style="justify-content: flex-start;">
          <span>分组名称 : </span>
          <input
            type="text"
            style="border:none;margin-left:0.5rem"
            v-model="data.group_name"
            placeholder="请输入分组名称"
          />
        </div>
        <div
          style="background:#8598d5;width:3rem;text-align:center;font-size:0.3rem;padding:0.1rem;margin:0.5rem auto;color:#fff;border-radius:0.2rem"
          @click="addok"
        >
          保存
        </div>
      </div>
    </van-popup>
    <!-- 分组编辑弹窗 -->
    <van-popup v-model="showedit" position="bottom" :style="{ height: '60%' }">
      <div style="padding:0.2rem;font-size:0.3rem">分组编辑</div>
      <div class="list">
        <div class="item" style="justify-content: flex-start;">
          <span>分组名称</span>
          <input
            type="text"
            style="border:none;margin-left:0.5rem"
            v-model="edit.group_name"
          />
        </div>
        <div
          style="background:#8598d5;width:3rem;text-align:center;font-size:0.3rem;padding:0.1rem;margin:0.5rem auto;color:#fff;border-radius:0.2rem"
          @click="editok"
        >
          保存
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      rule_name: window.sessionStorage.getItem("rule_name"),
      data: {
        token: window.sessionStorage.getItem("token"),
        group_name: ""
      },
      edit: {
        token: window.sessionStorage.getItem("token"),
        group_name: "",
        group_id:""
      },
      show: false, // 分组设置栏弹窗
      showadd: false, // 添加分组弹窗
      showedit: false, // 分组名称编辑弹窗
      list: [] // 分组列表
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$http
        .post("/group/group_list", this.$qs.stringify(this.data))
        .then(res => {
          let keys=Object.keys(res.data)
          let value=Object.values(res.data)
          keys.forEach(i=>{
            if(i=='not_yet_list'){
              keys.splice(keys.indexOf(i),1)
              value.splice(keys.indexOf(i),1)
            }
          })
          this.list = value;
        });
    },
    // 添加分组保存
    addok(){
      if(this.data.group_name==''){
        this.$toast.fail('请输入名称')
      }else{
        this.$http.post('/group/group_add',this.$qs.stringify(this.data)).then(res=>{
          if(res.data.code==1){
            this.$toast.success('添加成功')
            this.getlist()
            this.showadd=false
          }else{
            this.$toast.fail(res.data.msg)
          }
        })
      }
    },
    // 分组名称编辑
    editok(){
       if(this.edit.group_name==''){
        this.$toast.fail('请输入名称')
      }else{
        this.$http.post('/group/group_edit',this.$qs.stringify(this.edit)).then(res=>{
          if(res.data.code==1){
            this.$toast.success('修改成功')
            this.getlist()
            this.showedit=false
          }else{
            this.$toast.fail(res.data.msg)
          }
        })
      }
    },
    // 分组设置
    edit1(item) {
      window.sessionStorage.removeItem("machineIds")
      window.sessionStorage.setItem("group_id",item.group_id)
      if(item.machine_list.length!=0){
        let a=[]
        item.machine_list.forEach(i=>{
          a.push(i.machine_id)
        })
        window.sessionStorage.setItem('machineIds',JSON.stringify(a))
      }
      this.edit.group_name=item.group_name
      this.edit.group_id=item.group_id
      this.show = true;
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  padding: 0.2rem;
  font-size: 0.3rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
  .num {
    width: 1.2rem;
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    border: 1px solid #8598d5;
    border-radius: 0.1rem;
  }
}
.addbtn {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #8598d5;
  text-align: center;
  color: #fff;
  font-size: 0.4rem;
}
</style>
