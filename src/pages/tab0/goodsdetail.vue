<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '商品详情' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100" ref="overflow_y">
      <van-swipe
        class="relative z_index_100"
        :autoplay="2000"
        indicator-color="white"
      >
        <!-- @click="toggurl(item.jump_url)" -->
        <van-swipe-item
          :key="index"
          v-for="(item, index) in goodInfo.goods_images"
        >
          <img :src="item" alt class="W_100 H_100vw object_fit_cover" />
          <!-- <img :src="item.image" class="W_100 H_40vw object_fit_cover" alt /> -->
        </van-swipe-item>
      </van-swipe>
      <div class="P_2">
        <div class="flex_rowL relative">
          <div
            class="absoluteTL D_inline_block bg_EA3D5A W_16vw PLR_2 PTB_1 textC B_radius_5 color_fff"
          >
            {{ retshopTyep(goodInfo.shoptype) }}
          </div>
          <div class="text_overflow_2 text_indent_5 MT_1 lineH_3">
            {{ goodInfo.goods_name }}
          </div>
        </div>
        <div class="flex_row_between">
          <div class="flex_rowL">
            <h3 class="color_FF0040">￥{{ goodInfo.shop_price }}</h3>
            <span class="fontS_12 text_decoration_line-through color_999"
              >￥{{ goodInfo.sale_price }}</span
            >
          </div>
          <div class="fontS_12 color_999">销量：{{ goodInfo.month_sale }}</div>
        </div>
        <div class="P_2 PTB_3 MTB_2 color_fff bgtaoke" @click="querDuihuan">
          <!--  -->
          <div class="">
            <div class="flex_rowL MB_1">
              <h1 class="fontS_22 font_weight_bold">
                {{ goodInfo.couponmoney }}
              </h1>
              元优惠券
            </div>
            <div class="fontS_12">
              有效期 {{ goodInfo.couponstarttime }} 至{{
                goodInfo.couponendtime
              }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex_row_between PLR_2 bg_f6f5f8 PTB_2"
        @click="defalg = !defalg"
      >
        <p>查看宝贝详情</p>
        <span class="iconfont iconjiantou"></span>
      </div>
      <div
        class="P_2 bg_f6f5f8 MT_2"
        v-show="defalg"
        v-html="goodInfo.itemdesc"
      ></div>
      <div class="PT_2 bg_f6f5f8 MT_2">
        <!-- 猜你喜欢 -->
        <div class="flex_rowC">
          <img
            :src="require('@/image/likeimg.png')"
            alt
            class="W_56vw H_12vw object_fit_contain"
          />
        </div>
        <div class="flex_rowL flex_wrap MT_2">
          <good-list
            v-for="(item, index) in goodList"
            :key="index"
            :info="item"
            @likeInfo="goodlikeInfo"
            :typeGood="3"
          />
        </div>
      </div>
    </div>

    <div class="flex_rowL">
      <div class="PTB_2 W_14vw flex_rowC">
        <span
          @click="collection(goodInfo.is_collect)"
          class="iconfont fontS_22"
          :class="
            goodInfo.is_collect == 1
              ? 'iconbuoumaotubiao16 color_FF0040'
              : 'icondianzan color_999'
          "
        >
        </span>
      </div>
      <div class="flex_rowL flex_grow_1 color_fff">
        <div
          class="W_50 bg_FF6512 PTB_2 flex_rowC"
          @click="
            openWin('tab0-goodFeedback', { goods_id: goods_id, type: type })
          "
        >
          <img
            :src="require('@/image/goodtab02.png')"
            class="VWH_6 MR_1"
            alt=""
          />
          反馈
        </div>
        <div class="W_50 bg_FF0040 PTB_2 flex_rowC" @click="querDuihuan">
          <img
            :src="require('@/image/goodtab01.png')"
            class="VWH_6 MR_1"
            alt=""
          />
          立即兑换
        </div>
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import goodList from "@/components/tab0Likelist.vue";
import AsyncComputed from "vue-async-computed";
import { Swipe, SwipeItem, PullRefresh, List, Dialog } from "vant";
Vue.use(AsyncComputed)
  .use(Swipe)
  .use(SwipeItem)
  .use(Dialog)
  .use(PullRefresh)
  .use(List);
import baseUrl from "@/js/const";
import time from "js-time.js";
export default {
  components: { viaHeader, goodList },
  name: "goodsdetail",
  data() {
    return {
      defalg: false,
      goods_id: api.pageParam.goods_id || "",
      type: api.pageParam.shoptype || "",
      goodInfo: {},
      downLoading: false,
      upLoading: false,
      finished: false,
      page: 1,
      goodList: [],
      changeUrl: "",
      alibaichuan: api.require("alibaichuan"),
      jdapp: api.require("jdapp"),
    };
  },
  created() {
    this.initAd();
  },
  mounted() {},
  methods: {
    initAd() {
      if (this.type == "jd") {
        this.initJDSDK();
      } else {
        this.initSDK();
      }

      this.goodDetail();
      this.getLikeList();
    },
    //阿里百川 init
    initSDK: function () {
      // alert("taobao:");

      var that = this;
      var param = {
        isvcode: "feelinglife",
      };
      that.alibaichuan.initTaeSDK(param, function (ret, err) {
        if (ret) {
          // alert(JSON.stringify(ret));
        } else {
          // alert(JSON.stringify(err));
        }
      });
    },
    // 初始化京东
    initJDSDK: function () {
      var that = this;
      // var params = {
      //   act_id: "100",
      //   ext: api.systemType + "_" + api.systemVersion,
      //   params: "test",
      //   position: 11,
      // };
      // that.jdapp.init(params, function (rs, err) {
      //   console.log("jd:" + JSON.stringify(rs));
      //   console.log("jd:" + JSON.stringify(err));
      // });
      this.jdapp.init({}, function (rs, err) {
          // alert(JSON.stringify(rs));
          // alert(JSON.stringify(err))
      })
    },
    //商品详情
    async goodDetail() {
      const { code, msg, data } = await this.http(
        baseUrl.getTaoGoodsInfo,
        {
          goods_id: this.goods_id,
          type: this.type,
        },
        "post",
        1
      );
      if (0 == code) {
        this.goodInfo = data;
      } else {
        this.toast(msg);
      }
    },
    //猜你喜欢列表
    async getLikeList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.getRecommGoods, {
        page: this.page,
      });
      if (0 == code) {
        this.loadUtils(data.list, "goodList");
      }
    },
    //返回顶部
    scollTop() {
      setTimeout(() => {
        this.$refs.overflow_y.scrollTop = 0;
      }, 30);
    },
    //猜你喜欢改变数据
    goodlikeInfo(obj) {
      console.log(JSON.stringify(obj));
      this.goods_id = obj.goods_id;
      this.type = obj.shoptype;
      this.scollTop();
      this.goodDetail();
      this.getLikeList();
    },
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
    //收藏
    async collection(iscoll) {
      const { code, msg, data } = await this.http(
        baseUrl.collection,
        {
          goods_id: this.goods_id,
          type: this.type,
          status: iscoll == 1 ? 0 : 1,
        },
        "post",
        1
      );
      if (0 == code) {
        this.goodDetail();
      }
    },
    //下单前提示
    querDuihuan() {
      let isexchange = this.goodInfo.is_exchange;
      if (1 == isexchange) {
        this.getMakes(2);
      } else {
        Dialog.confirm({
          message: `此操作不可撤销，请确认用余额${this.goodInfo.couponmoney}元兑换此产品`,
        })
          //async
          .then(() => {
            this.getMakes(2);
            // on confirm
            // const { code, msg, data } = await this.http(baseUrl.exchange, {
            //   goods_id: this.goods_id,
            //   type: this.type,
            // });
            // if (0 == code) {
            //   Dialog.close;
            //   this.changeUrl = data.url;
            //   this.goodDetail();
            // } else {
            //   this.toast(msg);
            // }
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //
    getMakes(idx) {
      var that = this;
      let type = this.type;

      //分享
      if (type == "jd" || type == "pdd") {
        // if (1 == idx) {
        //   shareinfo();
        // } else {
        couponurl();
        // }
      } else {
        taokeAuth((res) => {
          if (res.child_code === 10001) {
            this.openWin("common-authorization", {
              url: res.url,
            });
          } else if (res.child_code === 10002) {
            // if (1 == idx) {
            //   shareinfo();
            // } else {
            couponurl();
            // }
          }
        });
      }
      //授权
      function taokeAuth(fn) {
        var params = {};
        that.http(baseUrl.relationAuth, params).then((res) => {
          if (res.code == 0) {
            fn(res.data);
          } else {
            that.toast(res.msg);
          }
        });
      }
      //获取下单连接
      async function couponurl() {
        // console.log(
        //   JSON.stringify({
        //     itemId: that.goods_id,
        //     type: that.retType(),
        //   })
        // );
        const { code, msg, data } = await that.http(baseUrl.exchange, {
          goods_id: that.goods_id,
          type: that.type,
        });
        if (0 == code) {
          // return data;
          if (type == "jd") {
            that.jdapp.open_url({
              url: data.url, //that.goodinfo.couponurl
            });
          } else if (type == "pdd") {
            // if(api.systemType == 'ios'){
            //   that.openWin('common-popadUrl',{webUrl:data.url})
            // } else{
              var browser = api.require("webBrowser");
              browser.open({
                url: data.url, //that.goodinfo.couponurl
              });
            // }

          } else {
            var param = {
              url: data.url, // data.url, //that.goodinfo.couponurl,
              clientType: "taobao",
              backUrl: api.systemType === "ios" ? "" : "tbopen31220954",
              nativeOpenFailedMode: "BROWER",
              pid: "mm_1362450092_2021100036_110824350274",
            };
            that.alibaichuan.showPageByURL(param, function (ret, err) {
              if (ret) {
                console.log(JSON.stringify(ret));
              } else {
                that.toast(JSON.stringify(err));
              }
            });
          }
        } else {
          that.toast(msg);
        }
      }
      //分享
      async function shareinfo() {
        const { code, msg, data } = await that.http(getshareinfo, {
          itemId: that.goods_id,
          type: that.retType(),
        });
        if (0 == code) {
          const images = data.info.images.map((v, i) => {
            return {
              img: v,
              check: i == 0 ? true : false,
            };
          });
          data.info.images = images;
          that.openWin("common-shareinfo", {
            info: data.info,
            shoptype: that.goodinfo.goods_type,
          });
          // return data;
        } else {
          that.toast(msg);
        }
      }
    },
    fnGettkimg() {
      var that = this;
      api.ajax(
        {
          url: that.getimgurl,
          method: "get",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept-Encoding": "gzip, deflate",
          },
          data: {
            body: "",
          },
        },
        (res, err) => {
          // if(res){}
          that.getValidImg(res.data.pcDescContent);
          console.log(JSON.stringify(res));
          console.log(JSON.stringify(err));
        }
      );
      //   let params = {};
      //   this.http(this.getimgurl, params, "get").then(res => {
      //     // this.toast(res.msg);
      //     if (res.code == 0) {
      //     } else {
      //       this.toast(res.msg);
      //     }
      //   });
    },
    getValidImg(html1) {
      var that = this;
      var html = html1;
      html = html.replace(/src=\"/g, 'src="http:');
      var srcRegex = /http:\/\/((?!>).)*?(png|jpg)/gi;
      var imgs = html.match(srcRegex);
      that.imgarr = imgs;
    },
  },
};
</script> <style  scoped>
.bgtaoke {
  background: url("~@/image/tab0juan.png") 100% 100% / 100% 100%;
}
.bg_f6f5f8 {
  background: #f6f5f8;
}
</style>
