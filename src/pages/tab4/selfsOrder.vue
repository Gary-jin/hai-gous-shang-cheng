<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '兑换记录' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <van-tabs
      id="nav-tab-vant"
      background="#fff"
      :swipe-threshold="Number(5)"
      line-height="2"
      line-width="34"
      color="#000"
      title-active-color="#000"
      title-inactive-color="#000"
      :sticky="true"
      :animated="true"
      @click="navTab"
      v-model="navActive"
    >
      <!-- @click="navTab"
          v-model="navActive"-->
      <van-tab :title="item" :key="item" v-for="item in tabArr"> </van-tab>
    </van-tabs>
    <div class="overflow_y H_100 P_2 BT_1_eee">
      <van-pull-refresh v-model="downLoading" @refresh="orderList">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="list.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="orderList"
          :immediate-check="false"
        >
          <div
            class="PLR_2 PT_2 shadow_1 B_radius_5 MB_2"
            @click="
              openWin('tab1-selfOrderinfo', {
                type: type,
                order_id: item.id,
              })
            "
            v-for="item in list"
            :key="item.id"
          >
            <div class="flex_rowL PTB_2">
              <img :src="item.goods_image" class="VWH_18 MR_2" alt="" />
              <div class="lineH_4">
                <div class="text_overflow_2 W_100">
                  {{ item.goods_name }}
                </div>

                <h2 class="color_FF0040">
                  订单状态：{{ retStatustext(item.status) }}
                  <span class="MLR_1"></span> 邮费状态：{{
                    item.status==1 ?'未支付':"已支付"
                  }}
                    <!-- retStatustext(item.status) -->
                </h2>
              </div>
            </div>
            <div class="BT_1_eee PTB_2">兑换时间：{{ item.create_time }}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import { PullRefresh, List, Tab, Tabs } from "vant";
import baseUrl from "@/js/const";
Vue.use(PullRefresh).use(List).use(Tab).use(Tabs);
export default {
  components: { viaHeader },
  name: "tab1",
  data() {
    return {
      type: api.pageParam.type,
      tabArr: ["未付款", "已付款未发货", "已发货"],
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      list: [],
      navActive: 0,
    };
  },
  created() {
    this.orderList();
  },
  mounted() {},
  methods: {
    navTab(index, title) {
      this.orderList();
    },
    //支付
    retStatustext(status) {
      let str = "";
      if (1 == status) {
        str = "未支付";
      } else if (2 == status) {
        str = "待发货 ";
      } else {
        str = "已发货 ";
      }
      return str;
    },

    //订单列表
    async orderList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
        // this.$asyncComputed.switchInfo.update()
      }
      let url;
      if (1 == this.type) {
        url = baseUrl.getCoinOrder;
      } else {
        url = baseUrl.getCheapOrder;
      }
      const { code, msg, data } = await this.http(url, {
        type: this.navActive,
        page: this.page,
      });
      if (0 === code) {
        this.loadUtils(data.list, "list");
      }
    },
  },
};
</script> <style  scoped>
</style>
