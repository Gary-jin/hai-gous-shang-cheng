<template>
  <div
    class="W_50"
    @click="
      openWin('tab0-selfdetail', {
        type: type,
        goods_id: info.id,
      })
    "
  >
    <!-- {{ info }} -->
    <div class="PB_2 flex_colT B_1_eee" v-if="1 == pageType">
      <img
        :src="info.image || ''"
        class="W_100 H_50vw object_fit_cover"
        alt=""
      />
      <div class="text_overflow_1 PT_1 W_44vw textC">{{ info.name }}</div>
      <div class="flex_rowL MTB_1" v-if="1 == type">
        <span class="color_FFF3F5"> {{ info.coin_price }} </span>
        金币
      </div>
      <div
        class="flex_row_between W_100 PLR_1 fontS_12 color_FFF3F5 MTB_1"
        v-if="2 == type"
      >
        <p>可抵扣:{{ info.balance_price }}</p>
        <p>付现金:{{ info.cash_price }}</p>
      </div>
      <div class="color_FF0040 b_1_FF0040 PLR_3 PTB_1 B_radius_max">
        立即兑换
      </div>
    </div>
    <div class="B_1_eee flex_colT flex_items_stretch" v-if="2 == pageType">
      <!-- <img :src="info.image" class="W_100 H_50vw" alt="" /> -->
      <img :src="info.image || ''" class="W_100 H_50vw" alt="" />
      <div class="text_overflow_2 PT_1 PLR_1">{{ info.name }}</div>
      <div
        class="flex_row_between fontS_14 PLR_1 color_FF0040 MTB_1"
        v-if="1 == type"
      >
        <p>金币:{{ info.coin_price }}</p>
      </div>
      <div class="flex_row_between fontS_12 color_FF0040 MTB_1 PLR_1" v-else>
        <p>可抵扣:{{ info.balance_price }}</p>
        <p>付现金:{{ info.cash_price }}</p>
      </div>
      <div class="bg_FE5467 color_fff textC P_1">立即兑换</div>
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
  created() {},
  props: {
    type: {
      type: Number,
      default: 0, //展示模式
    },
    pageType: {
      type: Number,
      default: 1, // 1.金币商城and超级购列表， 2.超级购and金币 搜索
    },
    //商品列表信息
    info: {
      type: Object,
      dafault: {},
    },
  },
};
</script>

<style  scoped>
</style>
