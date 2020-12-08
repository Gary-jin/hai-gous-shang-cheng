<template>
  <div class="flex_colB flex_items_stretch H_100vh bg_fff">
    <div v-if="shangjia" id="tabbar" class="flex_rowC flex_shrink_0">
      <div @click="switchNavBar(idx)" v-for="(item, idx) of navArr" :key="idx" class="W_5 flex_grow_1 flex_colT PTB_1">
        <img :src="navBar_ac === idx ? item.active : item.normal" style="width: 22px; height: 22px" alt/>
        <span :class="navBar_ac === idx ? 'color_D4080A' : 'color_666'" class="" >{{ item.title }}</span>
      </div>
    </div>
    <div v-else id="tabbar" class="flex_rowC flex_shrink_0">
      <div @click="switchNavBar(idx)" v-for="(item, idx) of navArr" :key="idx" v-if="idx != 0 && idx != 1 && idx != 3" class="W_5 flex_grow_1 flex_colT PTB_1">
        <img :src="navBar_ac === idx ? item.active : item.normal" style="width: 22px; height: 22px" alt/>
        <span :class="navBar_ac === idx ? 'color_D4080A' : 'color_666'" class="" >{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import tool from "@/js/tool";
import { ip, default as baseUrl } from "@/js/const";
export default {
  data() {
    return {
      topBarTextColor: "light",
      navArr: [
        {
          title: "购物世界",
          normal: require("@/image/tabbar/1-1.png"),
          active: require("@/image/tabbar/1-2.png"),
        },
        {
          title: "金币商城",
          normal: require("@/image/tabbar/2-1.png"),
          active: require("@/image/tabbar/2-2.png"),
        },
        {
          title: "家电专区",
          normal: require("@/image/tabbar/3-1.png"),
          active: require("@/image/tabbar/3-2.png"),
        },
        {
          title: "团油",
          normal: require("@/image/tabbar/4-1.png"),
          active: require("@/image/tabbar/4-2.png"),
        },
        {
          title: "个人中心",
          normal: require("@/image/tabbar/5-1.png"),
          active: require("@/image/tabbar/5-2.png"),
        },
      ],
      navBar_ac: 0,
      shangjia: true
    };
  },
  mixins: [tool],
  created() {},
  mounted() {
    // this.initAdHome();
    this.concealed()
  },
  methods: {
    concealed() {
        let sysType;
        if(api.systemType == 'ios'){
            sysType = {type:'ios'}
        } else{
            sysType = ''
        }
        this.http(baseUrl.get_is_display,sysType).then(res => {
            if(res.data.is_display == false ) {
                this.shangjia = false
                this.initAdHome();
                this.navBar_ac = 2
            } else {
                this.initAdHome();
            }
        })
    },
    //初始化监听
    initAdHome() {
      this.funIniGroup();
      this.appVersion();
      //禁止返回
      this.$ac.addEventListener(
        {
          name: "keyback",
        },
        (ret, err) => {
          this.dbClickkExit();
        }
      );
      //Window 离开到屏幕的事件
      this.$ac.addEventListener(
        {
          name: "viewdisappear",
        },
        (ret, err) => {}
      );

      //Window 显示到屏幕的事件
      api.addEventListener(
        {
          name: "viewappear",
        },
        (ret, err) => {
          this.switchNavBar(this.navBar_ac);
        }
      );
      this.setTopBarTextColor();
    },
    async appVersion() {
      // alert(JSON.stringify(test));
      // alert(baseUrl.appVersion);
      const { code, msg, data } = await this.http(baseUrl.appVersion);
      if (0 == code) {
        // !
        if (
          !ip.includes("vmall99.com") &&
          this.compare(data.version, this.$ac.appVersion)
        ) {
          this.openFrame("common-versionToast", {
            data,
          });
          this.handleGlobalData("vsInfo", data);
        } else {
          // this.toast("暂无更新");
        }
      }
    },
    /**
     * @description: 引入主页面
     */
    funIniGroup() {
      this.setStorage('shangjia','false')
      var that = this;
      var frames = [];
      for (var i = 0; i < that.navArr.length; i++) {
        if(!this.shangjia && i == 0) {
          frames.push({
            name: "basic-tab1" ,
            url: "basic-tab1.html",
            bounces: false,
            reload: true,
            bgColor: "#fff",
            pageParam: {},
          });
        }else{
          frames.push({
            name: "basic-tab" + i,
            url: "basic-tab" + i + ".html",
            bounces: false,
            reload: true,
            bgColor: "#fff",
            pageParam: {},
          });
        }
        // frames.push({
        //   name: "basic-tab" + i,
        //   url: "basic-tab" + i + ".html",
        //   bounces: false,
        //   reload: true,
        //   bgColor: "#fff",
        //   pageParam: {},
        // });
      }
      this.$ac.openFrameGroup({
        name: "basic-home",
        scrollEnabled: false,
        rect: {
          x: 0,
          y: 0,
          w: this.$ac.winWidth,
          h: document.querySelector("#tabbar").offsetTop,

          // h:
          // this.$ac.winHeight - document.querySelector("#tabbar").offsetHeight,
        },
        preload: frames.length,
        frames: frames,
      });
      this.navBar_ac = 0;
      this.$ac.setFrameGroupIndex({
        name: "home",
        index: 0,
        reload: false,
      });
    },
    //切换底部tab栏
    switchNavBar: function (idx) {
      // 上架修改
      if(idx == 4){
          this.setStorage('shangjia','true')
          api.sendEvent({name: "payOver"});
      }

      this.navBar_ac = idx;
      this.$ac.setFrameGroupIndex({
        name: "basic-home",
        index: idx,
        reload: false,
      });
      this.$ac.execScript({
        frameName: `basic-tab${idx}`,
        script: "vm.$refs.page.initAd()",
      });
    },
  },
};
</script>

<style  scoped>
.color_D4080A {
  color: #d4080a;
}
</style>