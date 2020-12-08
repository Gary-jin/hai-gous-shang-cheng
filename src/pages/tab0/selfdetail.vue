<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '商品详情' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100">
      <!-- <van-swipe
        class="relative z_index_100"
        :autoplay="2000"
        indicator-color="white"
      >
         @click="toggurl(item.jump_url)" 
        <van-swipe-item :key="index" v-for="(item, index) in 2">
          <img
            :src="retSketch(375, 400)"
            alt
            class="W_100 H_100vw object_fit_cover"
          />
        </van-swipe-item>
      </van-swipe>-->
      <div class="W_100vw H_100vw">
        <img :src="info.image" alt class="W_100vw H_100vw object_fit_cover" />
      </div>
      <div class="P_2">
        <div class="flex_rowL relative">
          <!-- <div
            class="absoluteTL D_inline_block bg_EA3D5A W_16vw PLR_2 PTB_1 textC B_radius_5 color_fff"
          >
            天猫 
          </div>-->
          <div class="text_overflow_2 MT_1 lineH_3">
            {{ info.name }}
          </div>
        </div>
        <div class="flex_row_between" v-if="1 == type">
          <span class="color_FF0040"> 金币 ：{{ info.coin_price }} </span>
          <span class="fontS_12 color_999">剩余数量：{{ info.number }}</span>
        </div>

        <div class="flex_row_between" v-else>
          <div class="color_FF0040 flex_rowL">
            <span> 可抵扣:{{ info.balance_price }} </span>
            <span class="ML_1" v-if="info.cash_price">
              付现金:{{ info.cash_price }}
            </span>
          </div>
          <span class="fontS_12 color_999">剩余数量：{{ info.number }}</span>
        </div>
      </div>
      <div class="flex_rowC PLR_2 PTB_2 BT_6_eee">
        <p>商品详情</p>
      </div>
      <div class="P_2 MT_2" v-html="info.content"></div>
    </div>

    <div
      class="flex_rowL color_fff bg_FF0040 PTB_2 flex_rowC"
      @click="isAddress"
    >
      立即兑换
    </div>
    <van-dialog v-model="defalg" show-cancel-button @confirm="paytext">
      <div class="bg_FF0040 textC PTB_2 color_fff">请输入商品备注</div>
      <div class="P_2">
        <textarea
          name=""
          placeholder="请输入商品备注"
          v-model="context"
          class="D_block bg_f2f2f2 W_100 H_30vw P_2 B_radius_10"
        ></textarea>
      </div>
      <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
    </van-dialog>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
import { Swipe, SwipeItem, PullRefresh, List, Dialog } from "vant";
Vue.use(Swipe).use(SwipeItem).use(Dialog).use(PullRefresh).use(List);
export default {
  components: { viaHeader },
  name: "goodsdetail",
  data() {
    return {
      defalg: false,
      type: api.pageParam.type,
      goods_id: api.pageParam.goods_id,
      info: {},
      context: "",
    };
  },
  created() {
    this.initAd();
  },
  methods: {
    initAd() {
      this.goodInfo();
      //离开屏幕的事件
      this.$ac.addEventListener(
        {
          name: "viewdisappear",
        },
        (ret, err) => {}
      );
      //

      //Window 显示到屏幕的事件
      api.addEventListener(
        {
          name: "viewappear",
        },
        (ret, err) => {}
      );
    },
    //商品详情
    async goodInfo() {
      const { code, msg, data } = await this.http(baseUrl.goodsDetail, {
        type: this.type,
        goods_id: this.goods_id,
      });
      if (0 == code) {
        this.info = data;
      }
    },
    //检测是否填写收货地址
    async isAddress() {
      const { code, msg, data } = await this.http(baseUrl.isAddress);
      // this.toast(msg);
      if (0 == code) {
        this.payToast();
      } else if (99 == code) {
        this.openWin("tab4-shippingAddress");
        // this.toast(msg);
      } else {
        this.toast(msg);
      }
    },
    //创建批注
    paytext() {
      this.createOrder();
    },
    //提示支付
    payToast() {
      let str;
      if (1 == this.type) {
        //金币
        str = `您即将花费${this.info.coin_price}金币`;
      } else {
        str = `你即将花费${this.info.balance_price}兑换该商品`;
      }
      Dialog.confirm({
        title: "",
        message: str,
      })
        .then(() => {
          if (1 == this.info.is_remarks) {
            //是否批注
            this.defalg = true;
          } else {
            this.createOrder();
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    //创建订单
    async createOrder() {
      const { code, msg, data } = await this.http(baseUrl.createCoinOrder, {
        goods_id: this.goods_id,
        type: this.type,
        remark: this.context,
      });
      this.toast(msg);
      if (0 == code) {
        // [] = ...data
        this.openWin("tab1-selfOrderinfo", {
          type: this.type,
          order_id: data.order_id,
        });
        // this.openWin("tab1-selfOrderinfo", {
        //   orderInfo: data,
        //   type: this.type,
        //   remark: this.context,
        // });
      }
    },
  },
};
</script> <style  scoped>
</style>
