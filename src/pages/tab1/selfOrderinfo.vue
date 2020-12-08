<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '订单详情' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_2">
      <div class="shadow_1 P_2 B_radius_5 flex_row_between">
        <img :src="info.goods_image" class="VWH_12" alt="" />
        <div class="flex_grow_1 ML_2 flex_self_stretch">
          <div class="text_overflow_1 MB_2 W_74vw">
            {{ info.goods_name }}
          </div>
          <p class="color_red" v-if="1 == type">金币：{{ info.coin_price }}</p>
          <p class="color_red" v-else>付现金：{{ info.cash_price }}</p>
        </div>
      </div>
      <div class="shadow_1 B_radius_5 PTB_2 fontS_12 color_101010">
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">订单状态：</div>
          {{ retStatustext(info.status) }}
        </div>
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">订单号：</div>
          {{ info.order_no }}
        </div>
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">邮费：</div>
          ￥{{ info.postage }}
          <span class="ML_2" v-if="1 == type">金币：{{ info.coin_price }}</span>
          <span class="ML_2" v-else>付现金：{{ info.cash_price }}</span>
          <span class="ML_2" v-if="1 != type"
            >扣余额：{{ info.balance_price }}</span
          >
        </div>
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">配送地址：</div>
          <div class="text_overflow_2 W_80 flex_grow_1">
            {{ info.province }}{{ info.city }}{{ info.country
            }}{{ info.detail }}
          </div>
        </div>
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">收货人：</div>
          <span class="flex_grow_1">{{ info.username }}</span>
        </div>
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">联系电话：</div>
          <span class="flex_grow_1">{{ info.mobile }}</span>
        </div>
        <div class="BB_1_eee P_2 flex_rowL">
          <div class="W_20vw flex_self_start">商品名称：</div>
          <div class="flex_grow_1 text_overflow_2 W_70vw">
            {{ info.goods_name }}
          </div>
        </div>
        <div class="BB_1_eee P_2 flex_rowL" v-if="info.remark">
          <div class="W_20vw flex_self_start">购买备注：</div>
          <div class="flex_grow_1 text_overflow_2">
            {{ info.remark }}
          </div>
        </div>
        <div class="MB_6 P_2 flex_rowL">
          <div class="flex_self_start W_20vw">付款方式：</div>
          <div class="" v-if="info.pay_type == ''">
            <div class="flex_rowL MB_2" @click="checked = 1">
              <div class="W_20vw">微信支付</div>
              <span
                class="iconfont fontS_18"
                :class="
                  checked == 1
                    ? 'iconzhifuchenggong color_FD9604'
                    : 'iconnot_Selected-copy'
                "
              ></span>
            </div>
            <div class="flex_rowL" @click="checked = 2">
              <div class="W_20vw">支付宝支付</div>
              <span
                :class="
                  checked == 2
                    ? 'iconzhifuchenggong color_FD9604'
                    : 'iconnot_Selected-copy'
                "
                class="iconfont fontS_18"
              ></span>
            </div>
          </div>
          <div class="" v-else>
            <div class="flex_rowL MB_2">
              <div class="W_20vw">
                {{ info.pay_type == "alipay" ? "支付宝支付" : "微信支付" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- retStatustext(info.order_status) -->
      <div class="color_FD9604 lineH_3 P_2" v-if="info.order_status == 0">
        温馨提示：为确保您的订单得到及时处理，请在
        30分种内完成付款，延迟付款系统将在2小时内 自动取消订单。
      </div>
    </div>
    <div
      class="bg_FF0040 M_2 textC P_2 color_fff B_radius_5"
      v-if="info.order_status == 0"
      @click="payOrder"
    >
      立即付款
    </div>
    <van-popup v-model="show" closeable class="W_80vw B_radius_10 H_100vw">
      <pay-toat :typelx="status" @payseccse="show = false" />
    </van-popup>
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
      key: "",
      show: false,
      order_id: api.pageParam.order_id,
      type: api.pageParam.type,
      info: {},
      checked: 1,
      status: 2,
    };
  },
  //支付方法
  mixins: [payMethods],
  created() {
    this.orderInfo();
  },
  mounted() {},
  methods: {
    //订单详情
    async orderInfo() {
      const { code, msg, data } = await this.http(baseUrl.orderDetail, {
        id: this.order_id,
        type: this.type,
      });
      if (0 == code) {
        this.info = data;
      }
    },
    //支付文案
    retStatustext(status) {
      let str = "";
      if (1 == status) {
        str = "未支付";
      } else if (2 == status) {
        str = "待发货";
      } else {
        str = "已发货 ";
      }
      return str;
    },
    //订单支付
    async payOrder() {
      // this.wxPay(data).then(
      //   (ret) => {
      //     this.show = true;
      //     this.status = 2;
      //   },
      //   (err) => {
      //     this.show = true;
      //     this.status = 1;
      //     console.log(err);
      //   }
      // );
      // return;
      const { code, msg, data } = await this.http(baseUrl.payOrder, {
        order_id: this.order_id,
        type: this.type,
        pay_type: this.checked === 1 ? "wxpay" : "alipay",
      });
      if (0 == code) {
        if (this.checked == 1) {
          this.wxPay(data).then(
            (ret) => {
              this.show = true;
              this.status = 2;
              this.orderInfo();
            },
            (err) => {
              this.show = true;
              this.status = 1;
              // alert(JSON.stringify(err));
            }
          );
        } else {
          // this.(data);
          this.aliPay(data).then(
            (ret) => {
              this.show = true;
              this.status = 2;
              this.orderInfo();
            },
            (err) => {
              this.show = true;
              this.status = 1;
              console.log(err);
            }
          );
        }
      }
    },
  },
};
</script> 

<style  scoped>
.color_FD9604 {
  color: #fd9604;
}
</style>
