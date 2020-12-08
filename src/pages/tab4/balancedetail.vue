<template>
  <div class="flex_colT flex_items_stretch VW_100 VH_100">
    <via-header
      @click-left="closeWin()"
      class="bg_FF1F46 bg_FF0040 flex_shrink_0 color_fff"
      :center="{
        text: title,
      }"
    ></via-header>
    <div class="PLR_2 overflow_y H_100 flex_grow_1">
      <van-pull-refresh v-model="downLoading" @refresh="logList">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="list.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="logList"
          :immediate-check="false"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="PTB_3 PLR_2 flex_row_between BB_1_eee"
          >
            <div class="">
              <h4>{{ item.memo }}</h4>
              <p>{{ item.createtime }}</p>
            </div>
            <div
              class="font_weight_bold color_999 fontS_18"
              :class="{ color_FF0040: 2 == item.type }"
            >
              {{ "yue" != pageLx ? item.score : item.money }}
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
  name: "goodInfo",
  components: {
    viaHeader,
  },
  data() {
    return {
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      list: [],
      title: api.pageParam.title || "",
      pageLx: api.pageParam.type,
      topBarTextColor: "light",
    };
  },

  created() {
    this.initAd();
  },
  mounted() {},
  methods: {
    initAd() {
      this.logList();
    },
    async logList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
        // this.$asyncComputed.switchInfo.update()
      }
      let url;
      if ("yue" == this.pageLx) {
        url = baseUrl.moneyLog;
      } else {
        url = baseUrl.coinLog;
      }
      const { code, msg, data } = await this.http(url, {
        page: this.page,
        pagesize: 15,
      });
      if (0 === code) {
        this.loadUtils(data.list, "list", 15);
      }
    },
  },
};
</script>

<style></style>
