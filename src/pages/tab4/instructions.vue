<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '使用说明' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="P_2 overflow_y H_100">
      <div class="shadow_1 MB_3" v-for="(item, index) in ionsInfo" :key="index">
        <div class="P_2 PTB_3" @click="item.falg = !item.falg">
          {{ item.name }}
        </div>
        <div class="P_2 BT_1_eee" v-if="item.falg">
          <div class="" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import AsyncComputed from "vue-async-computed";
import baseUrl from "@/js/const";
Vue.use(AsyncComputed);
export default {
  components: { viaHeader },
  name: "instructions",
  data() {
    return { key: "", list: [{ falg: false }, { falg: false }] };
  },
  created() {},
  asyncComputed: {
    ionsInfo: {
      async get() {
        // alert(1111111111111);
        const { code, msg, data } = await this.http(baseUrl.instructions);
        let arr = data.map((item) => {
          item.falg = false;
          return item;
        });
        console.log(JSON.stringify(arr));
        return arr;
        // return data.map(item=>{item.})
      },
      default() {
        return [];
      },
    },
  },
  mounted() {},
  methods: { name() {} },
};
</script> <style  scoped>
</style>
