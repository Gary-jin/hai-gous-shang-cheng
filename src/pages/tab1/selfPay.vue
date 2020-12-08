<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '订单支付' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_3 color_999">
      <div class="P_3 shadow_1">
        <div>您手机号码是：15689785423</div>
        <div class="MTB_2">订单编号：1234567896746321</div>
        <div>支付金额：<span class="color_FF0040">￥10.00</span></div>
        <div class="PTB_2 color_fff bg_FF0040 textC MT_10" @click="show = true">
          去支付
        </div>
      </div>
    </div>
    <van-popup v-model="show" closeable class="W_80vw B_radius_10 H_100vw">
      <pay-toat :typelx="2" @payseccse="show = false" />
    </van-popup>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import payToat from "@/components/payToat.vue";
import { Popup } from "vant";
Vue.use(Popup);
export default {
  components: { viaHeader, payToat },
  name: "selfPay",
  data() {
    return { show: false };
  },
  created() {},
  mounted() {},
  methods: { name() {} },
};
</script> <style  scoped>
</style>
