<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      class="color_fff bg_FF0040 flex_shrink_0"
    >
      <div slot="center" class="flex_grow_2 ML_2">
        <div class="bg_fff B_radius_max flex_rowL PLR_2 PTB_1 color_999">
          <span class="iconfont iconsousuo1 fontS_20"></span>
          <input
            type="text"
            v-model="keywords"
            placeholder="大家都在搜2020秋装"
          />
        </div>
      </div>
      <div slot="right" @click="openSeath" class="flex_grow_1 PLR_3">
        <div class="bg_fff P_1 B_radius_max color_000 textC">搜索</div>
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
        v-model="navActive"
      >
        <!-- 
          v-model="navActive"-->
        <van-tab :title="item" :key="item" v-for="item in changeArr"> </van-tab>
      </van-tabs>
    </div>
    <div class="overflow_y H_100 P_2 color_999">
      <div class="">
        <h3 class="MTB_2 font_weight_bold fontS_16">热门搜索</h3>
        <div class="flex_rowL flex_wrap">
          <div
            v-for="(item, index) in searchInfo.hot_key"
            :key="index"
            class="PTB_1 textC bg_f2f2f2 PLR_2 B_radius_10 MB_2 MLR_1"
            @click="clickKeys(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="">
        <div class="flex_row_between">
          <h3 class="MTB_2 font_weight_bold fontS_16">历史记录</h3>
          <span @click="clearSearchKey">删除</span>
        </div>
        <div class="flex_rowL flex_wrap">
          <div
            v-for="(item, index) in searchInfo.search_key"
            class="PTB_1 textC bg_f2f2f2 PLR_2 B_radius_10 MB_2 MLR_1"
            :key="index"
            @click="clickKeys(item)"
          >
            {{ item.keywords }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
import AsyncComputed from "vue-async-computed";
import { Tab, Tabs } from "vant";
Vue.use(AsyncComputed).use(Tab).use(Tabs);
export default {
  components: { viaHeader },
  name: "tab0seath",
  data() {
    return {
      changeArr: ["淘宝", "京东", "拼多多"],
      keywords: "",
      navActive: "",
    };
  },
  asyncComputed: {
    searchInfo: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.searchHome);
        return data;
      },
      default() {
        return {
          hot_key: [],
          search_key: [],
        };
      },
    },
  },
  created() {
    api.addEventListener(
      {
        name: "viewappear",
      },
      (ret, err) => {
        // this.switchNavBar(this.navBar_ac);
        this.$asyncComputed.searchInfo.update();
      }
    );
  },
  computed: {
    retType() {
      let type = "";
      switch (this.navActive) {
        case 0:
          type = "taobao";
          break;
        case 1:
          type = "jd";
          break;
        case 2:
          type = "pdd";
          break;
      }
      return type;
    },
  },
  methods: {
    async clearSearchKey() {
      const { code, msg, data } = await this.http(baseUrl.clearSearchKey);
      this.toast(msg);
      if (0 == code) {
        this.$asyncComputed.searchInfo.update();
      }
    },
    navTab(index, title) {},
    clickKeys(item) {
      this.keywords = item;
      this.openSeath();
    },
    openSeath() {
      if ("" == this.keywords) {
        this.toast("请输入内容");
        return false;
      }
      console.log(this.retType);

      this.openWin("tab0-seathList", {
        type: this.retType,
        ids: this.navActive,
        keywords: this.keywords,
      });
    },
  },
};
</script>
<style  scoped>
</style>
