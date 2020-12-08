<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '兑换记录' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100"></div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import AsyncComputed from "vue-async-computed";
import { Swipe, SwipeItem, PullRefresh, List } from "vant";
Vue.use(AsyncComputed).use(Swipe).use(SwipeItem).use(PullRefresh).use(List);
export default {
  components: { viaHeader },
  name: "exchange",
  data() {
    return { key: "" };
  },
  created() {},
  mounted() {},
  methods: { name() {} },
};
</script> <style  scoped>
</style>
