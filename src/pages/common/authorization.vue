<template>
  <div class="flex_colT flex_items_stretch VW_100 VH_100">
    <!-- <via-header @click-left="closeWin()" 
		class="bg_FF1F46 BB_1_f2f2f2 flex_shrink_0 color_fff " ref="header" :center="{
		  			  text :'淘宝授权'
		  }">
    </via-header>-->
    <div class="P_4 flex_rowC BT_2 relative flex_shrink_0 header" ref="header">
      <i
        class="iconfont iconxiazai6 absolute fontS_18 PL_4"
        style="left: 0"
        @click="closeWin()"
      ></i>
      <span class="fontS_15">淘宝授权</span>
    </div>
    <div class="overflow_y H_100 flex_grow_1"></div>
  </div>
</template>

<script>
import viaHeader from "@/components/header.vue";
export default {
  name: "goodInfo",
  components: {
    viaHeader,
  },
  data() {
    return {
      // tkurl:api.pageParam.url
      topBarTextColor: "dark",
    };
  },
  created() {
    // this.$refs.header.offsetHeight
  },
  mounted() {
    var that = this;
    // alert(this.$refs.header.offsetHeight);
    
    // if(api.systemType == 'ios'){
    //   that.openWin('common-popadUrl',{webUrl:api.pageParam.url})
    // } else{
      var browser = api.require("webBrowser");
      browser.openView(
        {
          url: api.pageParam.url,
          rect: {
            x: 0,
            y: that.$refs.header.offsetHeight,
            w: "auto",
            h: "auto",
          },
        },
        function (ret, err) {}
      );

    // }
  },
  methods: {},
};
</script>

<style></style>
