<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      class="color_fff bg_FF0040 flex_shrink_0"
    >
      <div slot="center" class="flex_grow_2 ML_2">
        <div class="bg_fff B_radius_max flex_rowL PLR_2 PTB_1 color_999">
          <span class="iconfont iconsousuo1 fontS_20"></span>
          <input v-model="keywords" type="text" placeholder="请输入关键词" />
        </div>
      </div>
      <div slot="right" @click="btnSeath" class="flex_grow_1 PLR_3">
        <div class="bg_fff P_1 B_radius_max color_FF0040 textC">搜索</div>
      </div>
    </via-header>
    <div class="overflow_y H_100">
      <!-- <van-pull-refresh v-model="downLoading" @refresh="homegoodsList"> -->
      <van-list
        v-model="upLoading"
        :finished="finished"
        :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
        @load="seathGoodList"
        :immediate-check="false"
      >
        <!-- {{ retType }} -->
        <div class="flex_rowL flex_wrap">
          <tab1-list
            v-for="(item, index) in goodList"
            :info="item"
            :pageType="2"
            :type="retType"
            class="P_1"
            :key="index"
          />
        </div>
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>
  </div>
</template>
 <script>
import viaHeader from "@/components/header.vue";
import tab1List from "@/components/tab1_list.vue";
import AsyncComputed from "vue-async-computed";
import { PullRefresh, List } from "vant";
Vue.use(PullRefresh).use(List);
import baseUrl from "@/js/const";
Vue.use(AsyncComputed);
export default {
  components: { viaHeader, tab1List },
  name: "tab0seath",
  data() {
    return {
      pageFrom: api.pageParam.type,
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      goodList: [],
      keywords: "",
      pagetype: api.pageParam.type,
    };
  },
  created() {
    // alert(this.pagetype);
  },
  computed: {
    retType: {
      get() {
        return this.pagetype == "tab1" ? 1 : 2;
      },
      set(v) {},

      // return this.data
    },
  },
  mounted() {},
  methods: {
    initAd() {},
    btnSeath() {
      if (this.keywords == "") {
        this.toast("请输入搜索内容");
        return;
      }
      this.seathGoodList();
    },
    async seathGoodList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      let url;
      if ("tab1" == this.pageFrom) {
        url = baseUrl.getCoinGoodsList;
      } else {
        url = baseUrl.getCheapGoodsList;
      }
      const { code, msg, data } = await this.http(url, {
        page: this.page,
        keywords: this.keywords,
      });
      if (0 == code) {
        this.loadUtils(data.list, "goodList");
      }
      // this.goodList = d
    },
  },
};
</script>
<style  scoped>
</style>
