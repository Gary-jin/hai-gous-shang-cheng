<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :left="{ text: '' }"
      :center="{ text: '家电专区' }"
      :right="{ text: '兑换记录' }"
      @click-right="openWin('tab4-selfsOrder', { type: 2 })"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100">
      <van-pull-refresh v-model="downLoading" @refresh="GoodsList">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="GoodsList"
          :immediate-check="false"
        >
          <van-swipe
            class="relative z_index_100"
            :autoplay="2000"
            indicator-color="white"
          >
            <!-- @click="toggurl(item.jump_url)" -->
            <van-swipe-item :key="index" v-for="(item, index) in bannerInfo">
              <img
                :src="item.image"
                alt
                class="W_100 H_50vw object_fit_cover"
                @click="toggurl(item.url)"
              />
              <!-- <img :src="item.image" class="W_100 H_40vw object_fit_cover" alt /> -->
            </van-swipe-item>
          </van-swipe>
          <div class="relative z_index_300 bg_fff W_100vw">
            <div
              class="bg_fff B_radius_max B_1_eee flex_row_between PL_4 absolute W_90vw"
              style="top: -6vw; margin-left: 5vw"
              @click="openWin('tab1-selfSeath', { type: 'tab2' })"
            >
              <div class="flex_rowL color_999">
                <span class="fontS_24 iconfont iconsousuo1"></span>
                粘贴宝贝标题，先领券再购物
              </div>
              <div class="PTB_2 bg_FF0040 color_fff PLR_4 B_radius_max">
                搜索
              </div>
            </div>
          </div>
          <div class="BT_4">
            <div class="bg_eee PTB_2">
              <div class="bg_fff PLR_2 flex_row_between">
                <span
                  class="iconfont iconlingdang fontS_24 color_FFF3F5"
                ></span>
                <van-notice-bar
                  :text="noTice.content"
                  scrollable
                  class="W_84vw"
                  background="#fff"
                  color="#999"
                />
                <!-- <span class="color_666">尊敬的用户</span> -->
              </div>
            </div>
          </div>
          <div class="P_3 color_fff bg_linearX_F5BDE2_FFD4ED">家电专区</div>
          <div class="P_1 flex_rowL flex_wrap">
            <tab1-list
              v-for="(item, index) in goodList"
              :key="index"
              :info="item"
              class="P_1"
              :type="2"
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
import { Swipe, SwipeItem, PullRefresh, List, NoticeBar } from "vant";
Vue.use(AsyncComputed)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(NoticeBar);
export default {
  components: { viaHeader, tab1List },
  name: "tab2",
  data() {
    return {
      key: "",
      downLoading: false,
      upLoading: false,
      finished: false,
      page: 1,
      goodList: [],
    };
  },
  asyncComputed: {
    bannerInfo: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getBannerList, {
          type: 4,
        });
        return data;
      },
      defalut() {
        return [];
      },
    },
    //通知广告
    noTice: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getNotice, {
          type: 3,
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
  methods: {
    initAd() {
      this.GoodsList();
    },
    //获取超值购商城商品
    async GoodsList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.getCheapGoodsList, {
        page: this.page,
      });
      if (0 == code) {
        this.loadUtils(data.list, "goodList");
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
</style>
