<template>
  <div class="W_100vw H_100vh bg_000">
    <via-header
      @click-left="closeWin()"
      class="flex_shrink_0 color_fff absolute W_100vw z_index_200"
      style="top: 0"
      :center="{
        text: '抖劵',
      }"
    ></via-header>
    <!-- <div class="bg_f2f2f2">
			
			
    </div>-->
    <van-swipe
      class="W_100vw H_100vh color_fff relative"
      ref="vanSwipe"
      :stop-propagation="false"
      :loop="false"
      :vertical="true"
      :show-indicators="false"
      :lazy-render="true"
      @change="switchVideo"
    >
      <van-swipe-item v-for="item in videoarr" :key="item.sumIndex">
        <div class="overflow_hidden">
          <!-- -->
          <img
            src="../../image/play.png"
            class="color_fff absolute VWH_10"
            style="top: 50%; left: 50%"
            v-if="!isPlay"
            alt
            srcset
          />
          <video
            :id="`video_${item.sumIndex}`"
            class="W_100vw H_100vh D_block bg_161824"
            :src="item.videourl"
            :poster="item.thumb"
            @ended="onVideoEnd($event, item.goods_id)"
            @playing="onPlaying"
            @click="playControl"
            webkit-playsinline
            playsinline
            x5-playsinline
            x-webkit-airplay="allow"
            preload="auto"
          ></video>
          <!--  操作  -->
          <div class="absoluteBR W_20vw H_20vw" style="top: 40%">
            <div @click="openGoodInfo(item)" class="flex_colC">
              <img
                class="VWH_12 B_radius_max B_2_fff MT_1"
                :src="item.thumb"
                alt
              />
              <div class="MT_1" style="text-shadow: 0px 1px 1px #000">
                去购买
              </div>
            </div>
          </div>
          <!-- 标题 -->
          <div class="absoluteBLR z_index_200 P_2">
            <div class="flex_row_between">
              <h3 class="text_overflow_1 flex_flex1">{{ item.goods_name }}</h3>
              <div class="flex_rowR W_30vw fontS_12 color_FCCA00">
                <img :src="require('@/image/stake01.png')" class="VWH_4" alt />
                <span>{{ item.month_sale }}人已购</span>
              </div>
            </div>
            <div class="text_overflow_3 flex_rowL flex_wrap MT_2">
              <div
                class="W_24vw textC D_inline_block PTB_1"
                :style="`background: url(${require('@/image/stake02.png')}) no-repeat 100% 100% / 100%100%;`"
              >
                券后:￥{{ item.shop_price }}
              </div>
              <div
                class="W_24vw textC D_inline_block MLR_2 PTB_1"
                :style="`background: url(${require('@/image/stake03.png')}) no-repeat 100% 100% / 100%100%;`"
              >
                {{ item.rates }}元券
              </div>
              {{ item.goods_short_name }}
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- @change="switchVideo"-->
  </div>
</template>

