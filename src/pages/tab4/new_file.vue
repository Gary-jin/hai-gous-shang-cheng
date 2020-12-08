<template>
  <div class="flex_colT flex_items_stretch VW_100 VH_100">
    <via-header
      @click-left="closeWin()"
      class="bg_FF1F46 BB_1_f2f2f2 flex_shrink_0 color_fff"
      :center="{
		  			  text :'淘宝'
		  }"
    ></via-header>
    <div class="overflow_y H_100 flex_grow_1">
     <!-- <van-pull-refresh v-model="downLoading" @refresh="homegoodsList">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="list.length==0?'什么也没有哦':'没有更多了'"
          @load="mylogList"
          :immediate-check="false"
        >
		
		
        </van-list>
      </van-pull-refresh> -->
    </div>
  </div>
</template>

<script>
import viaHeader from "@/components/header.vue";
// import AsyncComputed from "vue-async-computed";
// import {
// 	PullRefresh,
// 	List
// } from "vant";
// Vue.use(AsyncComputed).use(PullRefresh).use(List)
export default {
  name: "goodInfo",
  components: {
    viaHeader
  },
  data() {
    return {
      page: 1,
      downLoading: false,
      upLoading: false,
      finished: false
      // isSign: false
      // topBarTextColor:"dark"
      //dark 黑色light白色topBarTextColor
    };
  },
  // asyncComputed: {
  // 	retPageInfo: {
  // 		get: function () {
  // 			return this.http(workIndex).then(function (res) {
  // 				return res.data;
  // 			})
  // 		},
  // 		default: function () {
  // 			return {
  // 				"suanli": 0,
  // 				"level": 1,
  // 				"level_text": "青铜矿工Ⅰ",
  // 				"level_img": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3122271675,1425252644&fm=15&gp=0.jpg",
  // 				"is_sign": 0
  // 			}
  // 		}
  // 	},
  // },
  created() {
    // this.initApi();
  },
  mounted() {
    // this.$nextTick(() => {
    //   var hightP = screen.height + "px";
    //   document.getElementById("queryOrder").style.height = hightP;
    // });
  },
  methods: {
    homegoodsList: function() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
        // this.$asyncComputed.switchInfo.update()
      }
      var params = {
        page: this.page
      };
      var url;
      this.http(url, params).then(res => {
        if (res.code == 0) {
          this.loadUtils(res.data.data, "videoList");
        }
      });
    }
  }
};
</script>

<style></style>
