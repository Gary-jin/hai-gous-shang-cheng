<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '充值' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="P_2 overflow_y H_100">
      <div class="shadow_1 P_3" v-if="1 == pageType">
        <h4 class="lineH_4 PTB_2">您充值的手机号码是：{{ userinfo.mobile }}</h4>
        <div class="PTB_2">
          <h4 class="PB_2">充值卡卡号：</h4>
          <input
            class="D_block P_2 W_100 B_1_000 B_radius_5"
            type="text"
            v-model="account"
            placeholder="请输入你的卡号"
          />
        </div>
        <div class="PTB_2">
          <h4 class="PB_2">充值卡密码：</h4>
          <input
            type="password"
            placeholder="请输入你的密码"
            v-model="password"
            class="D_block P_2 W_100 B_1_000 B_radius_5"
          />
        </div>
        <div class="bg_FF0040 color_fff P_2 textC MT_5" @click="carmiRecharge">
          确认充值
        </div>
      </div>
      <div class="shadow_1 P_3 MT_5" v-else>
        <div class="lineH_5">
          <h3>您手机号码是：{{ userinfo.mobile }}</h3>
          <h3>
            充值金额： <span class="color_FF0040">￥{{ money }}</span>
          </h3>
          <h3>到账金额：￥{{ money }}</h3>
          <h3>到账金币：{{ money }}</h3>
        </div>

        <div class="bg_FF0040 color_fff P_2 textC MT_20" @click="rechargePay">
          确认充值
        </div>
      </div>
    </div>
    <van-popup v-model="show" closeable class="B_radius_10">
      <template v-if="1 == type">
        <div class="P_4 W_80vw H_100vw flex_colT flex_items_stretch">
          <div class="flex_grow_1 overflow_y flex_colT">
            <div class="MT_4 fontS_20">支付结果</div>
            <div class="MTB_4 color_999">支付失败：您取消了当前支付。</div>
            <img
              :src="require('@/image/iconfail.png')"
              class="B_radius_max"
              alt=""
            />
          </div>
          <div
            class="W_100 bg_FF0040 P_2 color_fff textC B_radius_10"
            @click="show = false"
          >
            确定
          </div>
        </div>
      </template>
      <template v-else>
        <div class="P_4 W_80vw H_100vw flex_colT flex_items_stretch">
          <div class="flex_grow_1 overflow_y flex_colT">
            <div class="MT_4 fontS_20">支付结果</div>
            <div class="color_999 MT_2">充值成功</div>
            <img
              :src="require('@/image/iconok.png')"
              class="B_radius_max MT_6"
              alt=""
            />
          </div>
          <div
            class="W_100 bg_FF0040 P_2 color_fff textC B_radius_10"
            @click="show = false"
          >
            确定
          </div>
        </div>
      </template>
    </van-popup>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
import payMethods from "@/js/common/payMethods";
import { Popup } from "vant";
Vue.use(Popup);
export default {
  components: { viaHeader },
  name: "cardRecge",
  data() {
    return {
      show: false,
      type: 2, //支付状态 2 成功  1 失败
      pageType: api.pageParam.type || 1,
      account: "",
      password: "",
      userinfo: {},
      money: api.pageParam.money || 0,
    };
  },
  mixins: [payMethods],
  created() {
    this.handleGlobalData("userinfo");
    // alert(api.pageParam.type);
  },
  mounted() {},
  methods: {
    //卡密充值
    async carmiRecharge() {
      const { code, msg, data } = await this.http(baseUrl.carmiRecharge, {
        account: this.account,
        password: this.password,
      });
      if (0 == code) {
        this.show = true;
        this.type = 2;
        api.sendEvent({name: "payOver"});
        setTimeout(()=>{
          api.closeToWin({name: "basic-home"});
          this.show = false
        },1000)
      } else {
        this.toast(msg);

        // this.show = true;
        // this.type = 1;
      }
    },
    //webnet支付宝|微信支付
    async rechargePay() {
      const { code, msg, data } = await this.http(baseUrl.rechargePay, {
        pay_type: this.pageType == 2 ? "alipay" : "wxpay",
        money: this.money,
      });
      // this.toast(msg)
      if (0 == code) {
        if (this.pageType == 2) {
          this.aliPay(data).then(
            (ret) => {
              this.type = 2;
              this.show = true;
              api.sendEvent({name: "payOver"});
            },
            (err) => {
              this.type = 1;
              this.show = true;
              // console.log(err);
            }
          );
        } else {
          // this.wxPay();
          this.wxPay(data).then(
            (ret) => {
              this.type = 2;
              this.show = true;
              api.sendEvent({name: "payOver"});
            },
            (err) => {
              this.type = 1;
              this.show = true;
              // console.log(err);
            }
          );
          // wxPay
        }
      }
    },

    //充值
    reset() {
      this.show = false;
      if (1 == this.pageType) {
        this.account = "";
        this.password = "";
      } else {
        this.show = false;
      }
    },
  },
};
</script> <style  scoped>
</style>
