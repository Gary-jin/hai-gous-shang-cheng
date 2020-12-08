<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      class="color_fff bg_FF0040 flex_shrink_0"
    >
      <div slot="center" class="flex_grow_2 ML_2">
        <div class="bg_fff B_radius_max flex_rowL PLR_2 PTB_1 color_999">
          <span class="iconfont iconsousuo1 fontS_20"></span>
          <input type="text" placeholder="大家都在搜2020秋装" />
        </div>
      </div>
      <div slot="right" class="flex_grow_1 PLR_3">
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
        @click="navTab"
        v-model="navActive"
      >
        <!-- "-->
        <van-tab :title="item" v-for="(item, index) in changeArr" :key="index">
        </van-tab>
      </van-tabs>
    </div>

    <goods-nav @sort="objstatus" class="bg_f2f2f2" />
    <div class="overflow_y H_100">
      <van-list
        v-model="upLoading"
        :finished="finished"
        :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
        @load="goodsListFn"
        :immediate-check="false"
      >
        <div class="flex_rowL flex_wrap">
          <good-list
            v-for="(item, index) in goodList"
            :key="index + 'goods'"
            :info="item"
            :typeGood="3"
          />
        </div>
      </van-list>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import goodsNav from "@/components/goodsNav.vue";
import goodList from "@/components/tab0_list.vue";
import seath from "@/js/common/seath";
import { List, Tab, Tabs } from "vant";
Vue.use(List).use(Tab).use(Tabs);
export default {
  components: { viaHeader, goodsNav, goodList },
  name: "tab0seath",
  data() {
    return {
      changeArr: ["淘宝", "京东", "拼多多"],
      keywords: api.pageParam.keywords,
      type: api.pageParam.type || "taobao",
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      goodList: [],
      sort: "",
      order: "",
      navActive: api.pageParam.ids || 0,
    };
  },
  // computed: {
  //   retType() {
  //     let type = "";
  //     switch (this.navActive) {
  //       case 0:
  //         type = "taobao";
  //         break;
  //       case 1:
  //         type = "jd";
  //         break;
  //       case 2:
  //         type = "pdd";
  //         break;
  //     }
  //     return type;
  //   },
  // },
  mixins: [seath],
  created() {
    // alert(this.navActive);
    this.goodsListFn();
  },
  mounted() {},
  methods: {
    navTab(index, title) {
      switch (index) {
        case 0:
          this.type = "taobao";
          break;
        case 1:
          this.type = "jd";
          break;
        case 2:
          this.type = "pdd";
          break;
      }
      // this.type = this.retType;
      console.log(this.type);
      this.goodsListFn();
    },
  },
};
</script>
<style  scoped>
</style>
