<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '返回登录' }"
      class="flex_shrink_0"
    ></via-header>
    <div class="PLR_10 PT_4 overflow_y H_100 flex_grow_1">
      <h1 class="font_weight_bold fontS_16">Hi,</h1>
      <h3 class="font_weight_bold fontS_16 MTB_1">欢迎注册海购商城！</h3>
      <h3 class="font_weight_bold fontS_16 MB_8">请填写以下注册信息</h3>
      <div class="MB_14">
        <div class="flex_rowL">
          <img
            :src="require('@/image/logoLogin.png')"
            class="VWH_6 MR_2 MB_1"
            alt=""
          />
          手机
        </div>
        <div class="BB_1_eee P_3">
          <input
            type=" number "
            v-model="mobile"
            placeholder="请输入您的手机号"
          />
        </div>
      </div>
      <div
        @click="comitLogin"
        class="bg_FF0040 W_30vw M_auto B_radius_max color_fff textC PTB_2"
      >
        注册
      </div>
    </div>
    <div class="flex_rowC M_3">
      注册及代表同意
      <span class="color_FF0040"> 《海购商城用户协议》 </span>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import logincommon from "@/js/common/logincommon";
export default {
  components: { viaHeader },
  name: "regin",
  data() {
    return { key: "", topBarTextColor: "dark", mobile: "" };
  },
  mixins: [logincommon],
  created() {},
  mounted() {},
  methods: {},
};
</script> <style  scoped>
</style>
