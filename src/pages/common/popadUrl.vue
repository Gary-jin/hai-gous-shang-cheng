<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <section style="height: 100%">
        <iframe :src="webUrl" class="W_100 H_100"></iframe>
      </section>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import payToat from "@/components/payToat.vue";
import payMethods from "@/js/common/payMethods";
import { Popup } from "vant";
Vue.use(Popup);
import baseUrl from "@/js/const";
export default {
  components: { viaHeader, payToat },
  name: "selfOrder",
  data() {
    return {
      webUrl: api.pageParam.webUrl,
    };
  },
  //支付方法
  mixins: [payMethods],
  created() {

  },
  mounted() {},
  methods: {

  },
};
</script> 

<style  scoped>
</style>
