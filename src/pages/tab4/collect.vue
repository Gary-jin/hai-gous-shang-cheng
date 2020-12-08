<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '我的收藏' }"
      :right="{ text: '清空' }"
      @click-right="emptyCollection"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_2">
      <van-pull-refresh v-model="downLoading" @refresh="getCollection">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="list.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="getCollection"
          :immediate-check="false"
        >
          <div
            class="flex_rowL P_2 shadow_2 MB_2 B_radius_10"
            v-for="(item, index) in list"
            :key="index"
            @click="
              openWin('tab0-goodsdetail', {
                goods_id: item.goods_id,
                shoptype: item.type,
              })
            "
          >
            <img :src="item.goods_thumb" class="VWH_16 MR_1" alt="" />
            <div class="flex_grow_1">
              <div class="text_overflow_1 W_70vw">
                {{ item.goods_name }}
              </div>
              <div class="flex_row_between MT_2">
                <h4 class="color_FF0040 fontS_14">
                  优惠券：￥{{ item.coupon_money }}
                </h4>
                <span
                  @click.stop="delCollection(item.id)"
                  class="iconfont icondel fontS_18"
                ></span>
              </div>
            </div>
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
  name: "collect",
  data() {
    return {
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      list: [],
    };
  },
  created() {
    this.getCollection();
  },
  mounted() {},
  methods: {
    async getCollection() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
        // this.$asyncComputed.switchInfo.update()
      }
      const { code, msg, data } = await this.http(baseUrl.getCollection, {
        page: this.page,
      });
      if (0 === code) {
        this.loadUtils(data.list, "list");
      }
    },
    //删除收藏
    async delCollection(ids) {
      const { code, msg, data } = await this.http(baseUrl.delCollection, {
        id: ids,
      });
      this.toast(msg);
      if (0 == code) {
        this.getCollection();
      }
    },
    //清空收藏
    async emptyCollection() {
      const { code, msg, data } = await this.http(baseUrl.emptyCollection);
      this.toast(msg);
      if (0 == code) {
        this.getCollection();
      }
    },
  },
};
</script> <style  scoped>
</style>
