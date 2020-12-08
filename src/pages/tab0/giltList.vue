<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '限时闪购' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="bg_FF0040 M_2 P_2 flex_row_between B_radius_10 color_fff">
      <div class="font_weight_bold fontS_23">限时闪购</div>
      <div class="flex_rowL">
        距离结束还剩
        <van-count-down @finish="initAd" :time="time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
    </div>
    <div class="PTB_2">
      <van-tabs v-model="active" @click="navTab" color="#fff">
        <!-- @change="getbaokuangood"  v-model="time_active" -->
        <van-tab v-for="(item, index) in timeInfo" :key="index">
          <template v-slot:title>
            <div class="PLR_2 textC" :class="{ color_FF0040: active == index }">
              <!-- {{ item }} -->
              <span> {{ item.time_mess }} </span>
              <p class="fontS_14">
                <!-- checked >= index
                    ? checked == index
                      ? "疯抢中 "
                      : "已开抢 "
                    : "未开启" -->
                {{ item.time_type }}
              </p>
            </div>
          </template>
        </van-tab>
      </van-tabs>
      <!-- <div class="cate_scroll overflow_x">
        <div
          class="D_inline_block W_20 textC"
          @click="checked = index"
          :class="{ color_FF0040: checked == index }"
          v-for="(item, index) in 10"
        >
          <p>已开抢</p>
          <span class="color_999" :class="{ color_FF0040: checked == index }">
            10:22
          </span>
        </div>
      </div> -->
    </div>
    <div class="overflow_y H_100">
      <!-- {{ time }} -->
      <van-pull-refresh v-model="downLoading" @refresh="buyLimitGoods">
        <!-- <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="goodList.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="buyLimitGoods"
          :immediate-check="false"
        > -->
        <div class="flex_rowL flex_wrap">
          <good-list
            v-for="(item, index) in goodList"
            :info="item"
            :key="index"
            :typeGood="3"
          />
        </div>
        <!-- </van-list> -->
      </van-pull-refresh>
    </div>
  </div>
</template>
 <script>
import viaHeader from "@/components/header.vue";
import goodList from "@/components/tab0_list.vue";
import AsyncComputed from "vue-async-computed";
import baseUrl from "@/js/const";
import { PullRefresh, List, CountDown, Tab, Tabs } from "vant";
Vue.use(AsyncComputed)
  .use(PullRefresh)
  .use(List)
  .use(CountDown)
  .use(Tab)
  .use(Tabs);
export default {
  components: { viaHeader, goodList },
  name: "giltList",
  data() {
    return {
      downLoading: false,
      upLoading: false,
      finished: false,
      page: 1,
      goodList: [],
      // checked: 3,
      time: 0,
      active: 0,
      time_id: "",
    };
  },
  asyncComputed: {
    timeInfo: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.buyLimitTimes);
        if (0 == code) {
          this.time = data.find((item) => item.time_type == "疯抢中").end;
          this.time_id = data.find(
            (item) => item.time_type == "疯抢中"
          ).time_id;
          this.active = data.findIndex((item) => item.time_type == "疯抢中");
          // this.start();
          this.initAd();
          return data;
        }
      },
      defalut() {
        return [];
      },
    },
  },

  created() {
    // this.retNative = 3;
    // console.log(this.a);
    //
    // console.log(this.retNative - 1 - 1);
  },
  mounted() {},
  methods: {
    initAd() {
      this.buyLimitGoods();
    },
    // 限时抢购商品
    async buyLimitGoods() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.buyLimitGoods, {
        page: this.page,
        time_id: this.time_id,
      });
      if (0 == code) {
        this.loadUtils(data, "goodList");
      }
    },
    start() {
      const countDown = this.selectComponent(".control-count-down");
      countDown.start();
    },
    navTab(index) {
      this.time_id = this.timeInfo.find((item, ids) => ids == index).time_id;
      // console.log(this.time_id);

      this.buyLimitGoods();
    },
  },
};
</script> 
<style  scoped>
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #fff;
}
.block {
  display: inline-block;
  border-radius: 5px;

  width: 22px;
  color: #ff0040;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
</style>