<script>
import viaHeader from "@/components/header.vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
import baseUrl from "@/js/const";
export default {
  name: "goodInfo",
  components: {
    viaHeader,
  },
  data() {
    return {
      page: 1,
      downLoading: false, //下拉
      upLoading: false, //中间过程
      finished: false, //上拉
      // isSign: false
      topBarTextColor: "light",
      videoarr: [],
      isPlay: false,
      //dark 黑色light白色topBarTextColor
    };
  },
  created() {
    this.initApi();
    // this.getTaoKeVideo();
    this.getTaoKeVideo(false, () => {
      this.$nextTick(() => {
        setTimeout(() => {
          document.querySelector("#video_0").play(); //播放当前视频
          this.isPlay = true;
        }, 500);
      });
    });
  },
  mounted() {
    // this.$nextTick(() => {
    //   var hightP = screen.height + "px";
    //   document.getElementById("queryOrder").style.height = hightP;
    // });
  },
  methods: {
    initApi() {
      this.$ac.addEventListener(
        {
          name: "stopShakeStampsPlayVideoEvent",
        },
        (ret, err) => {
          const videoArr = document.querySelectorAll("video");
          videoArr.forEach((item) => !item.paused && item.pause()); //暂停当前正在播放的视频
          this.isPlay = false;
        }
      );
      //home页面 离开屏幕的事件
      this.$ac.addEventListener(
        {
          name: "viewdisappear",
        },
        (ret, err) => {
          const videoArr = document.querySelectorAll("video");
          videoArr.forEach((item) => !item.paused && item.pause()); //暂停当前正在播放的视频
          this.isPlay = false;
          // api.sendEvent({name: "stopShakeStampsPlayVideoEvent",extra: { type: "stopPlayVideo" },});
        }
      );
    },
    //视频切换
    switchVideo(index) {
      console.log("当前的slide序号是" + index);
      console.log("当前的fileArr长度是" + this.videoarr.length);

      this.swipeIndex = index;
      if (this.videoarr.length < index + 3 && !this.finished) {
        this.getTaoKeVideo(true, () => {
          this.$refs.vanSwipe.swipeTo(index, { immediate: true });
        });
      }

      this.isLoading = true;

      this.$nextTick(() => {
        const videoArr = document.querySelectorAll("video");
        const videoEle = document.querySelector(
          "#video_" + this.videoarr[index].sumIndex
        );
        // console.log(JSON.stringify(videoArr));
        // console.log(JSON.stringify(videoEle));
        videoArr.forEach((item) => !item.paused && item.pause()); //暂停当前正在播放的视频
        videoEle.play(); //播放当前视频
        this.isPlay = true;
      });
    },
    async onVideoEnd(event, id) {
      console.log("play");

      event.target.play(); //重新执行播放
      // const { code, data } = await apiAjax(
      //   VideoLookVideo,
      //   { id },
      //   { isLoading: false }
      // );
      // if (code == 0) {
      // }
    },
    /**
     * @desc 视频即将加载完毕 设置动态大小
     */
    onPlaying({ target }) {
      // console.log("this.isLoading: " + this.isLoading);
      if (this.isLoading) {
        this.isLoading = false;
      }
      if (target.videoWidth > target.videoHeight) {
        target.classList.add("object_fit_scale-down");
      } else {
        target.classList.add("object_fit_cover");
      }
      // this.$refs.vanSwipe.resize();
    },
    openGoodInfo(item) {
      // this.toast("检测");
      // console.log(JSON.stringify(item));
      // return;x

      this.openWin("tab0-goodsdetail", {
        goods_id: item.goods_id,
        shoptype: item.shoptype,
      });
    },
    //播放控制
    playControl(event) {
      console.log("paused: " + event.target.paused);
      if (this.isPlay) {
        event.target.pause();
        this.isPlay = false;
      } else {
        event.target.play();
        this.isPlay = true;
      }
    },
    getTaoKeVideo(upLoading, fn) {
      if (upLoading) {
        ++this.page;
      } else {
        this.page = 1;
      }
      var params = {
        page: this.page,
        pagesize: 10,
        // limit: "12",
      };
      //   console.log("page" + this.page);

      this.http(baseUrl.taovideo, params).then((res) => {
        if (res.code == 0) {
          res.data.list = res.data; //.slice(0, 10);
          // console.log("aaaaa" + JSON.stringify(res.data.list));

          if (res.data.list.length) {
            this.finished = false;
          } else {
            this.finished = true;
          }
          let tempArr = [];
          if (upLoading) {
            tempArr.push(...this.videoarr, ...res.data.list);
          } else {
            tempArr = res.data.list;
            // this.videoarr = res.data.list;
          }
          this.videoarr = tempArr.map((item, index) => {
            return {
              ...item,
              sumIndex: index,
            };
          });
          console.log("videoArr" + JSON.stringify(this.videoarr));

          fn && fn();
        }
      });
    },
  },
};
</script>

<style>
.color_FCCA00 {
  color: #fcca00;
}
</style>
