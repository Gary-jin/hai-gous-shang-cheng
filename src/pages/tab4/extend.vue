<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '我要推广' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y flex_colT H_100">
      <div class="W_70">
        <img :src="qrInfo.thumb" class="W_100 H_100 object_fit_cover" />
      </div>
    </div>
    <!-- <div class="bg_rgba_fff flex_colB flex_items_stretch"> -->
    <div>
      <div class="W_100 bg_rgba_fff">
        <div class="color_666 textC PT_2 flex_rowC">
          <div class="bg_eee W_10vw" style="height: 2px"></div>
          立即分享到
          <div class="bg_eee W_10vw" style="height: 2px"></div>
        </div>
        <div class="flex_row_around PTB_6 W_100">
          <div
            class="flex_colC W_33"
            v-for="(item, index) in navArr"
            @click="goShare(item.config)"
            :key="index"
          >
            <img :src="item.icon" class="VWH_8 flex_shrink_0" alt srcset />
            <span class="color_666 fontS_12 PT_1">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div @click="closeWin()" class="W_100 bg_fff PTB_3 textC BT_1_eee">
        取消
      </div>
    </div>
    <!-- </div> -->
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
// import shareFrame from "@/components/shareFrame";
import AsyncComputed from "vue-async-computed";
import baseUrl from "@/js/const";
// import { Swipe, SwipeItem, PullRefresh, List, Tab, Tabs } from "vant";
Vue.use(AsyncComputed);
export default {
  components: { viaHeader },
  name: "tab1",
  data() {
    return {
      navArr: [
        {
          title: "微信",
          icon: require("@/image/share-2.png"),
          config: "session",
        },
        {
          title: "朋友圈",
          icon: require("@/image/share-4.png"),
          config: "timeline",
        },
        {
          title: "面对面分享",
          icon: require("@/image/share-1.png"),
          config: "fasetofase",
        },
      ],
    };
  },
  asyncComputed: {
    qrInfo: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.qrcodeInfo);
        // data.download_url =
        //   "https://img.alicdn.com/imgextra/i3/4071815945/O1CN01JPbqAq1tmrEF4POMY_!!4071815945.jpg_310x310.jpg";
        // data.thumb =
        //   "https://img.alicdn.com/imgextra/i3/4071815945/O1CN01JPbqAq1tmrEF4POMY_!!4071815945.jpg_310x310.jpg";
        return data;
      },
      default() {
        return {};
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    goShare(type) {
      if (type == "fasetofase") {
        this.openWin("tab4-extend1", { img: this.qrInfo.thumb });
        // this.toast("ddddddddddddd");
      } else {
        this.getSystemAuth("storage", () => {
          this.wxShare(type);
        });
      }
    },
    //微信分享
    async wxShare(type) {
      let imgUrl = await this.download(this.qrInfo.thumb);

      let params = {
        apiKey: "",
        scene: type,
        thumb: "widget://img/sharelogo.png",
        contentUrl: imgUrl,
      };
      // console.log("aaaaaaaaaaa" + JSON.stringify(params));

      var wx = api.require("wxPlus");
      wx.isInstalled((ret, err) => {
        if (ret.installed) {
          wx.shareImage(params, (res, errs) => {
            console.log(JSON.stringify(res));
            console.log(JSON.stringify(errs));
            if (res.status) {
              api.toast({
                msg: "发送成功~",
                duration: 2000,
                location: "bottom",
              });
              // this.shareCallBack(true);
            } else {
              api.toast({
                msg: "发送失败~",
                duration: 2000,
                location: "bottom",
              });
              // this.shareCallBack();
            }
          });
        } else {
          api.toast({
            msg: "没有安装微信,无法进行分享",
            duration: 2000,
            location: "bottom",
          });
        }
      });
    },

    download(url) {
      var that = this;
      return new Promise((resolve, reject) => {
        api.download(
          {
            url: url,
            report: true,
            cache: false,
            allowResume: true,
          },
          function (ret, err) {
            api.hideProgress();
            // console.log(JSON.stringify(ret));
            if (ret.state === 1) {
              resolve(ret.savePath);
            } else {
              // that.toast("下载失败");
            }
          }
        );
      });
    },
  },
};
</script> <style  scoped>
</style>
