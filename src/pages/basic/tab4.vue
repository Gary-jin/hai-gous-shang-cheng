<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100 bg_f2f2f2 overflow_y">
    <!-- <van-pull-refresh v-model="downLoading" @refresh="refresh"> -->
    <div class="H_54vw flex_colC bgtop color_fff">
      <img
        @click="editAvatar"
        :src="usInfo.avatar"
        alt=""
        class="VWH_24 B_radius_max B_3_fff"
      />
      <span class="MT_2">账号：{{ usInfo.mobile }}</span>
      <!-- <div @click="openWin('common-login')">登录 测试使用</div> -->
    </div>
    <div class="bg_fff flex_row_between PTB_2">
      <div
        @click="
          openWin('tab4-balancedetail', { title: '余额明细', type: 'yue' })
        "
        class="W_50 flex_colC PTB_2 BR_1_eee"
      >
        <h3 class="color_FF0040 fontS_18 font_weight_bold">
          {{ usInfo.money || 0 }}
        </h3>
        <span>余额</span>
      </div>
      <div
        @click="
          openWin('tab4-balancedetail', { title: '金币明细', type: 'gard' })
        "
        class="W_50 flex_colC PTB_2"
      >
        <h3 class="color_FF0040 fontS_18 font_weight_bold">
          {{ usInfo.score || 0 }}
        </h3>
        <span>金币</span>
      </div>
    </div>
    <div class="bg_fff MTB_2 color_999 P_2 flex_row_between">
      <div
        class="W_25 flex_colC"
        v-for="(item, index) in tab4List.first"
        :key="index"
        @click="item.fn()"
      >
        <img :src="item.img" alt="" class="VWH_10 MB_2" />
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div class="  ">
      <div
        class="PLR_6 PTB_2 bg_fff flex_row_between BB_1_eee"
        @click="flagShow = !flagShow"
      >
        <div class="flex_rowL">
          <img
            :src="require('@/image/tablist2_1.png')"
            alt=""
            class="VWH_8 MR_2"
          />
          订单管理
        </div>
        <span class="iconfont iconjiantou"></span>
      </div>
      <div class="MB_2 bg_fff" v-show="flagShow">
        <div
          v-for="(item, index) in orderlist"
          @click="item.fn()"
          :key="index"
          class="PLR_6 PL_12 PTB_2 flex_row_between BB_1_eee"
        >
          <div class="flex_rowL">
            <img :src="item.img" alt="" class="VWH_8 MR_2" />
            {{ item.text }}
          </div>
          <span class="iconfont iconjiantou"></span>
        </div>
      </div>
    </div>
    <div class="bg_fff MB_2">
      <div
        :class="{ BB_1_eee: 3 != index }"
        class="PLR_6 PTB_2 flex_row_between"
        v-for="(item, index) in tab4List.two"
        :key="index"
        @click="item.fn()"
      >
        <div class="flex_rowL">
          <img :src="item.img" alt="" class="VWH_8 MR_2" />
          {{ item.text }}
        </div>
        <span class="iconfont iconjiantou"></span>
      </div>
    </div>
    <div class="bg_fff MB_2">
      <div
        :class="{ BB_1_eee: 3 != index }"
        class="PLR_6 PTB_2 flex_row_between"
        v-for="(item, index) in tab4List.three"
        :key="index"
        @click="item.fn()"
      >
        <div class="flex_rowL">
          <img :src="item.img" alt="" class="VWH_8 MR_2" />

          {{ item.text }}
        </div>
        <span class="iconfont iconjiantou"></span>
      </div>
    </div>
    <div
      class="bg_FF0040 PTB_2 color_fff textC M_3 MT_8 B_radius_10"
      @click="loginOut"
    >
      退出登录
    </div>
    <!-- </van-pull-refresh> -->
  </div>
