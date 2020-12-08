/**
 * chk 2020720
 * 用于图片上传
 * */
const uoloadImg = {
    data() {
        return {

        }
    },
    methods: {
        //清楚路径
        clearImg(type) {
            this[type] = "";
        },
        //获取 BASE64 = 》 HTTp
        getupload(type) {
            this.getSystemAuth("photos", () => {
                this.gopic().then(ret => {
                    console.log(JSON.stringify(ret));

                    // return ret
                    // const { code, msg, data } = await this.http(baseUrl.imgBaseUpload,{
                    //     imgbase:ret.
                    // })    
                    // console.log(ret.data);
                    // api.ajax(
                    //     {
                    //         url: upload,
                    //         method: "post",
                    //         data: {
                    //             files: {
                    //                 files: ret.data
                    //             }
                    //         }
                    //     },
                    //     (ret, err) => {
                    //         if (ret) {
                    //             this[type] = ret.data;
                    //         }
                    //     }
                    // );
                }).catch(err => {
                    console.log(JSON.stringify(err));
                });
            });
        },
        //获取=图片
        gopic() {
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
                        saveToPhotoAlbum: false
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
}
export default uoloadImg