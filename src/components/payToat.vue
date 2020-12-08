<template>
  <div>
    <div
      class="P_4 W_80vw H_100vw flex_colT flex_items_stretch"
      v-if="1 == typelx"
    >
      <div class="flex_grow_1 overflow_y flex_colT">
        <div class="MT_8 fontS_20">支付结果</div>
        <div class="MTB_4 color_999">支付失败：您取消了当前支付。</div>
        <img
          :src="require('@/image/iconfail.png')"
          class="B_radius_max VWH_30"
          alt=""
        />
      </div>
      <div
        class="W_100 bg_FF0040 P_2 color_fff textC"
        @click="$emit('payseccse')"
      >
        确定
      </div>
    </div>
    <!-- <div class="flex_colT P_4" v-else> -->
    <div class="P_4 W_80vw H_100vw flex_colT flex_items_stretch" v-else>
      <div class="flex_grow_1 overflow_y flex_colT">
        <div class="MT_8 fontS_20">支付结果</div>
        <div class="color_999 MT_2">支付成功</div>
        <img
          :src="require('@/image/iconok.png')"
          class="B_radius_max MT_2 VWH_30"
          alt=""
        />
      </div>
      <div
        class="W_100 bg_FF0040 P_2 color_fff textC"
        @click="$emit('payseccse')"
      >
        确定
      </div>
      <!-- <div class="MT_10 flex_row_between W_100">
        <div class="W_100 bg_FF0040 P_2 W_30 color_fff textC MR_4">
          查看充值记录
        </div>
        <div class="W_100 B_1_eee P_2 W_30 textC ML_4">充值</div>
      </div> -->
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
  props: {
    typelx: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>