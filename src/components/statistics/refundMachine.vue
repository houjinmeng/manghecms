<template>
  <div>
    <div class="head" style="background:#fff">
      <van-icon name="arrow-left" class="back" @click="$router.back(1)" />
      设备退款明细
    </div>
    <div class="list">
      <div class="title">
        <div>{{ group_name }}</div>
        <!-- <div>2019.09.03</div> -->
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div>{{ item.machine_name }}</div>
        <div>合计: {{ item.refund }}</div>
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
      group_name: window.sessionStorage.getItem("group_name"),
      list: [],
      org_id: window.sessionStorage.getItem("org_id")
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/statistics/refund_statistics", this.$qs.stringify(this.data))
        .then(res => {
          res.data.level1_group.forEach(i => {
            let a = [];
            if (this.group_name == i.group_name) {
              a = i.machine_ids.split(",");
              a.forEach(r => {
                res.data.level1.forEach(b => {
                  if (r == b.machine_id) {
                    this.list.push(b);
                  }
                });
              });
            }
          });
          res.data.level2_group.forEach(j => {
            if (this.org_id == j.org_id) {
              j.level2_group.forEach(i => {
                let a = [];
                if (this.group_name == i.group_name) {
                  a = i.machine_ids.split(",");
                  a.forEach(r => {
                    res.data.level2.forEach(b => {
                      if (r == b.machine_id) {
                        this.list.push(b);
                      }
                    });
                  });
                }
              });
            }
          });
        });
    }
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
      width: 1.2rem;
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
