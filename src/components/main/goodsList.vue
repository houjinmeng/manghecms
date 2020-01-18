<template>
  <div>
    <div class="loading" v-show="tishi">
      <van-loading
        type="spinner"
        size="0.6rem"
        :vertical="true"
        style="margin:0.6rem 0;"
        >提交中...</van-loading
      >
    </div>
    <van-tabs style="position: relative;">
      <router-link to="/home"
        ><div
          style="font-size:0.4rem;top:0.18rem;left:0.1rem;position: absolute;"
        >
          <van-icon name="arrow-left" />
        </div>
      </router-link>
      <!-- 商品列表 -->
      <van-tab title="商品列表">
        <van-search
          v-model="data.key"
          placeholder="请输入商品名称"
          show-action
          shape="round"
          style="height:7%;margin-bottom:0.2rem"
        >
          <div
            slot="action"
            @click="getlist"
            style="color:#8598d5;font-size:0.35rem"
          >
            搜索
          </div>
        </van-search>
        <div
          v-for="(item, index) in list"
          :key="index"
          :class="index == list.length - 1 ? 'box1' : 'box'"
        >
          <div class="lei">类别: {{ item.type_name }}</div>
          <div
            class="every"
            v-for="(item1, index) in item.data"
            :key="index + 100"
          >
            <img
              :src="item1.small_img"
              alt
              style="width:0.6rem;height:0.6rem"
            />
            <div style="width:3rem;margin-left:0.1rem">
              {{ item1.goods_name }}
            </div>
            <div style="width:2rem">售价: {{ item1.goods_price }}</div>
            <div
              style="width:1rem"
              @click="editgoods(item1.goods_id)"
              v-show="
                rule_name != '品牌监督管理员' || rule_name != '代理监督管理员'
              "
            >
              编辑
            </div>
            <!-- <van-icon name="arrow" /> -->
            <transition name="el-zoom-in-top">
              <div class="menu" v-show="editid == item1.goods_id">
                <div
                  style="border-bottom:1px solid #ccc"
                  @click.stop="goodsimg(item1)"
                >
                  商品图片
                </div>
                <div @click.stop="goodsmessage(item1)">商品信息</div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 添加商品 -->
        <div
          class="addbtn"
          @click="tianjia"
          v-show="
            (rule_name == '品牌运营管理员' && showadd == 1) ||
              (rule_name == '代理运营管理员' && showadd == 1)
          "
        >
          添加商品
        </div>
      </van-tab>
      <van-tab title="商品分类">
        <div class="box" style="margin-top:0.2rem">
          <div class="lei">品牌分类</div>
          <div
            class="every"
            @click="rule_name == '品牌运营管理员' && editlei(item1)"
            v-for="(item1, index) in pinpai"
            :key="index + 100"
          >
            <div style="width:75%">{{ item1.type_name }}</div>
            <div style="width:1rem" v-show="rule_name == '品牌运营管理员'">
              编辑
            </div>
            <van-icon name="arrow" v-show="rule_name == '品牌运营管理员'" />
          </div>
        </div>
        <div class="box" v-show="length != 0">
          <div class="lei">自建分类</div>
          <div
            class="every"
            @click="editlei(item1)"
            v-for="(item1, index) in zijian"
            :key="index + 100"
          >
            <div style="width:75%">{{ item1.type_name }}</div>
            <div style="width:1rem" v-show="rule_name == '代理运营管理员'">
              编辑
            </div>
            <van-icon name="arrow" v-show="rule_name == '代理运营管理员'" />
          </div>
        </div>
        <!-- 添加分类 -->
        <div
          class="addbtn"
          @click="add_type = true"
          v-show="
            (rule_name == '品牌运营管理员' && showadd == 1) ||
              (rule_name == '代理运营管理员' && showadd == 1)
          "
        >
          添加分类
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
              :disabled="rule_name != '品牌运营管理员' && status != null"
            />
            <van-field
              v-model="data1.goods_price"
              placeholder="请输入"
              label="商品售价"
              style="height:0.8rem"
              :disabled="
                (rule_name != '品牌运营管理员' &&
                  rule_name != '代理运营管理员') ||
                  status == 3
              "
            />
            <van-field
              v-model="typeName"
              label="商品类别"
              style="height:0.8rem"
              :disabled="rule_name != '品牌运营管理员'"
              v-show="rule_name != '品牌运营管理员' && status != null"
            />
          </van-cell-group>
          <!-- 类别 -->
          <div
            class="select"
            v-show="
              rule_name == '品牌运营管理员' ||
                (rule_name == '代理运营管理员' && status == null)
            "
          >
            <span style="margin-right:0.6rem">商品类别</span>
            <el-select
              v-model="data1.type_id"
              placeholder="请选择类别"
              size="small"
              style="width:41%"
              popper-class="select-option"
            >
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
            >
              商品描述(选填)
            </div>
            <van-field
              v-model="data1.content"
              rows="1"
              autosize
              type="textarea"
              placeholder="不超过50字"
              maxlength="50"
              :disabled="rule_name != '品牌运营管理员' && status != null"
            />
          </div>
        </div>
        <div
          class="btn"
          @click="editmessage"
          v-show="
            rule_name == '品牌运营管理员' || rule_name == '代理运营管理员'
          "
        >
          保 存
        </div>
      </div>
    </van-popup>
    <!-- 商品图片编辑 -->
    <van-popup
      v-model="showimg"
      position="bottom"
      @closed="close"
      :class="[
        rule_name != '品牌运营管理员' && status != null ? 'yincang' : 'jjj'
      ]"
    >
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
          <div
            style="font-size:0.3rem;padding:0.2rem;border-top:1px solid #ccc"
          >
            商品详情图
          </div>
          <van-uploader
            v-model="fileList4"
            :max-count="1"
            preview-size="1.5rem"
            :before-read="beforeRead"
          ></van-uploader>
          <div>
            <van-uploader
            v-model="fileList5"
            :max-count="9"
            preview-size="1.5rem"
            :before-read="beforeRead"
            @delete="shanchu"
            :after-read="after_up"
          ></van-uploader>
          </div>
        </div>
        <div
          class="btn"
          @click="editimg"
          v-show="
            rule_name == '品牌运营管理员' || rule_name == '代理运营管理员'
          "
        >
          保 存
        </div>
      </div>
    </van-popup>
    <!-- 商品分类编辑 -->
    <van-popup v-model="showlei" position="bottom" :style="{ height: '60%' }">
      <div style="background:#f2f2f2;padding:0.2rem;height:100%" id="edit">
        <div style="padding:0.2rem;font-size:0.3rem">商品分类编辑</div>
        <div class="card">
          <van-cell-group>
            <van-field
              v-model="goodsType.type_name"
              placeholder="请输入"
              label="分类名称"
              style="height:0.8rem"
            />
          </van-cell-group>
        </div>
        <div class="btn" style="margin-top:2rem" @click="keeplei">保 存</div>
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
            <el-select
              v-model="data.type_id"
              placeholder="请选择类别"
              size="small"
              style="width:41%"
              popper-class="select-option"
            >
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
            <div
              style="font-size:0.3rem;padding:0.2rem;border-top:1px solid #ccc"
            >
              商品详情图
            </div>
            <van-uploader
              v-model="fileList2"
              :max-count="10"
              preview-size="1.5rem"
              :before-read="beforeRead"
            ></van-uploader>
            <div
              style="font-size:0.3rem;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2"
            >
              商品描述(选填)
            </div>
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
        <div class="btn" @click="addlock && addok()">保 存</div>
      </div>
    </van-popup>
    <!-- 添加分类 -->
    <van-popup v-model="add_type" position="bottom">
      <div style="background:#f2f2f2;padding:0.2rem" id="edit">
        <div style="padding:0.2rem;font-size:0.3rem">添加分类</div>
        <div class="card" style="height:4rem;overflow:auto">
          <van-cell-group>
            <van-field
              v-model="data.type_name"
              placeholder="请输入"
              label="分类名称"
              style="height:0.8rem"
            />
          </van-cell-group>
        </div>
        <div class="btn" @click="addtype">保 存</div>
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
      tishi: false,
      addlock: true, // 添加商品保存按钮
      goods_price: "",
      status: "", //下级是否可以改价
      typeName: "", // 商品类别名称
      showadd: "", // 显示隐藏添加商品按钮
      add_type: false, // 添加分类弹窗
      rule_name: window.sessionStorage.getItem("rule_name"),
      // 编辑商品信息
      data1: {
        token: window.sessionStorage.getItem("token"),
        goods_id: "",
        goods_name: "",
        type_id: "",
        goods_price: "",
        content: "",
        type_name: ""
      },
      goodsid: "",
      small_url: "",
      brief_url: "",
      add_goods: false,
      message: "",
      editid: "",
      // 添加商品
      data: {
        token: window.sessionStorage.getItem("token"),
        goods_name: "",
        type_id: "",
        content: "",
        small_img: "",
        brief_img: "",
        goods_price: "",
        type_name: "",
        key: ""
      },
      list: [], // 列表
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
      fileList5: [],
      Option: [], //分类列表
      src: "",
      length: "",
      goodsType: {
        token: window.sessionStorage.getItem("token"),
        type_id: "",
        type_name: ""
      },
      detail_img: [], // 附加商品详情图
      delete_img:[],// 删除的详情图
      detail:[],
    };
  },
  methods: {
    // 删除附加详情图
    shanchu(file) {
      if(file.url){
        let end1 = file.url.indexOf("?");
        this.delete_img.push(file.url.substring(29, end1))
      }else{
        this.detail.forEach(r=>{
          if(r.file.name==file.file.name){
            this.detail.splice(this.detail.indexOf(r),1)
          }
        })
      }
    },
    // 添加分类保存
    addtype() {
      if (this.data.type_name == "") {
        this.$toast.fail("请输入分类名称");
      } else {
        this.$http
          .post("/goods/type_add", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.add_type = false;
              this.data.type_name = "";
              this.$toast.success(res.data.msg);
              this.getlist();
              this.getlist1();
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
      }
    },
    // 添加商品按钮
    tianjia(item) {
      if (this.Option.length == 0) {
        this.$toast.fail("请先添加商品类别");
        return false;
      }
      this.data.goods_name = "";
      this.data.goods_price = "";
      this.data.type_id = "";
      this.fileList1 = [];
      this.fileList2 = [];
      this.add_goods = true;
    },
    // 商品信息编辑保存
    editmessage() {
      if (this.status == 2) {
        if (this.data1.goods_price > this.goods_price) {
          this.$toast.fail("定价最高为" + this.goods_price + "元");
          return false;
        }
      }
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
      this.fileList5 = [];
      this.detail_img=[];
    },
    // 上传之前校验;
    beforeRead(file) {
      let fileName = file.name;
      const isLt2M = file.size / 1024 / 1024 < 5;
      // let regex = /(.jpg|.jpeg|.gif|.png|.bmp|.tif|.psd|.dng|.cr2|.nef)$/;
      let regex = /(.jpg)$/;
      if (!isLt2M) {
        this.$toast.fail("上传图片大小不能超过 5MB!");
        return false;
      }
      if (regex.test(fileName.toLowerCase())) {
        return true;
      } else {
        this.$toast.fail("图片格式只能为jpg");
        return false;
      }
    },
    // 分类编辑
    editlei(i) {
      this.goodsType.type_id = i.type_id;
      this.goodsType.type_name = i.type_name;
      this.showlei = true;
    },
    // 分类编辑保存
    keeplei() {
      if (this.goodsType.type_name == "") {
        this.$toast.fail("类别名不得为空");
        return false;
      } else {
        this.$http
          .post("/goods/goods_type_edit", this.$qs.stringify(this.goodsType))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("保存成功");
              this.getlist();
              this.getlist1();
              this.showlei = false;
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
      }
    },
    // 商品列表
    getlist() {
      this.list = [];
      this.$http
        .post("/goods/goods_list", this.$qs.stringify(this.data))
        .then(res => {
          this.showadd = res.data.add_goods;
          this.Option = res.data.type_list;
          let typename = [];
          res.data.edit_list.forEach(item1 => {
            if (typename.indexOf(item1.type_name) == -1) {
              typename.push(item1.type_name);
            }
            item1.small_img =
              "http://blind.goldenbrother.cn" +
              item1.small_img +
              "?" +
              new Date().getTime();
            item1.brief_img =
              "http://blind.goldenbrother.cn" +
              item1.brief_img +
              "?" +
              new Date().getTime();
          });
          typename.forEach(item => {
            let obj = { type_name: item, data: [] };
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
          this.length = this.zijian.length;
        });
    },
    // 编辑
    editgoods(id) {
      if (this.editid == id) {
        this.editid = "";
      } else {
        this.editid = id;
      }
    },
    // 商品信息编辑
    goodsmessage(item) {
      this.show = true;
      this.editid = "";
      this.data1.goods_id = item.goods_id;
      this.data1.goods_name = item.goods_name;
      this.data1.goods_price = item.goods_price;
      this.data1.content = item.content;

      if (
        this.rule_name == "品牌运营管理员" ||
        this.rule_name == "品牌监督管理员"
      ) {
        this.Option.forEach(i => {
          if (i.type_name == item.type_name) {
            this.data1.type_id = i.type_id - 0;
          }
        });
      } else {
        this.data1.type_id = item.type_id - 0;
        this.typeName = item.type_name;
        this.status = item.status;
        this.goods_price = item.goods_price;
      }
    },
    // 商品图片编辑
    goodsimg(item) {
      if (
        this.rule_name == "代理运营管理员" ||
        this.rule_name == "代理监督管理员"
      ) {
        this.status = item.status;
      }
      item.detail_img.forEach(i => {
        i = "http://blind.goldenbrother.cn" + i + "?" + new Date().getTime();
        this.detail_img.push(i);
      });
      this.showimg = true;
      this.editid = "";
      let obj = { url: item.small_img };
      this.fileList3.push(obj);
      let obj1 = { url: item.brief_img };
      this.fileList4.push(obj1);
      this.detail_img.forEach(i => {
        let a = { url: i };
        this.fileList5.push(a);
      });
      let end1 = item.small_img.indexOf("?");
      this.small_url = item.small_img.substring(29, end1);
      let end2 = item.brief_img.indexOf("?");
      this.brief_url = item.brief_img.substring(29, end2);
      this.goodsid = item.goods_id;
    },
    after_up(file){
      this.detail.push(file)
    },
    // 图片编辑保存
    editimg() {
      if(this.fileList3.length==0){
        this.$toast.fail('请上传缩略图')
        return false
      }
      if(this.fileList4.length==0){
        this.$toast.fail('请上传首张详情图')
        return false
      }
      this.tishi = true;
      let formData = new FormData();
      for (var i = 0; i < this.fileList3.length; i++) {
        formData.append("small_img", this.fileList3[i].file);
      }
      for (var i = 0; i < this.fileList4.length; i++) {
        formData.append("brief_img", this.fileList4[i].file);
      }
      for (var i = 0; i < this.detail.length; i++) {
        formData.append('detail_img[]', this.detail[i].file);
      }
      formData.append("token", this.data.token);
      formData.append("small_url", this.small_url);
      formData.append("brief_url", this.brief_url);
      formData.append("goods_id", this.goodsid);
      formData.append('delete_img',this.delete_img)
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
            this.tishi = false;
            this.$toast.success("保存成功");
            this.showimg = false;
            this.getlist();
            this.detail=[]
            //this.$router.go(0);
          } else {
            //否则 Toast 提示
            this.tishi = false;
            this.$toast.fail(res.data.msg);
            this.detail=[]
          }
        })
        .catch(err => {
          this.tishi = false;
          this.$toast.fail("系统异常");
          reject(err);
          this.detail=[]
        });
    },
    // 添加商品
    addok() {
      if (this.data.goods_name == "") {
        this.$toast.fail("请输入商品名称");
        return false;
      } else if (this.data.goods_price == "") {
        this.$toast.fail("请输入商品价格");
        return false;
      } else if (this.data.type_id == "") {
        this.$toast.fail("请选择商品类别");
        return false;
      } else if (this.fileList1.length == 0) {
        this.$toast.fail("请上传缩略图");
        return false;
      } else if (this.fileList2.length == 0) {
        this.$toast.fail("请上传详情图");
        return false;
      }
      this.tishi = true;
      this.addlock = false;
      let formData = new FormData();
      for (var i = 0; i < this.fileList1.length; i++) {
        formData.append("small_img", this.fileList1[i].file);
      }
      formData.append("brief_img", this.fileList2[0].file);
      for (var i = 1; i < this.fileList2.length; i++) {
        formData.append(`detail_img[]`, this.fileList2[i].file);
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
            this.tishi = false;
            this.addlock = true;
            this.getlist();
            this.fileList1 = [];
            this.fileList2 = [];
          } else {
            //否则 Toast 提示
            this.$toast.fail(res.data.msg);
          }
        })
        .catch(err => {
          this.tishi = false;
          this.$toast.fail("系统异常");
          reject(err);
        });
    }
  }
};
</script>
<style scoped>
.yincang >>> .van-icon {
  visibility: hidden !important;
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
  height: 8rem;
  overflow: auto
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
