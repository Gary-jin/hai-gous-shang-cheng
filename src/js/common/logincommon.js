import baseUrl from "@/js/const";
export default {
    // data() {
    //     return {
    //         downCount: 0
    //     }
    // },
    methods: {
        //登录
        async comitLogin() {
            const { code, msg, data } = await this.http(baseUrl.login, {
                mobile: this.mobile,
                device_id: api.deviceId,//111// api.deviceId,
            });
            // this.mobile = '';
            if (0 == code) {
                this.toast("登录中~");
                this.mobile = '';
                this.setStorage("tokenInfo", { token: data.userinfo.token });
                setTimeout(() => {
                    this.openWin("basic-home");
                }, 500);

                // mobile
            } else if (1001 == code) {
                this.send()
            } else {
                this.toast(msg);
            }
        },
        //
        async send() {
            // this.openWin('common-Account', {
            //     mobile: this.mobile,
            //     // timeEnd:60
            // })
            // return

            const { code, msg, data } = await this.http(baseUrl.send, {
                mobile: this.mobile,
            })
            if (0 == code) {
                setTimeout(() => {
                    this.openWin('common-Account', {
                        mobile: this.mobile,
                        // timeEnd:60
                    })
                }, 500)
            } else {
                this.toast(msg)
            }
        }
    }
}