<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <!-- header -->
    <div class="bg_FF0040" :style="`padding-top: ${pdtop};`">
      <div class="PLR_2 PT_2 flex_row_between MB_2">
        <img :src="require('@/image/logo.png')" class="VWH_8" alt="" />
        <div
          @click="openWin('tab0-tab0seath')"
          class="P_1 PLR_2 flex_grow_1 MLR_2 bg_fff flex_rowL B_radius_20 color_666 fontS_14"
        >
          <span class="fontS_24 iconfont iconsousuo1"></span>
          粘贴宝贝标题，先领券再购物
        </div>
        <img
          :src="require('@/image/tabordericon.png')"
          @click="openWin('tab4-goodsOrder')"
          class="VWH_6"
          alt=""
        />
      </div>
    </div>
    <van-tabs
      id="nav-tab-vant"
      background="#FF0040"
      :swipe-threshold="Number(5)"
      line-height="2"
      line-width="34"
      color="#fff"
      title-active-color="#fff"
      title-inactive-color="#FFDBDB"
      :swipeable="isswipe"
      animated
      v-model="navActive"
      @change="navTab"
    >
      <van-tab title="全部">
        <div class="overflow_y W_100vw flex_items_stretch" style="height: 80vh">
          <van-pull-refresh v-model="downLoading" @refresh="RecommGoods">
            <van-list
              v-model="upLoading"
              :finished="finished"
              :finished-text="
                goodList.length == 0 ? '什么也没有哦' : '没有更多了'
              "
              @load="RecommGoods"
              :immediate-check="false"
            >
              <template>
                <van-swipe
                  class="relative z_index_100"
                  :autoplay="2000"
                  indicator-color="white"
                >
                  <van-swipe-item
                    :key="'topbanner' + index"
                    v-for="(item, index) in bannerInfo"
                  >
                    <img
                      :src="item.image"
                      @click="toggurl(item.jump_url)"
                      alt
                      class="W_100 H_50vw object_fit_cover"
                    />
                    <!-- <img :src="item.image" class="W_100 H_40vw object_fit_cover" alt /> -->
                  </van-swipe-item>
                </van-swipe>
                <div class="PLR_2 BB_1_eee flex_rowL">
                  <img
                    :src="require('@/image/icontoutiao.png')"
                    class="W_18vw H_8vw object_fit_contain"
                    alt
                  />

                  <!-- <div class="W_84vw textR color_999"></div> -->
                  <van-notice-bar
                    :text="noTice.content"
                    scrollable
                    class="W_84vw"
                    background="#fff"
                    color="#999"
                  />
                </div>
                <!-- icon分类 -->
                <div class="flex_rowL flex_wrap PT_2">
                  <div
                    class="W_20 flex_colT P_1 fontS_12 color_999"
                    v-for="(item, index) in homeIcon"
                    :key="index"
                    @click="iconPage(index, item)"
                  >
                    <img
                      :src="item.image"
                      class="MB_1 VWH_8 B_radius_max D_block"
                      alt
                    />
                    <span>{{ item.name }}</span>
                  </div>
                  <!-- <template v-for="(item, index) in catelist">
                    <div
                      class="W_20 flex_colT P_1 fontS_12 color_999"
                      v-if="index < 10"
                      :key="index"
                      @click="iconPage(index, item, 'type2')"
                    >
                      <img
                        :src="item.image"
                        class="MB_1 VWH_8 B_radius_max D_block bg_eee"
                        alt
                      />
                      <span>{{ item.name }}</span>
                    </div>
                  </template> -->
                </div>
                <!-- 品牌精选 -->
                <div class="bg_FDDCE3 b_1_FDDCE3">
                  <div class="color_917377 flex_rowL P_2">
                    <span
                      class="D_block H_4vw B_radius_max MR_2 bg_FE5467"
                      style="width: 5px"
                    ></span>
                    品牌精选
                  </div>
                </div>
                <div class="flex_rowL flex_items_stretch">
                  <!-- 人气爆款 
                  
                  -->
                  <div
                    class="BR_1_eee W_40vw H_60vw"
                    @click="openPage(HomeImage.hotgood.type)"
                  >
                    <img :src="HomeImage.hotgood.image" class="H_100" alt />
                  </div>
                  <div class="W_60vw H_60vw flex_colB">
                    <img
                      :src="HomeImage.super.image"
                      class="W_100 H_100 BB_1_eee"
                      alt
                      @click="openPage(HomeImage.super.type)"
                    />
                    <div class="flex_rowL">
                      <img
                        :src="HomeImage.grabgoods.image"
                        class="VWH_30"
                        alt
                        @click="openPage(HomeImage.grabgoods.type)"
                      />
                      <img
                        @click="openPage(HomeImage.todaynews.type)"
                        :src="HomeImage.todaynews.image"
                        class="VWH_30"
                        alt
                      />
                    </div>
                  </div>
                </div>
                <div class="bg_FDDCE3 b_1_FDDCE3 P_1"></div>
                <div class="PTB_1">
                  <van-swipe
                    class="relative z_index_100"
                    :autoplay="2000"
                    indicator-color="white"
                  >
                    <!-- -->
                    <van-swipe-item
                      :key="index"
                      v-for="(item, index) in connerInfo"
                    >
                      <img
                        :src="item.image"
                        alt
                        class="W_100 H_30vw object_fit_cover"
                        @click="toggurl(item.url)"
                      />
                      <!-- <img :src="item.image" class="W_100 H_40vw object_fit_cover" alt /> -->
                    </van-swipe-item>
                  </van-swipe>
                </div>
                <div class="bg_FDDCE3 b_1_FDDCE3 P_1"></div>
                <div class="P_2 PB_4 flex_rowL">
                  <div
                    @click="
                      openWin('tab0-giltList', {
                        type: HomeImage.time_limit.type,
                      })
                    "
                    class="BR_1_eee W_50"
                  >
                    <div class="flex_rowL">
                      <h3 class="fontS_18 font_weight_bold">限时闪购</h3>
                      <van-count-down :time="timeEnd" @finish="timeEndFn">
                        <template #default="timeData">
                          <span class="block">{{ timeData.hours }}</span>
                          <span class="colon">:</span>
                          <span class="block">{{ timeData.minutes }}</span>
                          <span class="colon">:</span>
                          <span class="block">{{ timeData.seconds }}</span>
                        </template>
                      </van-count-down>
                    </div>
                    <span class="color_FFF3F5 fontS_12">姿势要帅下手要快</span>
                    <div
                      class="flex_rowL fontS_14 font_weight_bold color_FE5467"
                    >
                      <p>
                        <span
                          class="P_1 iconfont iconjiantou fontS_16 bg_FE5467 B_radius_max color_fff"
                        ></span>
                        点击进入
                      </p>
                      <img
                        :src="HomeImage.time_limit.image"
                        class="VWH_16 ML_2 object_fit_contain"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    class="W_50 PL_2"
                    @click="openPage(HomeImage.sellgoods.type)"
                  >
                    <div class="flex_rowL">
                      <h3 class="fontS_18 font_weight_bold">特价九块九</h3>
                    </div>
                    <span class="color_FFF3F5 fontS_12">特价包邮</span>
                    <div
                      class="flex_rowL fontS_14 font_weight_bold color_FE5467"
                    >
                      <p>
                        <span
                          class="P_1 iconfont iconjiantou fontS_16 bg_FE5467 B_radius_max color_fff"
                        ></span>
                        点击进入
                      </p>
                      <img
                        :src="HomeImage.sellgoods.image"
                        class="VWH_16 ML_2 object_fit_contain"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="bg_FDDCE3 b_1_FDDCE3 flex_row_between PR_2">
                  <div class="color_917377 flex_rowL P_2">
                    <span
                      class="D_block H_4vw B_radius_max MR_2 bg_FE5467"
                      style="width: 5px"
                    ></span>
                    好货优选
                  </div>
                  <!-- <div class="color_999" @click="openPage(6)">更多</div> -->
                </div>
                <div class="PT_2">
                  <shop-list
                    v-for="(item, index) in opGoods"
                    :key="index"
                    :info="item"
                    :typeGood="1"
                  />
                </div>
                <div class="bg_FDDCE3 b_1_FDDCE3 flex_row_between PR_2">
                  <div class="color_917377 flex_rowL P_2">
                    <span
                      class="D_block H_4vw B_radius_max MR_2 bg_FE5467"
                      style="width: 5px"
                    ></span>
                    热门推荐
                  </div>
                  <!-- <div class="color_999" @click="openPage(7)">更多</div> -->
                </div>
                <div class="P_2">
                  <div
                    class="cate_scroll"
                    @touchstart="navscroll(false)"
                    @touchend="navscroll(true)"
                  >
                    <!-- that.isswipe = bool; -->
                    <!--   v-for="item in 5" -->
                    <shop-list
                      v-for="(item, index) in HotGoods"
                      :key="index"
                      :info="item"
                      :typeGood="2"
                    />
                  </div>
                </div>
                <div class="bg_FDDCE3 b_1_FDDCE3">
                  <div class="color_917377 flex_rowL P_2">
                    <span
                      class="D_block H_4vw B_radius_max MR_2 bg_FE5467"
                      style="width: 5px"
                    ></span>
                    猜你喜欢
                  </div>
                </div>
                <div class="PTB_2 flex_rowL flex_wrap">
                  <shop-list
                    v-for="(item, index) in goodList"
                    :key="index"
                    :info="item"
                    :typeGood="3"
                  />
                </div>
              </template>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab
        :key="index"
        :title="item.name"
        v-for="(item, index) in catelist"
      >
        <div class="overflow_y W_100vw flex_items_stretch" style="height: 80vh">
          <van-pull-refresh v-model="downLoading" @refresh="RecommGoods">
            <van-list
              v-model="upLoading"
              :finished="finished"
              :finished-text="
                goodList.length == 0 ? '什么也没有哦' : '没有更多了'
              "
              @load="RecommGoods"
              :immediate-check="false"
            >
              <template>
                <div>
                  <!-- banner -->
                  <div class="PTB_4 flex_rowL flex_wrap">
                    <div
                      class="W_25 flex_colT MB_2"
                      v-for="(item, index) in sebCateArr"
                      :key="'sebcate' + index"
                      @click="openWinsebcate(item)"
                    >
                      <img
                        class="VWH_12 MB_1"
                        :src="item.image"
                        alt=""
                        srcset=""
                      />
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                  <div class="">
                    <div class="color_917377 flex_rowL P_2">
                      <span
                        class="D_block H_6vw B_radius_max MR_2 bg_FE5467"
                        style="width: 4px"
                      ></span>
                      热门推荐
                    </div>
                  </div>
                  <div
                    class="cate_scroll P_2"
                    @touchstart="navscroll(false)"
                    @touchend="navscroll(true)"
                  >
                    <shop-list
                      v-for="(item, index) in HotGoods"
                      :key="index"
                      :info="item"
                      :typeGood="2"
                    />
                  </div>
                  <div class="">
                    <div class="color_917377 flex_rowL P_2">
                      <span
                        class="D_block H_6vw B_radius_max MR_2 bg_F0A118"
                        style="width: 4px"
                      ></span>
                      猜你喜欢
                    </div>
                  </div>
                  <div class="PTB_2 flex_rowL flex_wrap">
                    <shop-list
                      v-for="(item, index) in goodList"
                      :info="item"
                      :key="index"
                      :typeGood="3"
                    />
                  </div>
                </div>
              </template>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import AsyncComputed from "vue-async-computed";
