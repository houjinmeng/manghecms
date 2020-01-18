<template>
  <div class="txt">
    <div class="head">
      <router-link to="/machinelist">
        <van-icon name="arrow-left" class="back" /> </router-link
      >货道设置
    </div>
    <div class="huodao" v-for="(item, index) in data.json" :key="index">
      <div style="width:1rem">仓位{{ index + 1 }}</div>
      <input type="number" style="margin:0 0.2rem" v-model="item.lat" />
      <input type="number" v-model="item.lng" />
      <div class="edit" @click="edit(index)">修改</div>
    </div>
    <div class="huodao" v-for="(item, index) in New" :key="index + 1000">
      <div style="width:1rem">仓位{{ item.index }}</div>
      <input
        type="number"
        style="margin:0 0.2rem"
        v-model="item.lat"
        placeholder="X坐标"
      />
      <input type="number" v-model="item.lng" placeholder="Y坐标" />
      <img
        v-if="item.index == num"
        src="../../assets/img/zengjia.png"
        alt
        style="width:0.5rem;height:0.5rem;margin-left:0.8rem"
        @click="add"
      />
      <img
        v-if="item.index != num"
        src="../../assets/img/shanchu.png"
        alt
        style="width:0.5rem;height:0.5rem;margin-left:0.8rem"
        @click="delet(index)"
      />
    </div>
    <div @click="ok" class="btn">保 存</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        machine_id: window.sessionStorage.getItem("machineid"),
        json:[],
        save: []
      },
      New: [{ lat: "", lng: "", index: "" }],
      num: "",
      list:[]
    };
  },
  methods: {
    // 修改
    edit(index) {
      var obj = {}; //或者 var obj=new Object();
      var key = this.data.json[index].id;
      var value = { lat: this.data.json[index].lat, lng: this.data.json[index].lng };
      obj[key] = value;
      this.data.save = obj;
      this.$http
        .post("/machine/machine_conf_edit", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("修改成功");
            this.getlist();
          } else {
            this.$toast.fail("修改失败");
          }
        });
    },
    //   初始列表
    getlist() {
      this.$http
        .post("/machine/machine_conf_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list=res.data
          this.data.json = res.data;
          this.num = this.data.json.length + 1;
          this.New[0].index = this.data.json.length + 1;
        });
    },
    // 增加
    add() {
      this.num++;
      this.New.push({ lat: "", lng: "", index: this.num });
      // this.$http
      //   .post("/machine/machine_conf_add", this.$qs.stringify(this.data))
      //   .then(res => {
      //     if (res.data.code == 1) {
      //       this.$toast.success("添加成功");
      //       this.getlist();
      //       this.data.new = [{ lat: "", lng: "", index: 1 }];
      //     } else {
      //       this.$toast.fail("添加失败");
      //     }
      //   });
    },
    // 删除
    delet(index) {
      this.num--;
      this.New.splice(index, 1);
      this.New.forEach(item => {
        item.index--;
      });
    },
    // 保存
    ok() {
      this.data.json=this.list
      if (this.New.length == 1) {
        if (this.New[0].lat != "" && this.New[0].lng != "") {
          this.data.json.push(this.New[0]);
        }
      } else {
        for(let i=0;i<this.New.length;i++){
          if (this.New[i].lat != "" && this.New[i].lng != "") {
            this.data.json.push(this.New[i]);
          } else {
            this.$toast.fail("坐标不能为空");
            return false
            break
          }
        }
      }
      this.$http.post('/machine/conf_edit',this.$qs.stringify(this.data)).then(res=>{
        if(res.data.code==1){
          this.$toast.success("保存成功")
          this.getlist()
          this.New=[{lat:"",lng:"",index:""}]
        }else{
          this.$toast.fail(res.data.msg)
        }
      })
    }
  }
};
</script>
<style scoped lang="less">
.btn {
  width: 5rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
  background-color: #8598d5;
  border-radius: 0.1rem;
  font-size: 0.35rem;
  margin: 0.4rem auto;
  color: #fff;
  margin-top: 1rem;
}
.huodao {
  border-bottom: 1px solid #f2f2f2;
  padding: 0.3rem 0.2rem;
  display: flex;
  font-size: 0.3rem;
  align-items: center;
  input {
    width: 1.8rem;
    border-radius: 0.1rem;
    border: 1px solid #000;
    padding: 0.05rem 0.2rem;
    box-sizing: border-box;
  }
  .edit {
    width: 0.8rem;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #8598d5;
    color: #fff;
    text-align: center;
    border-radius: 0.1rem;
    margin-left: 0.8rem;
  }
}
</style>
