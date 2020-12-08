<template>
  <div class="VW_100 flex_rowC VH_100 bg_000_5 PB_22">
    <!-- 版本提示 -->
    <div
      class="relative W_70vw fontS_16 H_100vw vs_bg PT_6 flex_colT PT_40 flex_colT flex_items_stretch PLR_4"
    >
      <img
        src="@/image/hong-gb1.png"
        class="VWH_6 absoluteTR"
        v-if="vsInfo.is_force != 1"
        @click="closeFrame()"
        alt
      />
      <div class="absoluteTL ML_12 MT_21 bg_F00020 B_radius_25 PLR_2 color_fff">
        V{{ vsInfo.version }}
      </div>
      <div class="lineH_2 overflow_y flex_grow_1" style="word-wrap: break-word">
        <span class="lineH_4">更新内容:</span>
        <div v-html="vsInfo.update_content || ''"></div>
      </div>
      <div class="fontS_12">更新时间:{{ vsInfo.release_time }}</div>
      <div
        class="bg_FFB838 textC color_fff B_radius_max MTB_2 MB_4 PTB_1"
        @click="renewal"
      >
        {{ schedule != 0 ? schedule + "%" : "更新" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "versionToast",
  data() {
    return {
      schedule: 0,
      vsInfo: {},
    };
  },
  created() {
    this.handleGlobalData("vsInfo");
    // alert(JSON.stringify(this.vsInfo));
  },
  mounted() {},
  methods: {
    // 点击更新
    renewal: function () {
      var that = this;
      if (api.systemType == "android") {
        if (that.schedule == 0) {
          api.toast({
            msg: "下载中，请稍等",
            duration: 5000,
            location: "bottom",
          });
        }
        api.download(
          {
            url: that.vsInfo.download_url,
            report: true,
          },
          function (ret, err) {
            if (ret.state == 0) {
              /* 下载进度 */
              // console.log( ret.percent )
              that.schedule = ret.percent;
            }
            if (ret.state == 1) {
              /* 下载完成 */
              var savePath = ret.savePath;
              // console.log(savePath);
              api.installApp({
                appUri: savePath,
              });
            }
            if (ret.state == 2) {
              that.schedule = 0;
            }
          }
        );
      }
      if (api.systemType == "ios") {
        that.toggurl(that.vsInfo.download_url);
      }
    },
  },
};
</script>

<style>
.vs_bg {
  background: url("../../image/vsbanbei.png") no-repeat 100% 100% /100% 100%;
}
</style>
