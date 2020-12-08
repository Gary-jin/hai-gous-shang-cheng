<template>
  <div :class="typelist" @click="openGoodInfo">
    <div v-if="1 == typeGood" class="P_2 BB_1_eee flex_rowL flex_items_stretch">
      <img :src="info.thumb" class="VWH_36" alt="" />
      <div class="ML_2 flex_flex1 flex_col_between flex_items_stretch">
        <div class="relative text_overflow_2 W_100">
          <!-- <div
            style="top: 0; left: 0"
            class="bg_EA3D5A PLR_2 lineH_2 textC absolute B_radius_5 color_fff"
          >
            {{ retshopTyep(info.shoptype) }}
          </div> -->
          <span class="D_inline_block bg_EA3D5A B_radius_5 color_fff PLR_1 MR_1 fontS_12">
            {{ retshopTyep(info.shoptype) }}
          </span>
          {{ info.goods_name }}
          <!-- <p class="text_overflow_2 W_100 text_indent_4 lineH_4 D_inline_block">
            {{ info.goods_name }}
          </p> -->
        </div>

        <!-- <div class="flex_row_between flex_items_start">
          <div>
            <div class="color_FE5467 flex_rowL fontS_24">
              <span class="fontS_16 MT_1">￥</span>
              <h4>{{ info.shop_price }}</h4>
            </div>
          </div>
          <div class="color_FFF3F5">
            <p class="text_decoration_line-through">￥{{ info.sale_price }}</p>
            <p class="fontS_10 textR">已售{{ info.month_sale }}</p>
          </div>
        </div> -->

        <div class="flex_row_between color_FFF3F5 fontS_12">
          <span class="text_decoration_line-through"> {{ retshopTyep(info.shoptype) }}价￥{{ info.sale_price }}</span>
          <span>已售{{ info.month_sale }}</span>
        </div>
        <div class="flex_row_between color_FE5467 fontS_14 MT_1 ">
          <div class="couponmoneyBox">￥{{info.couponmoney}}</div>
          <div>付现金￥{{ info.shop_price }}</div>
        </div>

        <div class="bg_FE5467 B_radius_10 flex_rowC PTB_2 MT_2 color_fff fontS_14">
          立即兑换
        </div>
      </div>
    </div>

    <div class="D_inline_block relative W_34vw PR_2" v-if="2 == typeGood">
      <div
        style="top: 0; left: 0"
        class="bg_EA3D5A PLR_2 lineH_3 textC absolute B_radius_5 color_fff"
      >
        {{ retshopTyep(info.shoptype) }}
      </div>
      <img :src="info.thumb" class="W_100" alt="" />
      <div class="text_overflow_2" style="white-space: normal">
        {{ info.goods_name }}
      </div>
      <div class="flex_row_between">
        <h4 class="color_FE5467 font_weight_bold">￥{{ info.shop_price }}</h4>
        <div
          class="bg_EA3D5A PLR_1 fontS_12 lineH_4 textC B_radius_5 color_fff"
        >
          {{ info.couponmoney }}元券
        </div>
      </div>
    </div>

    <div class="W_100 P_1 PB_2" v-if="3 == typeGood">
      <img :src="info.thumb" class="VWH_48" alt="" />
      <!-- <div class="flex_row_between">
        <div class="flex_rowL">
          <div class="color_FE5467 flex_rowL fontS_18">
            <span>￥</span>
            <h4>{{ info.shop_price }}</h4>
          </div>
          <div
            class="bg_EA3D5A PLR_1 lineH_4 ML_1 textC B_radius_5 color_fff fontS_12"
          >
            券后
          </div>
        </div>
        <div class="color_FFF3F5 fontS_12">
          <p class="text_decoration_line-through">￥{{ info.sale_price }}</p>
          <p>已售{{ info.month_sale }}</p>
        </div>
      </div> -->

        <div class="flex_row_between color_FFF3F5 fontS_12 MT_1">
          <span class="text_decoration_line-through"> {{ retshopTyep(info.shoptype) }}价￥{{ info.sale_price }}</span>
          <span>已售{{ info.month_sale }}</span>
        </div>
        <div class="flex_row_between color_FE5467 fontS_12  MT_2">
          <div class="couponmoneyBox3">￥{{info.couponmoney}}</div>
          <div>付现金￥{{ info.shop_price }}</div>
        </div>

      <div
        class="bg_FE5467 B_radius_10 flex_rowC PTB_2 MT_1 color_fff fontS_14"
      >
        立即兑换
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // key: value
    };
  },
  computed: {
    typelist() {
      let str = "";
      switch (this.typeGood) {
        case 1:
          str = "";
          break;
        case 2:
          str = "D_inline_block";
          break;
        case 3:
          str = "W_50";
          break;

        default:
          break;
      }
      return str;
      //   return this.data
    },
  },
  props: {
    typeGood: {
      type: Number,
      default: 1,
    },
    info: {
      type: Object,
      default: {},
    },
  },
  methods: {
    retshopTyep(type) {
      let str = "";
      switch (type) {
        case "tmall":
          str = "天猫";
          break;
        case "taobao":
          str = "淘宝";
          break;
        case "jd":
          str = "京东";
          break;
        case "pdd":
          str = "拼多多";
          break;
      }
      return str;
    },
    openGoodInfo() {
      this.openWin("tab0-goodsdetail", {
        goods_id: this.info.goods_id,
        shoptype: this.info.shoptype,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.couponmoneyBox{
  width: 95px;
  background: url(~@/image/couponmoney.png) 0 0 no-repeat;
  background-size: 100% 100%;
  padding-left: 39px;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
}
.couponmoneyBox3{
  width: 78px;
  background: url(~@/image/couponmoney.png) 0 0 no-repeat;
  background-size: 100% 100%;
  padding-left: 33px;
}
</style>