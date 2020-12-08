<template>
  <div class="fixedTBLR bg_rgba_000 flex_colB flex_items_stretch" @click="closeFrame()">
    <div @click.stop>
      <div class="W_100 bg_rgba_fff">
        <div class="color_666 textC PT_2">分享</div>
        <div class="flex_row_around PTB_6 W_100">
          <div
            @click.stop="goShare(index)"
            class="flex_colC"
            v-for="(item, index) in navArr"
            :key="index"
            v-if="isMayShare(index)"
          >
            <img :src="item.icon" class="VWH_8 flex_shrink_0" alt srcset />
            <span class="color_666 fontS_12 PT_1">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div @click="closeFrame()" class="W_100 bg_fff PTB_3 textC">取消</div>
    </div>
  </div>
</template>

<script>
import { isString, isIos } from "@/js/via.js";
import AsyncComputed from "vue-async-computed";
import sharelogo from "@/image/logo.png";
Vue.use(AsyncComputed);
export default {
  name: "share",
  data() {
    return {
      sharelogo: sharelogo,
      navArr: [
        {
          title: "微信",
          icon: require("@/image/share-2.png"),
          config: "retMapSessionParams",
        },
        {
          title: "朋友圈",
          icon: require("@/image/share-4.png"),
          config: "retMapWXTimelineParams",
        },
        // {
        //     title: '微信收藏',
        //     icon: 'share_WXCollect.png',
        //     config:'retMapWXFavoriteParams'
        // },
        // {
        //     title: 'QQ',
        //     icon: 'icon_qq.png',
        //     config: 'retMapQFriendParams'
        // },
        // {
        //     title: 'QQ空间',
        //     icon: 'share_qqKongjian.png',
        //     config:'retMapQZoneParams'
        // },
        // {
        //     title: '微博',
        //     icon: 'share_weibo.png',
        //     config:'retMapWeiBoParams'
        // },
        // {
        //     title: '更多',
        //     icon: 'share_more.png',
        //     config:'retMapAllParams'
        // }
        // {
        //   title: "保存图片",
        //   icon: require("@/image/icon_download.png"),
        //   config: "retMapSaveImageParams"
        // }
      ],
      type: api.pageParam.type || "image",
      sendEventName: api.pageParam.sendEventName || "shareEvent",
      shareObj: api.pageParam.params || {
        title: "",
        url: "",
        imageArr: [],
        thumb: "",
        des: "",
        text: "",
        path: "", //小程序
        appId: "", //小程序
      },
    };
  },

  //异步计算属性插件
  asyncComputed: {
    //返回下载后的视频
    pathVideo: {
      lazy: true,
      get: function () {
        return this.downloadFile(this.shareObj.url).then(function (url) {
          return url;
        });
      },
      shouldUpdate() {
        return this.type === "video" && this.shareObj.url;
      },
      default: function () {
        return "";
      },
    },
    //返回下载后的图片数组
    pathImage: {
      lazy: true,
      get: function () {
        return this.downloadFile(this.shareObj.imageArr).then(function (arr) {
          console.log(JSON.stringify(arr));
          return {
            arr: arr,
            str: arr.join(","),
          };
        });
      },
      shouldUpdate() {
        return this.shareObj.imageArr && this.shareObj.imageArr.length;
      },
      default: function () {
        return {
          arr: [],
          str: "",
        };
      },
    },
    //返回下载后缩略图
    pathThumb: {
      lazy: true,
      get: function () {
        return this.downloadFile(this.shareObj.thumb).then(function (url) {
          return url;
        });
      },
      shouldUpdate() {
        return this.shareObj.thumb;
      },
      default: function () {
        return "";
      },
    },
  },
  computed: {
    // 返回 微信分享所需要的参数
    retMapSessionParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "url":
          tempObj = {
            params: {
              scene: "session",
              title: this.shareObj.title,
              thumb: this.pathThumb,
              description: this.shareObj.des || this.shareObj.text || "",
              contentUrl: this.shareObj.url,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareWebpage",
          };
          // console.log('dddddddd'+JSON.stringify(tempObj));

          break;
        case "image":
          if (this.pathImage.arr.length === 1) {
            tempObj = {
              params: {
                scene: "session",
                contentUrl: this.pathImage.str,
              },
              fnParent: this.wxShare, //入口
              fnChildStr: "shareImage",
            };
          } else {
            tempObj = {
              params: {
                imgPaths: this.pathImage.str,
                forResult: true,
                sendPattern: isIos ? "ALL" : "ONLY",
                app: "wxFriend",
              },
              fnParent: this.allShare, //入口
              fnChildStr: "shareImgsTo",
            };
          }
          break;
        case "text":
          tempObj = {
            params: {
              content: this.shareObj.text || this.shareObj.des || "",
              sendPattern: "ONLY",
              app: "wxFriend",
            },
            fnParent: this.allShare, //入口
            fnChildStr: "shareTextTo",
          };
          break;
        case "video":
          tempObj = {
            params: {
              scene: "session",
              title: this.shareObj.title,
              thumb: this.pathThumb,
              description: this.shareObj.des,
              contentUrl: this.shareObj.url,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareVideo",
          };
          break;
        case "miniProgram":
          tempObj = {
            params: {
              scene: "session",
              title: this.shareObj.title,
              description: this.shareObj.des,
              thumb: this.pathThumb,
              webpageUrl: this.shareObj.url,
              userName: this.shareObj.appId,
              path: this.shareObj.path,
              miniProgramType: "preview", //版本 正式 体验 开发
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareProgram",
          };
          break;
      }
      return tempObj;
    },
    // 返回 微信朋友圈分享所需要的参数
    retMapWXTimelineParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "url":
          tempObj = {
            params: {
              scene: "timeline",
              title: this.shareObj.title,
              thumb: this.pathThumb,
              description: this.shareObj.des,
              contentUrl: this.shareObj.url,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareWebpage",
          };
          break;
        case "image":
          if (this.pathImage.arr.length === 1) {
            tempObj = {
              params: {
                scene: "timeline",
                contentUrl: this.pathImage.str,
              },
              fnParent: this.wxShare, //入口
              fnChildStr: "shareImage",
            };
          } else {
            tempObj = {
              params: {
                imgPaths: this.pathImage.str,
                forResult: true,
                sendPattern: isIos ? "ALL" : "ONLY",
                app: "wxCircle",
              },
              fnParent: this.allShare, //入口
              fnChildStr: "shareImgsTo",
            };
          }
          break;
        case "text":
          tempObj = {
            params: {
              scene: "timeline",
              text: this.shareObj.text,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareText",
          };
          break;
        case "video":
          tempObj = {
            params: {
              scene: "timeline",
              title: this.shareObj.title,
              thumb: this.pathThumb,
              description: this.shareObj.des,
              contentUrl: this.shareObj.url,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareVideo",
          };
          break;
      }
      return tempObj;
    },
    // 返回 微信收藏分享所需要的参数
    retMapWXFavoriteParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "url":
          tempObj = {
            params: {
              scene: "favorite",
              title: this.shareObj.title,
              thumb: this.pathThumb,
              description: this.shareObj.des,
              contentUrl: this.shareObj.url,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareWebpage",
          };
          break;
        case "image":
          if (this.pathImage.arr.length === 1) {
            tempObj = {
              params: {
                scene: "favorite",
                contentUrl: this.pathImage.str,
              },
              fnParent: this.wxShare, //入口
              fnChildStr: "shareImage",
            };
          }
          break;
        case "text":
          break;
        case "video":
          tempObj = {
            params: {
              scene: "favorite",
              title: this.shareObj.title,
              thumb: this.pathThumb,
              description: this.shareObj.des,
              contentUrl: this.shareObj.url,
            },
            fnParent: this.wxShare, //入口
            fnChildStr: "shareVideo",
          };
          break;
      }
      return tempObj;
    },
    // 返回 QQ好友分享所需要的参数
    retMapQFriendParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "url":
          tempObj = {
            params: {
              type: "QFriend",
              title: this.shareObj.title,
              imgUrl: this.shareObj.thumb,
              description: this.shareObj.des,
              url: this.shareObj.url,
            },
            fnParent: this.qqShare, //入口
            fnChildStr: "shareNews",
          };
          break;
        case "image":
          tempObj = {
            params: {
              imgPaths: this.pathImage.str,
              forResult: true,
              sendPattern: isIos ? "ALL" : "ONLY",
              description: this.shareObj.des || this.shareObj.text || "",
              app: "qqFriend",
            },
            fnParent: this.allShare, //入口
            fnChildStr: "shareImgsTo",
          };
          break;
        case "text":
          tempObj = {
            params: {
              text: this.shareObj.text,
            },
            fnParent: this.qqShare, //入口
            fnChildStr: "shareText",
          };
          break;
        case "video":
          break;
      }
      return tempObj;
    },
    // 返回 QQ空间分享所需要的参数
    retMapQZoneParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "url":
          tempObj = {
            params: {
              type: "QZone",
              title: this.shareObj.title,
              imgUrl: this.shareObj.thumb,
              description: this.shareObj.des,
              url: this.shareObj.url,
            },
            fnParent: this.qqShare, //入口
            fnChildStr: "shareNews",
          };
          break;
        case "image":
          // tempObj = {
          //     params : {
          //         type : 'QZone',
          //         imgPath: this.shareObj.imageArr[0]
          //     },
          //     fnChildStr: 'shareImage'
          // }
          tempObj = {
            params: {
              imgPaths: this.pathImage.str,
              forResult: true,
              sendPattern: isIos ? "ALL" : "ONLY",
              description: this.shareObj.des || this.shareObj.text || "",
              app: "qqZone",
            },
            fnParent: this.allShare, //入口
            fnChildStr: "shareImgsTo",
          };
          break;
        case "text":
          tempObj = {
            params: {
              text: this.shareObj.text,
            },
            fnParent: this.qqShare, //入口
            fnChildStr: "shareText",
          };
          break;
        case "video":
          break;
      }
      return tempObj;
    },
    // 返回 微博分享所需要的参数
    retMapWeiBoParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "url":
          tempObj = {
            params: {
              title: this.shareObj.title,
              text: this.shareObj.text,
              description: this.shareObj.des,
              thumb: this.pathThumb,
              contentUrl: this.shareObj.url,
            },
            fnParent: this.weiBoShare, //入口
            fnChildStr: "shareWebPage",
          };
          break;
        case "image":
          // tempObj = {
          //     params : {
          //         text: this.shareObj.text || '',
          //         imgPath: this.shareObj.imageArr[0]
          //     },
          //     fnChildStr: 'shareImage'
          // }
          tempObj = {
            params: {
              imgPaths: this.pathImage.str,
              forResult: true,
              sendPattern: isIos ? "ALL" : "ONLY",
              description: this.shareObj.des || this.shareObj.text || "",
              app: "xinLang",
            },
            fnParent: this.allShare, //入口
            fnChildStr: "shareImgsTo",
          };
          break;
        case "text":
          tempObj = {
            params: {
              text: this.shareObj.text || this.shareObj.des || "",
            },
            fnParent: this.weiBoShare, //入口
            fnChildStr: "shareText",
          };
          // tempObj = {
          //     params : {
          //         content: this.shareObj.text || this.shareObj.des || '',
          //         app:'xinLang'
          //     },
          //     fnParent: this.allShare, //入口
          //     fnChildStr: 'shareTextTo'
          // }
          break;
        case "video":
          tempObj = {
            params: {
              text: this.shareObj.text,
              contentUrl: this.pathVideo,
            },
            fnParent: this.weiBoShare, //入口
            fnChildStr: "shareVideo",
          };
          break;
      }
      return tempObj;
    },
    // 返回 系统分享所需要的参数
    retMapAllParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "image":
          tempObj = {
            params: {
              imgPaths: this.pathImage.str,
              sendPattern: "ALL",
              dialogTitle: "分享到",
              needDecodePath: true,
            },
            fnParent: this.allShare, //入口
            fnChildStr: "shareImgsTo",
          };
          break;
        case "text":
          tempObj = {
            params: {
              content: this.shareObj.text,
              sendPattern: "ALL",
              dialogTitle: "分享到",
              needDecodePath: true,
            },
            fnParent: this.allShare, //入口
            fnChildStr: "shareTextTo",
          };
          break;
      }
      return tempObj;
    },
    //返回 保存图片所需的参数
    retMapSaveImageParams: function () {
      var tempObj = {};
      switch (this.type) {
        case "image":
          tempObj = {
            params: this.pathImage.arr,
            fnParent: this.saveMediaToAlbum,
            fnChildStr: ["saveMediaToAlbum"],
          };
          break;
      }
      return tempObj;
    },
  },
  methods: {
    shareCallBack: function (status = false) {
      api.sendEvent({
        name: this.sendEventName,
        extra: { type: "shareCallBack", status },
      });
    },
    closeFrame: function () {
      api.sendEvent({
        name: "closeScreenShotImageEvent",
      });
      api.closeFrame();
    },
    //过滤不受支持的分享
    isMayShare: function (idx) {
      var configStr = this.navArr[idx].config;
      return Object.keys(this[configStr]).length > 0;
    },
    //去分享
    goShare: function (idx) {
      var configStr = this.navArr[idx].config;
      var fnParent = null,
        fnChildStr = "",
        params = {};
      fnParent = this[configStr].fnParent;
      fnChildStr = this[configStr].fnChildStr;
      params = this[configStr].params;
      fnParent(fnChildStr, params);
    },
    //下载文件列表
    downloadFile: function (params) {
      var that = this;
      api.showProgress({
        title: "努力生成中...",
        text: "先喝杯茶...",
        modal: true,
      });
      if (isString(params)) {
        return download(params);
      } else {
        var asyncArr = [];
        params.forEach(function (url) {
          asyncArr.push(download(url));
        });
        return Promise.all(asyncArr);
      }

      //下载文件
      function download(url) {
        console.log(url);
        return new Promise(function (resolve) {
          api.download(
            {
              url: url,
              report: true,
              cache: false,
              allowResume: true,
            },
            function (ret, err) {
              api.hideProgress();
              // console.log(JSON.stringify(ret));
              if (ret.state === 1) {
                resolve(ret.savePath);
              }
            }
          );
        });
      }
    },
    //系统分享
    allShare: function (fnStr, params) {
      console.log(JSON.stringify(params));
      var inShare = api.require("inShare");
      inShare[fnStr](params, (ret, err) => {
        console.log(JSON.stringify(ret));
        console.log(JSON.stringify(err));
        if (ret.status) {
          this.shareCallBack(true);
        } else {
          this.shareCallBack();
        }
      });
    },
    //QQ 分享
    qqShare: function (fnStr, params) {
      console.log(JSON.stringify(params));
      var qq = api.require("QQPlus");
      qq.installed((ret, err) => {
        if (ret.status) {
          qq[fnStr](params, (res, errs) => {
            console.log(JSON.stringify(res));
            console.log(JSON.stringify(errs));
            if (res.status) {
              this.shareCallBack(true);
            } else {
              this.shareCallBack();
            }
          });
        } else {
          api.toast({
            msg: "没有安装QQ,无法进行分享",
            duration: 2000,
            location: "bottom",
          });
        }
      });
    },
    //微信分享
    wxShare: function (fnStr, params) {
      // alert(fnStr);
      params.thumb = "widget://img/sharelogo.png";
      // alert(JSON.stringify(params));
      // params.thumb = "fs:/" + params.thumb;
      console.log("dddd" + JSON.stringify(params));

      var wx = api.require("wxPlus");
      wx.isInstalled((ret, err) => {
        if (ret.installed) {
          wx[fnStr](params, (res, errs) => {
            console.log(JSON.stringify(res));
            console.log(JSON.stringify(errs));
            if (res.status) {
              this.shareCallBack(true);
            } else {
              this.shareCallBack();
            }
          });
        } else {
          api.toast({
            msg: "没有安装微信,无法进行分享",
            duration: 2000,
            location: "bottom",
          });
        }
      });
    },
    //微博分享
    weiBoShare: function (fnStr, params) {
      console.log(JSON.stringify(params));
      var weiboPlus = api.require("weiboPlus");
      weiboPlus.isInstalled((ret, err) => {
        if (ret.status) {
          weiboPlus[fnStr](params, (res, errs) => {
            console.log(JSON.stringify(res));
            console.log(JSON.stringify(errs));
            if (res.status) {
              this.shareCallBack(true);
            } else {
              this.shareCallBack();
            }
          });
        } else {
          api.toast({
            msg: "没有安装微博,无法进行分享",
            duration: 2000,
            location: "bottom",
          });
        }
      });
    },
    //保存图片
    saveMediaToAlbum: function (fnStr, arr) {
      console.log(JSON.stringify(arr));
      var sign = 1;
      arr.forEach(function (url) {
        api[fnStr](
          {
            path: url,
          },
          function (ret, err) {
            if (ret && ret.status && sign == arr.length) {
              api.toast({
                msg: "保存成功",
                duration: 2000,
                location: "bottom",
              });
            }
            sign++;
          }
        );
      });
    },
  },
};
</script>

<style>
/* @import "~@/css/common.css"; */
.bg_rgba_fff {
  background: rgba(255, 255, 255, 0.9);
}
</style>
