<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '反馈' }"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_2">
      <div class="flex_row_between flex_wrap">
        <div
          class="PLR_2 PLR_3 MB_2 MLR_1 textC P_1"
          v-for="(item, index) in Problem"
          :key="index"
          @click="checked = index"
          :class="checked == index ? 'color_fff bg_999 ' : 'color_999 bg_eee'"
        >
          {{ item }}
        </div>
      </div>
      <div class="P_1">
        <textarea
          name=""
          placeholder="请输入您的宝贵意见"
          v-model="content"
          class="D_block W_100 H_40vw bg_f2f2f2 B_radius_5 P_2"
        ></textarea>
      </div>
      <div class="MTB_2 flex_rowL">
        <template v-for="(item, index) in imgarr">
          <div
            class="VWH_20 color_999 flex_colC B_1_bbb ML_1 relative"
            :key="index"
          >
            <img :src="item.img" alt="" class="VWH_20" />
            <span
              @click="delimg(index)"
              class="iconfont iconguanbi D_block absoluteTR fontS_20 M_1"
            ></span>
          </div>
        </template>

        <div
          class="VWH_20 color_999 flex_colC B_1_bbb ML_1"
          style="border-style: dashed"
          @click="changeimg"
          v-show="imgarr.length < 3"
        >
          <div class="iconpaizhao iconfont fontS_30 B_radius_10"></div>
          <span>上传图片</span>
        </div>
      </div>
      <div class="bg_FF0040 P_2 color_fff textC MT_10" @click="goodsOpinion">
        提交反馈
      </div>
    </div>
  </div>
</template> 
<script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed);
export default {
  components: { viaHeader },
  name: "goodFeedback",
  data() {
    return {
      // feedarr: [
      //   "优惠券问题",
      //   "价格不符",
      //   "其他",
      //   "图片与商品不符",
      //   "无法分享商品/兑换优惠券",
      // ],
      imgarr: [
        // {
        //   img: "",
        //   flag: false,
        // },
        // {
        //   img: "",
        //   flag: false,
        // },
        // {
        //   img: "",
        //   flag: false,
        // },
      ],
      checked: 0,
      content: "",
      goods_id: api.pageParam.goods_id,
      type: api.pageParam.type,
    };
  },
  asyncComputed: {
    Problem: {
      async get() {
        const { code, msg, data } = await this.http(baseUrl.getProblem);
        return data;
      },
      default() {
        return [];
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    changeimg() {
      this.getSystemAuth("photos", () => {
        this.uploadimg();
      });
    },
    async uploadimg() {
      var that = this;
      // imgBasetopath();

      let info = await shangImg();
      const { code, msg, data } = await that.http(baseUrl.imgBaseUpload, {
        imgbase: info.base64Data,
      });
      if (0 == code) {
        let obj = {
          img: data,
          flag: false,
        };
        this.imgarr.push(obj);
      }
      // let obj = {
      //   img: "data",
      //   flag: false,
      // };
      // this.imgarr.push(obj);
      async function shangImg() {
        return new Promise((resolve, reject) => {
          api.getPicture(
            {
              sourceType: "album",
              encodingType: "jpg",
              mediaValue: "pic",
              destinationType: "base64",
              allowEdit: true,
              quality: 100,
              targetWidth: 720,
              targetHeight: 600,
              saveToPhotoAlbum: false,
            },
            function (ret, err) {
              if (ret) {
                resolve(ret);
              } else {
                reject(err);
              }
            }
          );
        });
      }
    },

    delimg(ids) {
      this.imgarr.splice(ids, 1);
    },

    //提交反馈
    async goodsOpinion() {
      let imgarr = this.imgarr.map((item) => item.img);
      // lcog
      const { code, msg, data } = await this.http(baseUrl.goodsOpinion, {
        typename: this.Problem[this.checked],
        image: imgarr.join(),
        content: this.content,
        goods_id: this.goods_id,
        type: this.type,
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
