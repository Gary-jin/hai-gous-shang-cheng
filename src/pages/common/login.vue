<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <div class="P_10 PT_20 overflow_y H_100 flex_grow_1">
      <h1 class="font_weight_bolder fontS_16">Hi,</h1>
      <h3 class="font_weight_bolder fontS_16 MTB_1">欢迎登录海购商城！</h3>
      <h3 class="font_weight_bolder fontS_16 MB_8">请填写以下登录信息</h3>
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
            v-model="mobile"
            type=" number"
            placeholder="请输入您的手机号"
          />
        </div>
        <div class="textR color_FF0040 MT_2">
          <span @click="openWin('common-regin')"> 注册 </span>
        </div>
      </div>
      <div
        @click="comitLogin"
        class="bg_FF0040 W_30vw M_auto B_radius_max color_fff textC PTB_2"
      >
        登录
      </div>
    </div>
    <div class="flex_rowC M_3">
      登录及代表同意
      <span class="color_FF0040"> 《海购商城用户协议》 </span>
    </div>
  </div>
</template>
<script>
// import baseUrl from "@/js/const";
import tool from "@/js/tool";
import logincommon from "@/js/common/logincommon";
export default {
  name: "login",
  data() {
    return { topBarTextColor: "dark", mobile: "" };
  },
  mixins: [tool, logincommon],
  created() {
    this.initAd();
  },
  mounted() {
    this.setTopBarTextColor(() => {
      // alert("11111111111111111");
      this.mobile = "";
      this.closeWin("basic-home");
    });
  },

  methods: {
    //初始化返回退出
    initAd: function () {
      this.$ac.addEventListener(
        {
          name: "keyback",
        },
        (ret, err) => {
          this.dbClickkExit();
        }
      );
    },
  },
};
</script> <style  scoped>
</style>
