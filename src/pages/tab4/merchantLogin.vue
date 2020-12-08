<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '商家登录' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y P_3 H_100">
      <div class="P_3 B_1_000 B_radius_5 bg_eee MTB_4">
        <input type="text" placeholder="手机号/账号" />
      </div>
      <div class="P_3 B_1_000 B_radius_5 bg_eee MTB_4">
        <input type="text" placeholder="请输入密码" />
      </div>
      <div
        class="P_2 textC color_fff MT_10 bg_FF0040"
        @click="toast(`商家登录暂未开放`)"
      >
        登录
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import AsyncComputed from "vue-async-computed";
export default {
  components: { viaHeader },
  name: "merchantLogin",
  data() {
    return { key: "" };
  },
  created() {},
  mounted() {},
  methods: { name() {} },
};
</script> <style  scoped>
</style>
