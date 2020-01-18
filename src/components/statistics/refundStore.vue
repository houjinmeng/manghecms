<template>
  <div>
    <div class="head" style="background:#fff">
      <van-icon name="arrow-left" class="back" @click="$router.back(1)" />
      分组退款统计
    </div>
    <div class="list">
      <div class="title">
        <div>{{ org_name }}</div>
        <!-- <div>2019.09.03</div> -->
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div>{{ item.machine_name }}</div>
        <span>合计: {{ item.refund }}</span>
      </div>
      <div
        class="item"
        v-for="(item, index) in group1"
        :key="index"
        @click="everyMachine(item)"
      >
        <div>
          <span class="name">{{ item.group_name }}</span>
          <span class="num">{{item.machine_list.length}}台</span>
        </div>
        <div>
          <span style="display:inline-block;">合计: {{ item.num }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
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
        start_time: window.sessionStorage.getItem("start_time"),
        end_time: window.sessionStorage.getItem("end_time")
      },
      org_name: window.sessionStorage.getItem("org_name"),
      org_id: window.sessionStorage.getItem("org_id"),
      list: [],
      group1: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/statistics/refund_statistics", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.level2_group.length != 0) {
            res.data.level2_group.forEach(j => {
              if (this.org_id == j.org_id) {
                if (j.level2_group.length != 0) {
                  j.level2_group.forEach(i => {
                    if (i.machine_ids != "") {
                      let a = i.machine_ids.split(",");
                      let obj = {
                          group_name: i.group_name,
                          machine_list: [],
                          num: 0
                        };
                      a.forEach(r => {
                        res.data.level2.forEach(item => {
                          if (r == item.machine_id) {
                            obj.machine_list.push(item);
                            res.data.level2.splice(
                              res.data.level2.indexOf(item),
                              1
                            );
                          }
                        });
                        obj.machine_list.forEach(b => {
                          obj.num += b.refund;
                        });
                      });
                      this.group1.push(obj);
                    }
                  });
                  this.list = res.data.level2;
                } else {
                  this.list = res.data.level2;
                }
              }
            });
          }
        });
    },
     // 直营分组明细
    everyMachine(item) {
      window.sessionStorage.setItem("group_name", item.group_name);
      window.sessionStorage.setItem("start_time", this.data.start_time);
      window.sessionStorage.setItem("end_time", this.data.end_time);
      this.$router.push("/market/machine");
    },
  }
};
</script>
<style lang="less" scoped>
.list {
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem auto;
  .title {
    border-bottom: 1px solid #a8b8e2;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
    align-items: center;
    .name {
      display: inline-block;
      width: 3rem;
    }
    .num {
      display: inline-block;
      width: 1.2rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      border: 1px solid #a8b8e2;
      border-radius: 0.2rem;
    }
  }
}
</style>
