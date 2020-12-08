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

    <goods-nav class="bg_f2f2f2" @sort="objstatus" />
    <div class="overflow_y H_100">
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
// import baseUrl from "@/js/const";
import seath from "@/js/common/seath";
import { List } from "vant";
Vue.use(List);
export default {
  components: { viaHeader, goodsNav, goodList },
  name: "tab0seath",
  data() {
    return {
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      goodList: [],
      keywords: "",
      sort: "",
      order: "",
      sub_cate_id: api.pageParam.sub_cate_id || "",
      cate_id: api.pageParam.cate_id || "",
      type: api.pageParam.type || "taobao",
    };
  },
  created() {
    this.goodsListFn();
  },
  mounted() {},
  mixins: [seath],
  methods: {},
};
</script>
<style  scoped>
</style>
