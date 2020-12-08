<template>
  <div class="flex_rowL PTB_2 bg_fff">
    <div
      class="flex_rowC W_25"
      :class="{ color_FF0040: sort == 0 }"
      @click="sort = 0"
    >
      <p>综合</p>
      <p class="flex_colT color_FF0040" style="color: transparent">
        <span
          class="iconfont iconxiangshang1 relative"
          style="bottom: -4px"
        ></span>
        <span class="iconfont iconxiangxia relative" style="top: -4px"></span>
      </p>
    </div>
    <div class="flex_rowC W_25" @click="sort == 2 ? (sort = 1) : (sort = 2)">
      <p :class="{ color_FF0040: sort == 1 || sort == 2 }">原价</p>
      <p class="flex_colT">
        <span
          class="iconfont iconxiangshang1 relative fontS_12"
          :class="{ color_FF0040: sort == 1 }"
          style="bottom: -3px"
        ></span>
        <span
          class="iconfont iconxiangxia relative fontS_12"
          :class="{ color_FF0040: sort == 2 }"
          style="top: -3px"
        ></span>
      </p>
    </div>
    <div class="flex_rowC W_25" @click="sort == 4 ? (sort = 3) : (sort = 4)">
      <p :class="{ color_FF0040: sort == 3 || sort == 4 }">抵扣券</p>
      <p class="flex_colT">
        <span
          class="iconfont iconxiangshang1 relative fontS_12"
          :class="{ color_FF0040: sort == 3 }"
          style="bottom: -3px"
        ></span>
        <span
          class="iconfont iconxiangxia relative fontS_12"
          :class="{ color_FF0040: sort == 4 }"
          style="top: -3px"
        ></span>
      </p>
    </div>
    <div class="flex_rowC W_25" @click="sort == 6 ? (sort = 5) : (sort = 6)">
      <p :class="{ color_FF0040: sort == 5 || sort == 6 }">销量</p>
      <p class="flex_colT">
        <span
          class="iconfont iconxiangshang1 relative fontS_12"
          :class="{ color_FF0040: sort == 5 }"
          style="bottom: -3px"
        ></span>
        <span
          class="iconfont iconxiangxia relative fontS_12"
          :class="{ color_FF0040: sort == 6 }"
          style="top: -3px"
        ></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // key: value
      sort: 0,
    };
  },
  created() {},
  watch: {
    sort: function (val) {
      // console.log(JSON.stringify(this.sortObj));
      this.$emit("sort", this.sortObj);
    },
  },
  props: {
    // propName: {
    // 	type: Number,
    // 	default:
    // },
  },
  computed: {
    sortObj() {
      let obj = {
        order: "",
        sort: "",
      };
      if (this.sort != 0) {
        //全部

        if (this.sort % 2 == 0) {
          //降序
          obj.order = "desc";
        } else {
          obj.order = "asc";
        }
        if (this.sort == 1 || this.sort == 2) {
          obj.sort = "price";
        } else if (this.sort == 3 || this.sort == 4) {
          obj.sort = "commi";
        } else if (this.sort == 5 || this.sort == 6) {
          obj.sort = "sale";
        }
      } else {
        obj.sort = "";
        obj.order = "";
      }
      return obj;
    },
  },
};
</script>

<style scoped>
</style>
