<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '余额充值' }"
      :right="{ text: '明细' }"
      @click-right="openWin('tab4-balancedetail')"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_2">
      <div v-show="0 != type">
        <h3 class="font_weight_bold fontS_16">充值金额</h3>

        <input
          class="D_block W_30vw P_2 BB_2_eee"
          type="number"
          v-model="accunt"
          placeholder="请输入金额"
        />
      </div>
      <div class="MT_4">
        <h3 class="font_weight_bold fontS_16">请选择充值方式</h3>
        <div class="PT_2">
          <div
            class="B_1_eee MB_4 flex_row_between P_2 PLR_4 color_999 B_radius_max"
            v-for="(item, index) in listtab"
            :key="index"
            :class="{ ' color_FF0040 b_1_FF0040': type == index }"
            @click="type = index"
          >
            <div class="flex_rowL">
              <img :src="item.icon" class="MR_4 VWH_8" alt="" />
              {{ item.text }}
            </div>
            <div class="iconfont iconzhifuchenggong"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="P_3 BT_1_red"
      :class="0 != type ? 'flex_row_between' : 'flex_rowR'"
    >
      <div class="flex_rowL" v-show="0 != type">
        充值金额
        <span class="color_FF0040 ML_1 fontS_16">￥{{ accunt || 0 }}</span>
      </div>
      <div
        class="bg_FF0040 B_radius_max PLR_6 PTB_1 color_fff"
        @click="openRecge"
      >
        充值
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed);
export default {
  components: { viaHeader },
  name: "balance",
  data() {
    return {
      type: 0,
      accunt: "",
      topBarTextColor: "light",
    };
  },
  created() {},
  computed: {
    listtab() {
      return [
        {
          icon: require("@/image/cardicon.png"),
          text: "官方充值卡充值",
        },
        {
          icon: require("@/image/payicon.png"),
          text: "支付宝充值",
        },

        {
          icon: require("@/image/wxicon.png"),
          text: "微信充值",
        },
      ];
    },
  },
  mounted() {
    this.setTopBarTextColor(() => {
      this.accunt = "";
    });
  },
  methods: {
    openRecge() {
      if (this.type != 0 && this.accunt == "") {
        this.toast("请输入金额");
        return;
      }
      // let type = this.type + 1;
      this.openWin("tab4-cardRecge", {
        type: this.type + 1,
        money: this.accunt || 0,
      });
      // switch (type) {
      //   case 1:
      //     this.openWin("tab4-cardRecge", { type: 1 });
      //     break;
      //   case 2:
      //     this.openWin("tab4-cardRecge", { type: 2 });
      //     break;
      //   case 3:
      //     this.openWin("tab4-cardRecge", { type: 2 });
      //     break;
      //   default:
      //     break;
      // }
    },
  },
};
</script> <style  scoped>
</style>
