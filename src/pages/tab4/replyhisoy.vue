<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '回复记录' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_3">
      <van-pull-refresh v-model="downLoading" @refresh="optionList">
        <van-list
          v-model="upLoading"
          :finished="finished"
          :finished-text="list.length == 0 ? '什么也没有哦' : '没有更多了'"
          @load="optionList"
          :immediate-check="false"
        >
          <div class="shadow_1 MB_2" v-for="(item, index) in list" :key="index">
            <div class="P_2 BB_1_eee">
              <p class="color_999">{{ item.create_time }}</p>
              <div>
                <span class="color_999"> 您的问题 </span>
                {{ item.content }}
              </div>
            </div>
            <div class="P_2 BB_1_eee">
              <p class="color_999">{{ item.reply_time }}</p>
              <div>
                <span class="color_999"> 官方回复： </span>
                {{ item.reply || "暂无回复" }}
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template> 
<script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
import { PullRefresh, List } from "vant";
Vue.use(PullRefresh).use(List);
export default {
  components: { viaHeader },
  name: "replyhisoy",
  data() {
    return {
      downLoading: false,
      upLoading: false,
      finished: false,
      page: 1,
      list: [],
    };
  },
  created() {
    this.optionList();
  },
  mounted() {},
  methods: {
    async optionList() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.optionList, {
        page: this.page,
      });
      if (0 == code) {
        this.loadUtils(data.list, "list");
      }
    },
  },
};
</script> <style  scoped>
</style>