import {
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
  CountDown,
  NoticeBar,
  Sticky,
} from "vant";
Vue.use(AsyncComputed)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(CountDown)
  .use(Sticky)
  .use(NoticeBar);
import baseUrl from "@/js/const";
import shopList from "@/components/tab0_list.vue";
export default {
  name: "tab0",
  data() {
    return {
      key: "",
      pdtop: api.safeArea.top + "px",
      time: "1600852437",
      isswipe: true,
      navActive: 0,
      cateArr: [],
      cate_id: "",
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      goodList: [],
      HotGoods: [],
      sebCateArr: [],
    };
  },
  asyncComputed: {
    //获取首页图片
    HomeImage: {
      get: async function () {
        const { code, msg, data } = await this.http(baseUrl.getHomeImage);
        return data;
        // return data;
      },
      default: function () {
        return {
          brand: { image: "", type: "brand" },
          time_limit: { image: "", type: "time_limit" },
          super: { image: "", type: "super" },
          hotgood: { image: "", type: "hotgood" },
          grabgoods: { image: "", type: "grabgoods" },
          todaynews: { image: "", type: "todaynews" },
          sellgoods: { image: "", type: "sellgoods" },
        };
      },
    },
    //获取分类
    catelist: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getCateList, {
          type: "taobao",
        });
        this.cateArr = data;
        // console.log(JSON.stringify(data));
        // this.RecommGoods();
        return data;
      },
      default() {
        return [];
      },
    },
    //首页分类
    homeIcon: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getCateList, {
          type: "index",
        });
        console.log(JSON.stringify(data));

        return data;
      },
      default() {
        return [];
      },
    },
    //1:海购轮播
    bannerInfo: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getBannerList, {
          type: 1,
        });
        return data;
      },
      default() {
        return [];
      },
    },
    //好货优选
    opGoods: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.optimizationGoods);
        console.log(data);

        return data;
        if (0 == code) {
        }
      },
      default() {
        return [];
      },
    },
    //热门推荐
    // HotGoods: {
    //   async get() {
    //     const { code, msg, data } = await this.http(baseUrl.HotRecommGoods);
    //     return data;
    //     if (0 == code) {
    //     }
    //   },
    //   default() {
    //     return [];
    //   },
    // },
    //2首页轮播
    connerInfo: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getBannerList, {
          type: 2,
        });
        return data;
      },
      default() {
        return [];
      },
    },
    //通知广告
    noTice: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getNotice, {
          type: 1,
        });
        return data;
      },
      default() {
        return {};
      },
    },
    //限时抢购剩余时间
    timeEnd: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.get_time);
        return data;
      },
      default() {
        return "";
      },
    },
  },
  computed: {
    iconArr() {
      return [
        {
          icon: require("@/image/tkicon1.png"),
          text: "拼多多",
        },
        {
          icon: require("@/image/tkicon2.png"),
          text: "京东",
        },
        {
          icon: require("@/image/tkicon3.png"),
          text: "唯品会",
        },
        {
          icon: require("@/image/tkicon4.png"),
          text: "天猫",
        },
        {
          icon: require("@/image/tkicon5.png"),
          text: "淘宝",
        },
        {
          icon: require("@/image/tkicon6.png"),
          text: "聚划算",
        },
        {
          icon: require("@/image/tkicon7.png"),
          text: "免费网卡",
        },
        {
          icon: require("@/image/tkicon8.png"),
          text: "九块九",
        },
        {
          icon: require("@/image/tkicon9.png"),
          text: "生活券",
        },
        {
          icon: require("@/image/tkicon10.png"),
          text: "抖券视频",
        },
        {
          icon: require("@/image/tkicon11.png"),
          text: "女装",
        },
        {
          icon: require("@/image/tkicon12.png"),
          text: "母婴",
        },
        {
          icon: require("@/image/tkicon13.png"),
          text: "化妆品",
        },
        {
          icon: require("@/image/tkicon14.png"),
          text: "居家",
        },
        {
          icon: require("@/image/tkicon15.png"),
          text: "鞋包配饰",
        },
        {
          icon: require("@/image/tkicon16.png"),
          text: "美食",
        },
        {
          icon: require("@/image/tkicon17.png"),
          text: "文体车品",
        },
        {
          icon: require("@/image/tkicon18.png"),
          text: "数码家电",
        },
        {
          icon: require("@/image/tkicon19.png"),
          text: "男装",
        },
        {
          icon: require("@/image/tkicon20.png"),
          text: "内衣",
        },
      ];
    },
  },

  components: {
    shopList,
  },
  created() {
    this.initAd();
  },
  mounted() {},
  methods: {
    initAd() {
      this.RecommGoods();
      this.hotGoodsList();
    },
    //info
    navscroll(flag) {
      this.isswipe = flag;
    },
    //跟新倒计时时间戳接口
    timeEndFn() {
      this.$asyncComputed.timeEnd.update();
    },
    openPage(pagelx) {
      //type  = 1  人气 ，2 超级划算 3掏枪好货 4，今日更新
      // type  = 1  人气 ，2 超级划算 3掏枪好货 4，今日更新 5 9快9  6. 好货优选 7.热门推荐
      // seathList2 淘客没有分类  seathList 搜索之后 seathList1 淘客分类
      //new  根据返回type 走
      this.openWin("tab0-seathList2", { type: pagelx });
    },
    //icon 分类
    async iconPage(index, item) {
      var that = this;
      const jump = item.jump;
      switch (jump) {
        case "viedo": //抖券
          this.openWin("tab0-videoList");
          break;
        case "url": //打开外联
          // this.toast("打开外联");
          this.toggurl(item.url);
          break;
        case "cate": //全部分类
          let catearr = this.homeIcon.filter((item) => {
            if (item.jump != "url" && item.jump != "viedo") {
              return item;
            }
          });
          // console.log(JSON.stringify(catearr));

          this.openWin("tab0-seathList1", {
            info: item,
            cateInfo: catearr,
            type: item.jump,
            status: "type1", // "type1",
          });
          break;
        default:
          let tkCate = await retFncateList(jump);
          tkCate.unshift({ cid: "", name: "全部", image: "" });
          this.openWin("tab0-seathList1", {
            info: item,
            cateInfo: tkCate,
            type: item.jump,
            status: "type2", //"type2",
          });
          break;
      }

      async function retFncateList(ids) {
        return new Promise(async (resolve, reject) => {
          const { code, msg, data } = await that.http(baseUrl.getCateList, {
            type: ids,
          });
          if (0 == code) {
            resolve(data);
          }
        });
      }
    },
    navTab(index, title) {
      let ids;
      if (0 == this.navActive) {
        ids = "";
        this.cate_id = ids;
      } else {
        ids = this.catelist[this.navActive - 1].cid;
        this.cate_id = ids;
        this.getSubCate();
      }
      // this.cate_id = ids;
      this.initAd();
    },
    //获取二级分类
    async getSubCate() {
      const { code, msg, data } = await this.http(baseUrl.getSubCate, {
        cid: this.cate_id, //this.cateArr[this.navActive -1].cid
      });
      if (0 == code) {
        this.sebCateArr = data;
      }
    },
    //热门推荐
    async hotGoodsList() {
      const { code, msg, data } = await this.http(baseUrl.HotRecommGoods);
      if (0 == code) {
        this.HotGoods = data;
      }
    },
    //猜你喜欢list
    async RecommGoods() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.getRecommGoods, {
        page: this.page,
        cate_id: this.cate_id, // this.catelist[this.navActive].cid,
      });
      if (0 == code) {
        this.loadUtils(data.list, "goodList");
      }
    },
    //去搜索二级分类
    openWinsebcate(cateinfo) {
      this.openWin("tab0-seathList2", {
        type: "taobao",
        cate_id: this.cate_id,
        sub_cate_id: cateinfo.cid,
      });
    },
  },
};
</script>

<style scoped>
#nav-tab-vant .van-hairline--top-bottom::after {
  border: 0;
}
.bg_FDDCE3 {
  background: #fff3f5;
}
.b_1_FDDCE3 {
  /* border: 1px solid #fddce3;# 100% */
  border: 2px solid #fddee5;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #6c4a4e;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #6c4a4e;
}
.color_917377 {
  color: #917377;
}
</style>
