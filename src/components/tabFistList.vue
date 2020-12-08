<template>
  <div class="P_2 BB_1_eee flex_rowL flex_items_start">
    <img :src="retSketch(200, 200)" class="VWH_36" alt="" />
    <div class="ML_2">
      <div class="relative">
        <div
          style="top: 0; left: 0"
          class="bg_EA3D5A W_16vw PLR_2 PTB_1 textC absolute B_radius_5 color_fff"
        >
          天猫
        </div>
        <p class="text_overflow_2 text_indent_5 lineH_4">
          冰希黎极地之光女士香冰希黎极地之光女士香冰希黎极地之光女士香
        </p>
      </div>
      <div class="flex_row_between flex_items_start">
        <div>
          <div class="color_FE5467 flex_rowL fontS_24">
            <span class="fontS_16 MT_1">￥</span>
            <h4>120</h4>
          </div>
        </div>
        <div class="color_FFF3F5">
          <p class="text_decoration_line-through">￥300</p>
          <p>已售29</p>
        </div>
      </div>
      <div
        class="bg_FE5467 B_radius_10 flex_rowC PTB_2 MT_2 color_fff fontS_14"
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
      type: 1,
    };
  },
  created() {},
  props: {
    // propName: {
    // 	type: Number,
    // 	default:
    // },
  },
};
</script>

<style  scoped>
</style>
