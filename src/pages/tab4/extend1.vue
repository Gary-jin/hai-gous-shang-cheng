<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '我要推广' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y flex_colT H_100">
      <img :src="img" class="W_100 H_100 object_fit_cover" />
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
// import shareFrame from "@/components/shareFrame";
import AsyncComputed from "vue-async-computed";
import baseUrl from "@/js/const";
// import { Swipe, SwipeItem, PullRefresh, List, Tab, Tabs } from "vant";
Vue.use(AsyncComputed);
export default {
  components: { viaHeader },
  name: "tab1",
  data() {
    return {
      img: api.pageParam.img,
    };
  },
  asyncComputed: {
    // qrInfo: {
    //   async get() {
    //     const { code, msg, data } = await this.http(baseUrl.qrcodeInfo);
    //     return data;
    //   },
    //   default() {
    //     return {};
    //   },
    // },
  },
  created() {},
  mounted() {},
};
</script> <style  scoped>
</style>
