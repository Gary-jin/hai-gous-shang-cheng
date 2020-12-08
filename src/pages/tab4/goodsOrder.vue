<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '我的订单' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="P_2 overflow_y H_100">
      <van-pull-refresh v-model="downLoading" @refresh="TaoOrderList">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="TaoOrderList"
          :immediate-check="false"
        >
          <div
            class="PLR_2 PT_2 shadow_1 B_radius_5 MB_2"
            v-for="(item, index) in goodList"
            :key="index"
          >
            <div class="flex_rowL">
              <img :src="item.goods_thumb" class="VWH_16 MR_2" alt="" />
              <div class="lineH_5">
                <h3>淘宝价：￥{{ item.goods_price }}</h3>
                <h3>订单时间：{{ item.create_time }}</h3>
                <h2 class="color_FF0040">已折扣：￥{{ item.coupon_price }}</h2>
              </div>
            </div>
            <div class="BT_1_eee PTB_2">订单号：{{ item.order_no }}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
 <script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
import { PullRefresh, List } from "vant";
Vue.use(PullRefresh).use(List);
export default {
  components: { viaHeader },
  name: "goodsOrder",
  data() {
    return {
      downLoading: false,
      upLoading: false,
      finished: false,
      page: 1,
      goodList: [],
    };
  },
  created() {
    this.TaoOrderList();
  },
  mounted() {},
  methods: {
    async TaoOrderList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.getTaoOrderList, {
        page: this.page,
      });
      if (0 == code) {
        this.loadUtils(data.list, "goodList");
      }
    },
  },
};
</script> <style  scoped>
</style>
