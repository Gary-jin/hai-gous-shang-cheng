<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      :left="{ text: '' }"
      :center="{ text: '一键加油' }"
      class="color_fff bg_1E72FF flex_shrink_0"
    ></via-header>
    <div class="bg_1E72FF flex_rowC color_fff PTB_3 PB_8">
      <span class="iconfont icondingwei"></span>
      <p>河南省郑州市二七区升龙城B座滴滴滴</p>
    </div>
    <div class="relative">
      <div
        style="top: -8vw; background: #fff"
        class="flex_row_between color_999 absolute W_90vw ML_4 box_sizingb PTB_2 B_1_eee B_radius_10"
      >
        <div class="W_50 BR_1_eee font_weight_bold color_000 PTB_3 textC">
          加油
        </div>
        <div class="W_50 textC">我的</div>
      </div>
    </div>
    <div class="MT_10"></div>
    <div
      class="P_2 PLR_6 flex_row_between BB_1_eee"
      style="border-color: #d1e2ff"
    >
      <div class="flex_rowL">
        92#<span class="iconfont iconxiangxia"></span>
      </div>
      <div class="flex_rowL">
        距离优先<span class="iconfont iconxiangxia"></span>
      </div>
    </div>
    <div class="overflow_y PLR_2 H_100">
      <div class="B_1_eee P_2 PLR_3 color_666 fontS_12 B_radius_10 MT_2">
        <div>团油合作加油站（淮河路站）</div>
        <div class="flex_rowL MT_1">
          <span class="iconfont icondingwei"></span>
          大学路与长江路交叉口南200米西侧
        </div>
        <div class="flex_row_between">
          <div class="flex_rowL">
            <div class="flex_rowL">
              <span class="fontS_16 color_FF0040"> ￥12 </span>
              <span class="color_F25D15 MLR_1"> 已降￥0.03 </span>
            </div>
            <div class="color_999 text_decoration_line-through">
              国标价:￥5.5
            </div>
          </div>

          <div class="bg_F25D15 B_radius_max PTB_2 PLR_3 color_fff">1.83km</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import viaHeader from "@/components/header.vue";

export default {
  components: { viaHeader },

  name: "tab2",
  data() {
    return {
      key: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    initAd() {},
  },
};
</script>

<style  scoped>
.bg_1E72FF {
  background: #1e72ff;
}
.bg_F25D15 {
  background: #f25d15;
}
.color_F25D15 {
  color: #f25d15;
}
</style>