</template>
<script>
import { ip, default as baseUrl } from "@/js/const";
import AsyncComputed from "vue-async-computed";
import { Dialog, Toast, PullRefresh } from "vant";
Vue.use(AsyncComputed).use(Dialog).use(PullRefresh);
export default {
  name: "tab2",
  data() {
    return {
      key: "",
      flagShow: false,
      downLoading: "",
      downLoading: false,
    };
  },
  asyncComputed: {
    usInfo: {
      get: async function () {
        if(this.getStorage('shangjia')  == 'true'){
          const { code, msg, data } = await this.http(baseUrl.getUserInfo);
          this.handleGlobalData("userinfo", data);
          return data;
        }
      },
      default: function () {
        return {};
      },
    },
  },
  created() {},
  computed: {

    tab4List() {
      return {
        first: [
          {
            img: require("@/image/tab4icon01.png"),
            text: "商家登录",
            fn: () => {
              //   console.log("111");
              this.openWin("tab4-merchantLogin");
              //   that.openWin("merchantLogin");
            },
          },
          {
            img: require("@/image/tab4icon02.png"),
            text: "每日签到",
            fn: () => {
              // this.toast("每日签到");
              this.signInFn();
            },
          },
          {
            img: require("@/image/tab4icon03.png"),
            text: "商品收藏",
            fn: () => {
              this.openWin("tab4-collect");
              // this.toast("商品收藏");
            },
          },
          {
            img: require("@/image/tab4icon04.png"),
            text: "浏览记录",
            fn: () => {
              this.openWin("tab4-readHis");
            },
          },
        ],
        two: [
          {
            img: require("@/image/tablist2_2.png"),
            text: "余额充值",
            fn: () => {
              // this.toast("余额充值");
              this.openWin("tab4-balancerecge");
            },
          },
          {
            img: require("@/image/tablist2_3.png"),
            text: "收货地址",
            fn: () => {
              this.openWin("tab4-shippingAddress");
            },
          },
          {
            img: require("@/image/tablist2_4.png"),
            text: "推荐好友",
            fn: () => {
              this.openWin("tab4-extend");
            },
          },
        ],
        three: [
          {
            img: require("@/image/tablist2_5.png"),
            text: "软件更新",
            fn: () => {
              this.appVersion();
            },
          },
          {
            img: require("@/image/tablist2_6.png"),
            text: "意见反馈",
            fn: () => {
              this.openWin("tab4-feedback");
              // this.openWin("tab4-extend");
            },
          },
          {
            img: require("@/image/tablist2_7.png"),
            text: "客服热线",
            fn: async () => {
              // this.toast("call 电话");
              const { code, msg, data } = await this.http(baseUrl.getService);
              if (0 == code) {
                api.call({
                  type: "tel_prompt",
                  number: data,
                });
              }
            },
          },
          {
            img: require("@/image/tablist2_8.png"),
            text: "使用说明",
            fn: () => {
              this.openWin("tab4-instructions");
            },
          },
        ],
      };
    },
    orderlist() {
      return [
        {
          img: require("@/image/tablist2_9.png"),
          text: "购物世界兑换订单",
          fn: () => {
            // this.toast("购物世界兑换订单");
            this.openWin("tab4-goodsOrder");
          },
        },
        {
          img: require("@/image/tablist2_10.png"),
          text: "金币商城购买订单",
          fn: () => {
            this.openWin("tab4-selfsOrder", { type: 1 });
          },
        },
        {
          img: require("@/image/tablist2_11.png"),
          text: "家电专区购买订单",
          fn: () => {
            this.openWin("tab4-selfsOrder", { type: 2 });
          },
        },
      ];
    },
  },
  mounted() {
    api.addEventListener({name: "payOver"},(ret, err) => {
      this.$asyncComputed.usInfo.update();
    });
  },
  methods: {
    initAd() {
      this.$asyncComputed.usInfo.update();
    },
    // refresh() {
    //   this.$asyncComputed.usInfo.update();
    //   setTimeout(() => {
    //     this.downLoading = false;
    //   }, 500);
    // },
    //签到
    async signInFn() {
      const { code, msg, data } = await this.http(baseUrl.signIn);
      if (0 == code) {
        this.$asyncComputed.usInfo.update();
      }
      this.toast(msg);
    },
    //版本跟新
    async appVersion() {
      // alert(JSON.stringify(test));
      // alert(baseUrl.appVersion);
      const { code, msg, data } = await this.http(baseUrl.appVersion);
      if (0 == code) {
        // !
        if (
          !ip.includes("vmall99.com") &&
          this.compare(data.version, this.$ac.appVersion)
        ) {
          this.openFrame("common-versionToast", {
            data,
          });
          this.handleGlobalData("vsInfo", data);
        } else {
          this.toast("暂无更新");
        }
      }
    },
    /**
     * @description: 退出登录
     * @Date: 2020-09-27 17:14:16
     */
    loginOut() {
      Dialog.confirm({
        title: "",
        message: "确认退出",
      })
        .then(() => {
          // on confirm
          this.rmStorage("tokenInfo");
          Toast.loading({
            message: "退出中...",
            forbidClick: true,
          });
          setTimeout(() => {
            this.openWin(
              "common-login",
              {},
              {
                slidBackEnabled: false,
              }
            );
          }, 300);
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * @description：更新方法
     * @Date: 2020-09-26 11:25:39
     */
    editAvatar: function () {
      var that = this;
      //监听裁剪后的图片链接
      api.addEventListener(
        {
          name: "editAvatarEvent",
        },
        function (ret, err) {
          // uploadAvatar(ret.value);
          retTxpath(ret.value).then((res) => {
            uploadAvatar(res);
          });
        }
      );
      openActionSheet(["从相册选一张", "拍照"], function (idx) {
        if (idx === 1) {
          that.getSystemAuth("photos", function () {
            gopic("album");
          });
        } else if (idx === 2) {
          that.getSystemAuth("camera", function () {
            gopic("camera");
          });
        }
      });
      //打开底部选择器
      function openActionSheet(arr, fn) {
        api.actionSheet(
          {
            cancelTitle: "取消",
            buttons: arr,
            style: {
              fontNormalColor: "#666",
              fontPressColor: "#666",
            },
          },
          function (ret, err) {
            fn.call(that, ret.buttonIndex);
          }
        );
      }
      //上传图片
      function gopic(type) {
        api.getPicture(
          {
            sourceType: type,
            encodingType: "jpg",
            mediaValue: "pic",
            destinationType: "base64",
            allowEdit: true,
            quality: 100,
            targetWidth: 720,
            targetHeight: 600,
            saveToPhotoAlbum: false,
          },
          function (ret, err) {
            if (ret && ret.data) {
              that.openWin("common-FNImageClip", {
                imgPath: ret.data,
                eventName: "editAvatarEvent",
              });
              // that.editAvatar(ret.base64Data)
            } else {
              console.log(err);
            }
          }
        );
      }
      function retTxpath(img) {
        return new Promise(async (resolve, reject) => {
          // alert(img);
          const { code, msg, data } = await that.http(baseUrl.imgBaseUpload, {
            imgbase: img,
          });
          if (0 == code) {
            resolve(data);
          }
        });
      }
      function uploadAvatar(img) {
        api.showProgress({
          title: "努力上传中",
          text: "请稍后...",
          modal: true,
        });

        that
          .http(baseUrl.updateAvatar, {
            avatar: img,
          })
          .then(function (res) {
            api.hideProgress();
            if (res.code == 0) {
              that.toast(res.msg);
              // api.toast({
              //   msg: res.msg,
              //   duration: 2000,
              //   location: "bottom",
              // });
              // setTimeout(() => {
              that.$asyncComputed.usInfo.update();
              // }, 500);
              // that..avatar = img;
              // that.avatar = img;
              // that.changeinfo();
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.bgtop {
  background: url("~@/image/tab4_topbanner.png") 100% 100% /100% 100%;
}
</style>
