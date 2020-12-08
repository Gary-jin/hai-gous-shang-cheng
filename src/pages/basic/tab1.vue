<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :left="{ text: '' }"
      :center="{ text: '兑换专区' }"
      :right="{ text: '兑换记录' }"
      @click-right="openWin('tab4-selfsOrder', { type: 1 })"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100">
      <van-pull-refresh v-model="downLoading" @refresh="initAd">
        <van-swipe
          class="relative z_index_100"
          :autoplay="2000"
          indicator-color="white"
        >
          <!-- @click="toggurl(item.jump_url)" -->
          <van-swipe-item :key="index" v-for="(item, index) in tab1banner">
            <img
              :src="item.image"
              @click="toggurl(item.url)"
              alt
              class="W_100 H_50vw object_fit_cover"
            />
            <!-- <img :src="item.image" class="W_100 H_40vw object_fit_cover" alt /> -->
          </van-swipe-item>
        </van-swipe>
        <div class="relative z_index_300 bg_fff W_100vw">
          <div
            @click="openWin('tab1-selfSeath', { type: 'tab1' })"
            class="bg_fff B_radius_max B_1_eee flex_row_between PL_4 absolute W_90vw"
            style="top: -6vw; margin-left: 5vw"
          >
            <div class="flex_rowL color_999">
              <span class="fontS_24 iconfont iconsousuo1"></span>
              粘贴宝贝标题，先领券再购物
            </div>
            <div class="PTB_2 bg_FF0040 color_fff PLR_4 B_radius_max">搜索</div>
          </div>
        </div>
        <div class="BT_4">
          <div class="bg_eee PTB_2">
            <div class="bg_fff PLR_2 flex_row_between">
              <span class="iconfont iconlingdang fontS_24 color_FFF3F5"></span>
              <!-- <span class="color_666">尊敬的用户</span> -->
              <!--  -->
              <van-notice-bar
                :text="noTice.content"
                scrollable
                class="W_84vw"
                background="#fff"
                color="#999"
              />
            </div>
          </div>
        </div>
        <div class="P_3 color_fff bg_linearX_F5BDE2_FFD4ED">新品上线</div>
        <div class="P_1 flex_rowL flex_wrap">
          <tab1-list
            v-for="(item, index) in coinList"
            :key="index"
            :info="item"
            class="P_1"
            :type="1"
            :pageType="1"
          />
        </div>
        <div class="bg_linearX_FFCA45_FEECBF">
          <van-tabs
            id="nav-tab-vant"
            background="transparent"
            :swipe-threshold="Number(5)"
            line-height="2"
            line-width="34"
            color="transparent"
            title-active-color="#000"
            title-inactive-color="#757575"
            :swipeable="false"
            :sticky="false"
            @click="navTab"
            v-model="navActive"
          >
            <van-tab
              :title="item.name"
              :key="index"
              v-for="(item, index) in cateList"
            >
            </van-tab>
          </van-tabs>
        </div>

        <!--  -->
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="CoinGoodsList"
          :immediate-check="false"
        >
          <div class="P_1 flex_rowL flex_wrap">
            <tab1-list
              v-for="(item, index) in goodList"
              :key="index"
              :info="item"
              class="P_1"
              :type="1"
              :pageType="1"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import viaHeader from "@/components/header.vue";
import tab1List from "@/components/tab1_list.vue";
import AsyncComputed from "vue-async-computed";
import baseUrl from "@/js/const";
import {
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
  NoticeBar,
} from "vant";
Vue.use(AsyncComputed)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(NoticeBar);
export default {
  components: { viaHeader, tab1List },
  name: "tab1",
  data() {
    return {
      key: "",
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false,
      goodList: [],
      navActive: 0,
      sortid: "",
      // coinList: [],
    };
  },

  asyncComputed: {
    //录播图
    tab1banner: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getBannerList, {
          type: 3,
        });
        return data;
      },
      default() {
        return [];
      },
    },
    // 获取分类
    cateList: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getCate);
        data.unshift({ sort_id: 0, name: "热销商品" });
        // this.sortid = data[0].sort_id;
        return data;
      },
      default() {
        return [];
      },
    },
    //获取金币商城新品上线商品
    coinList: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.coinTypeGoods, {
          type: 1,
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
          type: 2,
        });
        return data;
      },
      default() {
        return {};
      },
    },
  },
  created() {
    this.initAd();
  },
  mounted() {},
  methods: {
    //
    initAd() {
      // this.coinTypeGoodsList();
      this.CoinGoodsList();
      this.$asyncComputed.coinList.update();
      // this.$asyncComputed.cateList.update();
    },
    //切换cate列表
    navTab(index, title) {
      this.sortid = this.cateList[index].sort_id;
      // console.log(this.sortid);
      this.CoinGoodsList();
    },

    //获取所有金币商城商  品
    async CoinGoodsList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.getCoinGoodsList, {
        sort_id: this.sortid,
        page: this.page,
      });
      if (0 == code) {
        this.loadUtils(data.list, "goodList");
        // }else{
        // this.downLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.bg_linearX_F5BDE2_FFD4ED {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f5bde2),
    to(#ffd4ed)
  );
  background: linear-gradient(to right, #f5bde2, #ffd4ed);
  /* 标准的语法 */
}
.bg_linearX_FFCA45_FEECBF {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ffca45),
    to(#feecbf)
  );
  background: linear-gradient(to right, #ffca45, #feecbf);
  /* 标准的语法 */
}
</style>
