const payMethod = {
    methods: {
        // 支付宝支付
        aliPay: function (params) {
            return new Promise((resolve, reject) => {
                var that = this;
                var aliPayTradePlus = api.require("aliPayTradePlus");
                aliPayTradePlus.payOrder(
                    {
                        orderInfo: params,
                    }, (ret, err) => {
                        if (ret.code == 9000) {
                            // if (true) {
                            resolve(ret.code)
                        } else {
                            reject(`ret:${JSON.stringify(ret)}\nerr:${JSON.stringify(err)}`)
                            //     // that.toast("支付失败");
                        }
                    }
                );
            })

        },
        //微信支付
        wxPay: function (params) {
            return new Promise((resolve, reject) => {
                var that = this;
                let stringPid =  params.partnerid + ''
                var wxPay = api.require("wxPayPlus");
                wxPay.payOrder(
                    {
                        apiKey: params.appid,
                        orderId: params.prepayid,
                        // mchId: params.partnerid,
                        mchId: stringPid,
                        nonceStr: params.noncestr,
                        timeStamp: params.timestamp,
                        package: params.package,
                        sign: params.sign,
                    },function(ret, err)  {
                        if (ret.status) {
                            resolve(ret.status)

                        } else {
                            // reject()
                            reject(`ret:${JSON.stringify(ret)}\nerr:${JSON.stringify(err)}`)

                        }
                    }
                );

            })
        },
        paySuccess() {
            // return Promise(())
            setTimeout(() => {
                this.closeWin(); // this.close
                // this.openWin('tab3-orderList1');
            }, 1000);
        },

    }
}

export default payMethod