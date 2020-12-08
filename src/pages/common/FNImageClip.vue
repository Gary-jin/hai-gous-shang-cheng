<template>
  <div class="flex_colB flex_items_stretch VH_100">
    <div id="bottomBar" class="flex_row_between flex_shrink_0 color_fff bg_000">
      <span @click="$root.closeWin()" class="P_3">取消</span>
      <span @click="resetFNImageClip" class="P_3">重置</span>
      <span @click="saveFNImageClip" class="P_3">确认</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FNImageClip",
  data() {
    return {
      FNImageClip: api.require("FNImageClip"),
      Base64: require("js-base64").Base64,
    };
  },
  mounted() {
    this.openFNImageClip(api.pageParam.imgPath);
    this.clearOutFile("fs://imageClip/image.png");
  },
  methods: {
    clearOutFile: function (path) {
      var fs = api.require("fs");

      function isFile(path) {
        fs.exist(
          {
            path: path,
          },
          function (ret, err) {
            if (ret.exist && !ret.directory) {
              removeFile(path);
            }
          }
        );
      }

      function removeFile(path) {
        fs.remove(
          {
            path: path,
          },
          function (ret, err) {
            if (ret.status) {
              console.log(JSON.stringify(ret));
            } else {
              console.log(JSON.stringify(err));
            }
          }
        );
      }
    },
    openFNImageClip: function (srcPath) {
      var that = this;
      this.FNImageClip.open(
        {
          rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h:
              api.winHeight - document.querySelector("#bottomBar").offsetHeight,
          },
          srcPath: srcPath,
          style: {
            mask: "rgba(0,0,0,.7)",
            clip: {
              w: api.winWidth - 100,
              h: api.winWidth - 100,
              x: 50,
              y:
                (api.winHeight -
                  document.querySelector("#bottomBar").offsetHeight) /
                  2 -
                (api.winWidth - 100) / 2,
              borderColor: "#0f0",
              borderWidth: 1,
              appearance: "rectangle",
            },
          },
          fixedOn: api.frameName,
        },
        function (ret, err) {
          if (ret) {
            console.log(JSON.stringify(ret));
          } else {
            console.log(JSON.stringify(err));
          }
        }
      );
    },
    saveFNImageClip: function () {
      var that = this;
      this.FNImageClip.save(
        {
          destPath: "fs://imageClip/image.png",
          copyToAlbum: false,
          quality: 1,
        },
        (ret, err) => {
          if (ret && ret.destPath) {
            // console.log(that.Base64.encode(ret.destPath))
            // that.Base64.encode(ret.destPath)
            getImgToBase64(ret.destPath, function (base64Img) {
              api.sendEvent({
                name: api.pageParam.eventName,
                extra: base64Img,
              });
              api.closeWin();
            });
            // api.sendEvent({
            // 	name: api.pageParam.eventName,
            // 	extra: that.Base64.encode(ret.destPath)
            // });
            // api.closeWin();
          }
        }
      );
      //   function getBase64Image(img) {
      //     var canvas = document.createElement("canvas");
      //     canvas.width = img.width;
      //     canvas.height = img.height;
      //     var ctx = canvas.getContext("2d");
      //     ctx.drawImage(img, 0, 0, img.width, img.height);
      //     var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      //     var dataURL = canvas.toDataURL("image/" + ext);
      //     return dataURL;
      //   }

      //   var image = new Image();
      //   image.src = img;
      //   image.onload = function() {
      //     var base64 = getBase64Image(image);
      //     console.log(base64);
      //   };
      function getImgToBase64(url, callback) {
        var canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d"),
          img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        console.log(img.src);
        // callback(
        //   "http://qhapjzy5u.hb-bkt.clouddn.com/e3f0797d39cdfad12b6ad94d34540729.png"
        // ); //img.src);
        // return;
        img.onload = function () {
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/jpg");
          console.log(JSON.stringify(dataURL));
          callback(dataURL);
          canvas = null;
        };
        // console.log(JSON.stringify(url));
      }
    },
    closeFNImageClip: function () {
      this.closeWin();
      this.FNImageClip.close();
    },
    resetFNImageClip: function () {
      this.FNImageClip.reset();
    },
  },
};
</script>

<style scoped>
</style>
