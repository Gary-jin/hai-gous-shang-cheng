<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '编辑收货地址' }"
      :right="{ text: '添加' }"
      @click-right="openWin('tab4-addShippingAddress')"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_3 PLR_4">
      <div class="flex_row_between PTB_3 BB_1_eee color_999">
        <div class="W_30vw fontS_14">姓名</div>
        <div class="flex_grow_1 fontS_14 MR_2">
          <input
            type="text"
            class="DIV_Block PT_1 textR W_100"
            placeholder="请填写"
            v-model="name"
          />
        </div>
      </div>
      <div class="flex_row_between PTB_3 BB_1_eee color_999">
        <div class="W_30vw fontS_14">手机号码</div>
        <div class="flex_grow_1 fontS_14 MR_2">
          <input
            type=" number"
            v-model="mobile"
            class="DIV_Block PT_1 textR W_100"
            placeholder="请填写"
          />
        </div>
      </div>
      <div class="flex_row_between PTB_3 BB_1_eee color_999">
        <div class="W_30vw fontS_14">所在地区</div>
        <div class="flex_rowL MR_2 fontS_14">
          {{ citystr ? citystr : "请选择" }}
          <span class="iconfont iconjiantou"></span>
        </div>
      </div>
      <div class="flex_row_between PTB_3 BB_1_eee color_999">
        <div class="W_30vw fontS_14">详细地址</div>
        <div class="flex_grow_1 fontS_14 MR_2">
          <input
            type="text"
            v-model="detail"
            class="DIV_Block PT_1 textR W_100"
            placeholder="请填写"
          />
        </div>
      </div>
      <div class="flex_row_between PTB_3 BB_1_eee">
        <div class="W_30vw fontS_14">设为默认地址</div>
        <div
          class="flex_grow_1 fontS_14 textR MR_2"
          @click="is_default = !is_default"
        >
          <span
            :class="
              is_default
                ? 'iconzhifuchenggong color_FF0040'
                : 'iconnot_Selected-copy'
            "
            class="MR_1 iconfont fontS_18"
          ></span>
        </div>
      </div>
    </div>
    <div class="bg_FF0040 P_2 color_fff textC M_2 B_radius_5" @click="AddrInfo">
      保存并使用
    </div>
    <div class="bg_999 P_2 color_fff textC M_2 B_radius_5" @click="delAdrs">
      删除收货地址
    </div>
    <van-popup v-model="isPopup" position="bottom">
      <van-area
        @confirm="confirmArea"
        @cancel="isPopup = false"
        :area-list="areaList"
      />
    </van-popup>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import { Area, Popup } from "vant";
Vue.use(Area).use(Popup);
import baseUrl from "@/js/const";
import areaList from "@/js/area";
export default {
  components: { viaHeader },
  name: "shippingAddress",
  data() {
    return {
      areaList,
      isPopup: false,
      adId: api.pageParam.id,
      titleType: 1,
      flag: false,
      info: {},
      name: "",
      mobile: "",
      province: "",
      city: "",
      country: "",
      detail: "",
      is_default: false,
      citystr: "",
    };
  },
  created() {
    this.addressInfo();
  },
  mounted() {},
  methods: {
    //地址详情接口
    async addressInfo() {
      const { code, msg, data } = await this.http(baseUrl.getAddrInfo, {
        id: this.adId,
      });
      if (0 == code) {
        // this.info = data;
        // this.id = data.id;
        this.name = data.name;
        this.mobile = data.mobile;
        this.province = data.province;
        this.city = data.city;
        this.country = data.country;
        this.citystr = data.province + "-" + data.city + "-" + data.country;
        this.detail = data.detail;
        this.is_default = data.is_default == 1 ? true : false;
      }
    },
    //
    confirmArea(e) {
      this.citystr = e[0].name + "-" + e[1].name + "-" + e[2].name;
      this.province = e[0].name;
      this.city = e[1].name;
      this.district = e[2].name;
      this.isPopup = false;
    },
    //更改提交
    async AddrInfo() {
      const { code, msg, data } = await this.http(baseUrl.modifyAddrInfo, {
        id: this.adId,
        name: this.name,
        mobile: this.mobile,
        province: this.province,
        city: this.city,
        country: this.country,
        detail: this.detail,
        is_default: this.is_default ? 1 : 0,
      });
      this.toast(msg);
      if (0 == code) {
        setTimeout(() => {
          this.closeWin();
        }, 500);
      }
    },
    //删除
    async delAdrs() {
      const { code, msg, data } = await this.http(baseUrl.delAddress, {
        id: this.adId,
      });
      this.toast(msg);
      if (0 == code) {
        setTimeout(() => {
          this.closeWin();
        }, 500);
      }
    },
  },
};
</script> <style  scoped>
</style>
