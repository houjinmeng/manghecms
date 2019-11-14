<template>
  <div>
    <van-tabs>
      <!-- 商品列表 -->
      <van-tab title="商品列表">
        <van-search placeholder="请输入商品名称" v-model="value" style="margin-bottom:0.2rem" />
        <div v-for="(item,index) in list" :key="index" :class="index== list.length-1?'box1':'box'">
          <div class="lei">类别: {{item.type_name}}</div>
          <div
            class="every"
            @click="editgoods(item1.goods_id)"
            v-for="(item1,index) in item.data"
            :key="index+100"
          >
            <img src="../../assets/img/order.png" alt style="width:0.6rem;height:0.6rem" />
            <div style="width:3rem;margin-left:0.1rem">{{item1.goods_name}}</div>
            <div style="width:2rem">售价: {{item1.goods_price}}</div>
            <div style="width:1rem">编辑</div>
            <!-- <van-icon name="arrow" /> -->
            <transition name="el-zoom-in-top">
              <div class="menu" v-show="editid==item1.goods_id">
                <div style="border-bottom:1px solid #ccc" @click.stop="goodsimg(item1)">商品图片</div>
                <div @click.stop="goodsmessage(item1)">商品信息</div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 添加商品 -->
        <div class="addbtn" @click="add_goods=true">添加商品</div>
      </van-tab>
      <van-tab title="商品分类">
        <div class="box" style="margin-top:0.2rem">
          <div class="lei">品牌分类</div>
          <div
            class="every"
            @click="editlei(item1.type_id)"
            v-for="(item1,index) in pinpai"
            :key="index+100"
          >
            <div style="width:75%">{{item1.type_name}}</div>
            <div style="width:1rem">编辑</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="box">
          <div class="lei">自建分类</div>
          <div
            class="every"
            @click="editlei(item1.type_id)"
            v-for="(item1,index) in zijian"
            :key="index+100"
          >
            <div style="width:75%">{{item1.type_name}}</div>
            <div style="width:1rem">编辑</div>
            <van-icon name="arrow" />
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 商品信息编辑 -->
    <van-popup v-model="show" position="bottom">
      <div style="background:#f2f2f2;padding:0.2rem" id="edit">
        <div style="padding:0.2rem;font-size:0.3rem">商品编辑</div>
        <div class="card">
          <van-cell-group>
            <van-field
              v-model="data1.goods_name"
              placeholder="请输入"
              label="商品名称"
              style="height:0.8rem"
            />
            <van-field
              v-model="data1.goods_price"
              placeholder="请输入"
              label="商品售价"
              style="height:0.8rem"
            />
          </van-cell-group>
          <!-- 类别 -->
          <div class="select">
            <span style="margin-right:0.6rem">商品类别</span>
            <el-select v-model="data1.type_id" placeholder="请选择仓库" size="small" style="width:41%">
              <el-option
                v-for="item in Option"
                :key="item.type_id"
                :label="item.type_name"
                :value="item.type_id"
              ></el-option>
            </el-select>
          </div>
          <div>
            <div
              style="font-size:0.3rem;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2"
            >商品描述(选填)</div>
            <van-field
              v-model="data1.content"
              rows="1"
              autosize
              type="textarea"
              placeholder="不超过50字"
              maxlength="50"
            />
          </div>
        </div>
        <div class="btn" @click="editmessage">保 存</div>
      </div>
    </van-popup>
    <!-- 商品图片编辑 -->
    <van-popup v-model="showimg" position="bottom" @closed="close">
      <div style="background:#f2f2f2;padding:0.2rem" id="edit">
        <div style="padding:0.2rem;font-size:0.3rem">商品图片编辑</div>
        <div class="card">
          <div style="font-size:0.3rem;padding:0.2rem;">商品缩略图</div>
          <van-uploader
            v-model="fileList3"
            :max-count="1"
            preview-size="1rem"
            :before-read="beforeRead"
          ></van-uploader>
          <div style="font-size:0.3rem;padding:0.2rem;border-top:1px solid #ccc">商品详情图</div>
          <van-uploader
            v-model="fileList4"
            :max-count="1"
            preview-size="1.5rem"
            :before-read="beforeRead"
          ></van-uploader>
        </div>
        <div class="btn" @click="editimg">保 存</div>
      </div>
    </van-popup>
    <!-- 商品分类编辑 -->
    <van-popup v-model="showlei" position="bottom" :style="{ height: '60%' }">
      <div style="background:#f2f2f2;padding:0.2rem;height:100%" id="edit">
        <div style="padding:0.2rem;font-size:0.3rem">商品分类编辑</div>
        <div class="card">
          <van-cell-group>
            <van-field v-model="value" placeholder="请输入" label="分类名称" style="height:0.8rem" />
          </van-cell-group>
        </div>
        <div class="btn" style="margin-top:2rem">保 存</div>
      </div>
    </van-popup>
    <!-- 添加商品 -->
    <van-popup v-model="add_goods" position="bottom">
      <div style="background:#f2f2f2;padding:0.2rem" id="edit">
        <div style="padding:0.2rem;font-size:0.3rem">添加商品</div>
        <div class="card" style="height:9rem;overflow:auto">
          <van-cell-group>
            <van-field
              v-model="data.goods_name"
              placeholder="请输入"
              label="商品名称"
              style="height:0.8rem"
            />
            <van-field
              v-model="data.goods_price"
              placeholder="请输入"
              label="商品售价"
              style="height:0.8rem"
            />
          </van-cell-group>
          <!-- 类别 -->
          <div class="select">
            <span style="margin-right:0.6rem">商品类别</span>
            <el-select v-model="data.type_id" placeholder="请选择仓库" size="small" style="width:41%">
              <el-option
                v-for="item in Option"
                :key="item.type_id"
                :label="item.type_name"
                :value="item.type_id"
              ></el-option>
            </el-select>
          </div>
          <div>
            <div style="font-size:0.3rem;padding:0.2rem;">商品缩略图</div>
            <van-uploader
              v-model="fileList1"
              :max-count="1"
              preview-size="1rem"
              :before-read="beforeRead"
            ></van-uploader>
            <div style="font-size:0.3rem;padding:0.2rem;border-top:1px solid #ccc">商品详情图</div>
            <van-uploader
              v-model="fileList2"
              :max-count="1"
              preview-size="1.5rem"
              :before-read="beforeRead"
            ></van-uploader>
            <div
              style="font-size:0.3rem;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2"
            >商品描述(选填)</div>
            <van-field
              v-model="data.content"
              rows="1"
              autosize
              type="textarea"
              placeholder="不超过50字"
              maxlength="50"
            />
          </div>
        </div>
        <div class="btn" @click="addok">保 存</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
    this.getlist1();
  },
  data() {
    return {
      // 编辑商品信息
      data1: {
        token: window.sessionStorage.getItem("token"),
        goods_id: "",
        goods_name: "",
        type_id: "",
        goods_price: "",
        content: ""
      },
      goodsid: "",
      small_url: "",
      brief_url: "",
      add_goods: false,
      message: "",
      editid: "",
      data: {
        token: window.sessionStorage.getItem("token"),
        goods_name: "",
        type_id: "",
        content: "",
        small_img: "",
        brief_img: "",
        goods_price: ""
      },
      list: [],
      pinpai: [],
      zijian: [],
      value: "",
      show: false,
      showimg: false,
      showlei: false,
      // 图片列表
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      Option: [] //分类列表
    };
  },
  methods: {
    // 商品信息编辑保存
    editmessage() {
      this.$http
        .post("/goods/goods_detail_edit", this.$qs.stringify(this.data1))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("保存成功");
            this.getlist();
            this.show = false;
          } else {
            this.$toast.fail("保存失败");
          }
        });
    },
    // 编辑图片关闭时
    close() {
      this.fileList3 = [];
      this.fileList4 = [];
    },
    // 上传之前校验;
    beforeRead(file) {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp|.tif|.psd|.dng|.cr2|.nef)$/;
      if (regex.test(fileName.toLowerCase())) {
        return true;
      } else {
        this.$toast.fail("请选择正确格式的图片");
        return false;
      }
      // }
    },
    // 分类编辑
    editlei(id) {
      window.sessionStorage.setItem("fenleiid", id);
      this.showlei = true;
    },
    // 商品列表
    getlist() {
      this.list = [];
      this.$http
        .post("/goods/goods_list", this.$qs.stringify(this.data))
        .then(res => {
          this.Option = res.data.type_list;
          res.data.type_list.forEach(item => {
            let obj = { type_name: item.type_name, data: [] };
            res.data.edit_list.forEach(item1 => {
              if (item1.type_name == obj.type_name) {
                obj.data.push(item1);
              }
            });
            this.list.push(obj);
          });
        });
    },
    // 商品分类列表
    getlist1() {
      this.$http
        .post("/goods/goods_type", this.$qs.stringify(this.data))
        .then(res => {
          this.pinpai = res.data.level1;
          this.zijian = res.data.level2;
        });
    },
    // 编辑
    editgoods(id) {
      this.editid = id;
    },
    // 商品信息编辑
    goodsmessage(item) {
      this.show = true;
      this.editid = "";
      this.data1.goods_id = item.goods_id;
      this.data1.goods_name = item.goods_name;
      this.data1.goods_price = item.goods_price;
      this.data1.content = item.content;
      this.Option.forEach(i => {
        if (i.type_name == item.type_name) {
          this.data1.type_id = i.type_id - 0;
        }
      });
    },
    // 商品图片编辑
    goodsimg(item) {
      this.showimg = true;
      this.editid = "";
      let obj = { url: "http://192.168.1.144:9999" + item.small_img };
      this.fileList3.push(obj);
      let obj1 = { url: "http://192.168.1.144:9999" + item.brief_img };
      this.fileList4.push(obj1);
      this.small_url = item.small_img;
      this.brief_url = item.brief_img;
      this.goodsid = item.goods_id;
    },
    // 图片编辑保存
    editimg() {
      let formData = new FormData();
      for (var i = 0; i < this.fileList3.length; i++) {
        formData.append("small_img", this.fileList3[i].file);
      }
      for (var i = 0; i < this.fileList4.length; i++) {
        formData.append("brief_img", this.fileList4[i].file);
      }
      formData.append("token", this.data.token);
      formData.append("small_url", this.small_url);
      formData.append("brief_url", this.brief_url);
      formData.append("goods_id", this.goodsid);
      this.$http({
        method: "post", // 指定请求方式
        url: "/goods/goods_pic_edit", // 请求接口
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;"
        },
        data: formData
      })
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success("保存成功");
            this.showimg = false;
            this.$router.go(0)
          } else {
            //否则 Toast 提示
            this.$toast.fail(res.data.msg);
          }
        })
        .catch(err => {
          this.$toast.fail("系统异常");
          reject(err);
        });
    },
    // 添加商品
    addok() {
      let formData = new FormData();
      for (var i = 0; i < this.fileList1.length; i++) {
        formData.append("small_img", this.fileList1[i].file);
      }
      for (var i = 0; i < this.fileList2.length; i++) {
        formData.append("brief_img", this.fileList2[i].file);
      }
      formData.append("token", this.data.token);
      formData.append("goods_name", this.data.goods_name);
      formData.append("type_id", this.data.type_id);
      formData.append("content", this.data.content);
      formData.append("goods_price", this.data.goods_price);
      this.$http({
        method: "post", // 指定请求方式
        url: "/goods/goods_add", // 请求接口
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;"
        },
        data: formData
      })
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success(res.data.msg);
            this.add_goods = false;
            this.getlist();
            this.fileList1 = [];
            this.fileList2 = [];
          } else {
            //否则 Toast 提示
            this.$toast.fail(res.data.msg);
          }
        })
        .catch(err => {
          this.$toast.fail("系统异常");
          reject(err);
        });
    }
  }
};
</script>
<style scoped>
/* #edit >>> .van-icon {
  visibility: hidden;
} */
</style>
<style lang='less' scoped>
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
  margin-top: 0.5rem;
}
.box {
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
  .lei {
    font-size: 0.3rem;
    font-weight: 800;
    padding: 0.2rem;
    border-bottom: 2px solid #f2f2f2;
  }
  .every {
    display: flex;
    align-items: center;
    font-size: 0.3rem;
    padding: 0.2rem;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
  }
}
.box1 {
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  .lei {
    font-size: 0.3rem;
    font-weight: 800;
    padding: 0.2rem;
    border-bottom: 2px solid #f2f2f2;
  }
  .every {
    display: flex;
    align-items: center;
    font-size: 0.3rem;
    padding: 0.2rem;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
  }
}
.card {
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0 0.2rem;
}
.menu {
  background-color: #fff;
  position: absolute;
  top: 0.8rem;
  right: 0.5rem;
  z-index: 2000;
  background-color: #f2f2f2;
  div {
    padding: 0.2rem;
    font-size: 0.3rem;
  }
}
.addbtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.2rem;
  text-align: center;
  font-size: 0.4rem;
  background-color: #8598d5;
  color: #fff;
}
.select {
  padding: 0.1rem 0.3rem;
  display: flex;
  align-items: center;
  font-size: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
</style>