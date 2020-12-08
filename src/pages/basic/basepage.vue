<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :left="{text:'兑换专区'}"
      :center="{text:''}"
      :right="{text:'兑换记录'}"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100">
		
    </div>
  </div>
</template>

<script>
import viaHeader from "@/components/header.vue";
import AsyncComputed from "vue-async-computed";
import {
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
} from "vant";
Vue.use(AsyncComputed)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
export default {
  components: { viaHeader },
  name: "tab1",
  data() {
    return {
      key: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    name() {},
  },
};
</script>

<style  scoped>
</style>