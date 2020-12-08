<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      class="color_fff bg_FF0040 flex_shrink_0"
    >
      <div slot="center" class="flex_grow_2 ML_2">
        <div class="bg_fff B_radius_max flex_rowL PTB_1 PLR_2 color_999">
          <span class="iconfont iconsousuo1 fontS_20"></span>
          <input
            v-model="keywords"
            type="text"
            placeholder="大家都在搜2020秋装"
          />
        </div>
      </div>
      <div @click="goodsListFn" slot="right" class="flex_grow_1 PLR_3">
        <div class="bg_fff P_1 B_radius_max color_FF0040 textC">搜索</div>
      </div>
    </via-header>
    <div class="bg_FF0040">
      <van-tabs
        id="nav-tab-vant"
        background="#FF0040"
        :swipe-threshold="Number(5)"
        line-height="2"
        line-width="34"
        color="#fff"
        title-active-color="#fff"
        title-inactive-color="#FFDBDB"
        :sticky="true"
        :animated="true"
        v-model="retActive"
        @click="navTab"
      >
        <!-- @click="navTab"
          v-model="navActive"-->
        <van-tab
          :title="item.name"
          :key="index"
          v-for="(item, index) in cateInfo"
        >
        </van-tab>
      </van-tabs>
    </div>
    <goods-nav @sort="objstatus" class="bg_f2f2f2" />
    <div class="overflow_y H_100">
      <!-- {{ retActive }} -->
      <van-list
        v-model="upLoading"
        :finished="finished"
        :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
        @load="goodsListFn"
        :immediate-check="false"
      >
        <good-list
          v-for="(item, index) in goodList"
          :key="index"
          :info="item"
          :typeGood="1"
        />
      </van-list>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import goodsNav from "@/components/goodsNav.vue";
import goodList from "@/components/tab0_list.vue";
import baseUrl from "@/js/const";
import seath from "@/js/common/seath";
import AsyncComputed from "vue-async-computed";
import { Tab, Tabs, List } from "vant";
Vue.use(AsyncComputed).use(Tab).use(Tabs).use(List);
export default {
  components: { viaHeader, goodsNav, goodList },
  name: "tab0seath",
  mixins: [seath],
  data() {
    return {
      cateInfo: api.pageParam.cateInfo || [],
      info: api.pageParam.info || {},
      navActive: 0,
      // type: api.pageParam.info.jump,
      sub_cate_id: api.pageParam.sub_cate_id || 0,
      cate_id: api.pageParam.info.cid || "",
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      goodList: [],
      keywords: "",
      sort: "",
      order: "",
      status: api.pageParam.status,
      type: api.pageParam.type || "taobao",
    };
  },
  created() {
    this.initAd();
  },
  computed: {
    retActive: {
      get: function () {
        let ids;
        if ("type1" == this.status) {
          ids = this.cateInfo.findIndex((item) => item.cid == this.info.cid);
        } else {
          ids = 0;
        }
        return ids;
      },

      set: function () {
        return 0;
      },
    },
    // changeCateArr  () {
    // return
    // return this.data
    // }
  },
  mounted() {},
  methods: {
    initAd() {
      // console.log(JSON.stringify(this.info));
      // console.log(JSON.stringify(this.cateInfo));
      this.goodsListFn();
    },
    navTab(index) {
      // this
      this.cate_id = this.cateInfo.find((item, ids) => ids == index).cid;
      this.goodsListFn();
    },
  },
};
</script>
<style  scoped>
</style>
