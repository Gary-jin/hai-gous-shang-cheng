<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '收货地址' }"
      :right="{ text: '添加' }"
      @click-right="openWin('tab4-addShippingAddress')"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="P_2 PLR_3 overflow_y H_100">
      <van-pull-refresh v-model="downLoading" @refresh="initad">
        <div
          class="shadow_1 B_radius_5 MB_3"
          :key="index"
          v-for="(item, index) in adressList"
        >
          <div class="P_3 PLR_4 BB_1_eee">
            <p>{{ item.name }}，{{ item.mobile }}</p>
            <div class="text_overflow_1">
              {{ item.province }} {{ item.city }} {{ item.country }}
              {{ item.detail }}
            </div>
          </div>
          <div class="flex_row_between P_3 color_999 PLR_4">
            <div class="flex_rowL" @click="setDefault(item.id)">
              <span
                :class="
                  item.is_default === 1
                    ? 'iconzhifuchenggong color_FF0040'
                    : 'iconnot_Selected-copy'
                "
                class="MR_1 iconfont"
              ></span>
              {{ item.is_default === 1 ? "已设为默认" : "设为默认" }}
            </div>
            <div class="W_24vw flex_row_between">
              <span @click="deladress(item.id)">删除</span>
              <span
                @click.stop="
                  openWin('tab4-eiteShippingAddress', {
                    id: item.id,
                  })
                "
                >修改
              </span>
            </div>
          </div>
        </div>
        <div class="textC color_666" v-if="adressList.length == 0">
          什么也没有哦
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>
 <script>
import viaHeader from "@/components/header.vue";
import { PullRefresh, List, Dialog } from "vant";
import baseUrl from "@/js/const";
Vue.use(PullRefresh).use(List);
export default {
  components: { viaHeader },
  name: "shippingAddress",
  data() {
    return {
      key: "",
      checd: 0,
      downLoading: false,
      upLoading: false,
      finished: false,
      page: 1,
      adressList: [],
    };
  },
  created() {
    this.initad();
  },
  mounted() {},
  methods: {
    //
    initad() {
      this.addresslist();
      api.addEventListener(
        {
          name: "viewappear",
        },
        (ret, err) => {
          this.addresslist();
        }
      );
    },
    //收货地址列表
    async addresslist() {
      if (this.upLoading) {
        //上拉加载
        ++this.page;
      } else {
        this.page = 1; //刷新
      }
      const { code, msg, data } = await this.http(baseUrl.getAddressList);
      if (0 == code) {
        this.loadUtils(data, "adressList");
      }
    },
    //删除地址
    deladress(adId) {
      Dialog.confirm({
        message: "你确定要删除吗 ？",
      })
        .then(async () => {
          // on confirm
          const { code, msg, data } = await this.http(baseUrl.delAddress, {
            id: adId,
          });
          this.toast(msg);
          this.initad();
        })
        .catch(() => {
          // on cancel
        });
    },
    //单独修改默认收货地址
    async setDefault(adId) {
      const { code, msg, data } = await this.http(baseUrl.defaultSet, {
        id: adId,
      });
      this.toast(msg);
      this.initad();
    },
  },
};
</script> <style  scoped>
</style>
