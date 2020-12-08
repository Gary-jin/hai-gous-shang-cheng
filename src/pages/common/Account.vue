<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '账户认证' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_3 PT_6">
      <div class="bg_f2f2f2 B_1_eee P_2 B_radius_5">
        <input type="text" v-model="code" placeholder="请输入验证码" />
      </div>
      <div class="textR MT_1 flex_rowR">
        <span class="color_FF0040">{{ downCount }}s</span> 后可再次操作
        <span class="color_FF0040" v-if="downCount == 0" @click="retsetSend"
          >重新发送</span
        >
      </div>
      <div
        class="bg_FF0040 MT_16 B_radius_5 P_2 color_fff textC"
        @click="mobilelogin"
      >
        登录
      </div>
      <div class="MT_2 color_999 fontS_12">
        该号码已经在其他手机上绑定，如需重新绑定，请注意
        接收短信验证，输入收到的验证码！
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
export default {
  components: { viaHeader },
  name: "Account",
  data() {
    return {
      topBarTextColor: "light",
      downCount: 60,
      mobile: api.pageParam.mobile,
      code: "",
    };
  },
  created() {
    this.retsetSend();
  },
  mounted() {
    this.setTopBarTextColor(() => {
      this.downCount = 60;
    });
  },
  methods: {
    //验证码登录
    async mobilelogin() {
      try {
        const { code, msg, data } = await this.http(baseUrl.mobilelogin, {
          mobile: this.mobile,
          code: this.code,
          device_id: api.deviceId,
        });
        if (0 == code) {
          this.toast("登录中~");
          this.mobile = "";
          this.setStorage("tokenInfo", { token: data.userinfo.token });
          setTimeout(() => {
            this.openWin("basic-home");
          }, 500);
        } else {
          this.toast(msg);
        }
      } catch (error) {}
    },
    //重新发送
    async retsetSend() {
      let that = this;
      if (this.downCount == 0) {
        const { code, msg, data } = await this.http(baseUrl.send, {
          mobile: this.mobile,
        });
        if (0 == code) {
          this.toast(msg);
          timeOut();
        }
      } else {
        // let
        timeOut();
      }
      function timeOut() {
        let temFn = setInterval(() => {
          if (that.downCount > 0) {
            that.downCount--;
          } else {
            clearInterval(temFn);
          }
        }, 1000);
        // let
      }
    },
  },
};
</script> <style  scoped>
</style>
