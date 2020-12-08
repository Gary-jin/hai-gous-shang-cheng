//全局混入 共用方法
//国际化
// var i18n = typeof VueI18n === 'function' ? new VueI18n({
//     locale: $api.getStorage('lang') || 'zh', // 设置地区
//     messages: messages, // 设置地区信息
// }): null;
Vue.mixin({
    // i18n: i18n, //国际化
    data: function () {
        return {
            isExit: false,
            isJiami: false,
            // topBarTextColor: "light"//dark
        };
    },
    created: function () { },
    mounted: function () {
        this.setSafeArea('.header', 'top');
        this.setTopBarTextColor();
        this.fastclick(); //优化 ios 端点击延迟
    },
    methods: {
        //返回占位图
        retSketch: function (w, h) {
            var tempStr = 'https://dummyimage.com/' + w + 'x';
            if (arguments.length === 1) {
                tempStr += w;
            } else {
                tempStr += h;
            }
            return tempStr;
        },
        //设置字体颜色
        setStatusBar: function (value) {
            api.setStatusBarStyle({
                style: value,
                color: 'transparent'
            })
        },
        //页面调试工具
        pageDebug: function () {
            var styleEl = document.createElement('style');
            styleEl.classList.add('page-debug');
            styleEl.innerHTML =
                "\n                * { background-color: rgba(255,0,0,.2); }\n                * * { background-color: rgba(0,255,0,.2); }\n                * * * { background-color: rgba(0,0,255,.2); }\n                * * * * { background-color: rgba(255,0,255,.2); }\n                * * * * * { background-color: rgba(0,255,255,.2); }\n                * * * * * * { background-color: rgba(255,255,0,.2); }\n                * * * * * * * { background-color: rgba(255,0,0,.2); }\n                * * * * * * * * { background-color: rgba(0,255,0,.2); }\n                * * * * * * * * * { background-color: rgba(0,0,255,.2); }\n                * * * * * * * * * * { background-color: rgba(0,0,255,.2); }\n            ";
            document.querySelector('head').appendChild(styleEl);
        },
        // 存取 全局数据 仅在程序运行期间有效
        handleGlobalData: function (key, value) {
            var that = this;
            // console.log('handleGlobalData');

            if (value === undefined) {
                value = api.getGlobalData({
                    key: key
                }) || this[key];
            } else {
                api.setGlobalData({
                    key: key,
                    value: value
                }); //发送数据更新事件

                api.sendEvent({
                    name: 'globalDataChangeEvent',
                    extra: key
                });
            }

            this[key] = value; //监听全局数据的变化

            api.addEventListener({
                name: 'globalDataChangeEvent'
            }, function (ret, err) {
                that.handleGlobalData(ret.value);
            });
        },
        //指定frame是否打开
        isFrame: function (frameName) {
            return api.frames().some(function (item) {
                return item.name === frameName;
            });
        },
        //指定window是否打开
        isWin: function (winName) {
            return api.windows().some(function (item) {
                return item.name === winName;
            });
        },
        //指定权限是否开启
        isAuth: function (str) {
            var tempArr = api.hasPermission({
                list: [str || '']
            });
            return tempArr.length && tempArr[0].granted;
        },
        //设置当前页面导航栏字体颜色 并监听回到当前win事件
        setTopBarTextColor: function (fn) {
            if (this.topBarTextColor) {
                that = this;
                api.addEventListener({
                    name: 'viewappear'
                }, function (ret, err) {
                    api.setStatusBarStyle({
                        style: that.topBarTextColor,
                        color: 'transparent'
                    });
                    fn && fn.call(that);
                });
            }
        },
        //获取系统权限后执行fn
        getSystemAuth: function (str, fn) {
            if (this.isAuth(str)) {
                fn && fn.call(this);
            } else {
                // if (lx && lx == 1) {
                // requestPermission(str, fn);
                // } else {
                api.confirm({
                    title: '提示',
                    msg: '此操作需要获取相应系统权限,是否允许?',
                    buttons: ['确定', '取消']
                }, function (ret, err) {
                    if (ret.buttonIndex === 1) {
                        requestPermission(str, fn);
                    } else {
                        api.toast({
                            msg: '您拒绝了相应系统权限申请',
                            duration: 2000,
                            location: 'bottom'
                        });
                    }
                });
                // }

            }
            var that = this;

            function requestPermission(str, fn) {
                str && api.requestPermission({
                    list: [str],
                    code: 1
                }, function (ret, err) {
                    console.log(JSON.stringify(ret));
                    if (api.systemType === 'ios') {
                        api.addEventListener({ //回到app时触发 解决ios 授权完成授权状态没有改变的问题
                            name: 'resume'
                        }, function (res, err) {
                            getSystemAuth(str, fn);
                            api.removeEventListener({
                                name: 'resume'
                            }); //移除事件监听
                        });
                    } else {
                        if (ret.list[0].granted) {
                            fn && fn.call(that);
                        } else {
                            api.confirm({
                                title: '提示',
                                msg: '您拒绝了系统权限请求,这样将不能使用相关服务,是否手动开启?',
                                buttons: ['确定', '取消']
                            }, function (ret, err) {
                                if (ret.buttonIndex === 1) {
                                    requestPermission(str, fn);
                                }
                            });
                        }
                    }

                });
            }
        },
        //去除提示 获取权限
        getSystemAuth1: function (str, fn) {
            var that = this;
            if (this.isAuth(str)) {
                fn && fn.call(this);
            } else {
                requestPermission(str, fn);
            }

            function requestPermission(str, fn) {
                str && api.requestPermission({
                    list: [str],
                    code: 1
                }, function (ret, err) {
                    console.log(JSON.stringify(ret));
                    if (api.systemType === 'ios') {
                        api.addEventListener({ //回到app时触发 解决ios 授权完成授权状态没有改变的问题
                            name: 'resume'
                        }, function (res, err) {
                            getSystemAuth1(str, fn);
                            api.removeEventListener({
                                name: 'resume'
                            }); //移除事件监听
                        });
                    } else {
                        if (ret.list[0].granted) {
                            fn && fn.call(that);
                        } else {
                            api.confirm({
                                title: '提示',
                                msg: '您拒绝了系统权限请求,这样将不能使用相关服务,是否手动开启?',
                                buttons: ['确定', '取消']
                            }, function (ret, err) {
                                if (ret.buttonIndex === 1) {
                                    requestPermission(str, fn);
                                }
                            });
                        }
                    }

                });
            }
        },
        //弹窗
        toast: function (params, fn) {
            if (typeof params === 'string') {
                api.toast({
                    msg: params,
                    location: 'bottom',
                    duration: 2000
                });
                // if (typeof fn === 'function') {
                //     setTimeout(function () {
                //         fn()
                //     }, 2000);
                // }
            } else {
                api.toast({
                    msg: params.msg,
                    location: params.dir || 'bottom',
                    duration: params.time || 2000
                });
            }
        },
        //下拉刷新 上拉加载 数据封装
        loadUtils: function (data, list, length) {
            if (this.upLoading) {
                this[list] = this[list].concat(data);
                this.upLoading = false;
            } else {
                this[list] = data;
                this.downLoading = false;
            }

            if (data.length < (length || 10)) {
                this.finished = true;
            } else {
                this.finished = false;
            }
        },
        //300ms 延迟优化
        fastclick: function () {
            if (typeof FastClick === "function") {
                FastClick.attach(document.body);
            } else {
                console.log("当前页面未引入fastclick");
            }
        },
        //顶部,底部安全区 
        setSafeArea: function (el, dir) {
            if (document.querySelector(el)) {
                var tempStr = 'padding-' + dir;
                document.querySelector(el).style[tempStr] = api.safeArea[dir] + 'px';
                return api.safeArea[dir];
            } else {
                console.log('没有找到指定dom元素');
            }
        },
        //页面跳转
        openWin: function (name, pageParam, option) {
            option = Object.assign({
                name: name,
                url: name + '.html',
                pageParam: pageParam || {},
                useWKWebView:true,
                allowEdit: true
            }, option || {});
            api.openWin(option);
        },
        //打开frame
        openFrame: function (name, pageParam, option) {
            option = Object.assign({
                name: name,
                url: name + '.html',
                pageParam: pageParam || {},
                allowEdit: true,
                useWKWebView:true,
                bgColor: 'rgba(0,0,0,0)'
            }, option || {});
            api.openFrame(option);
        },
        //关闭window
        closeWin: function (name, animation) {
            api.closeWin({
                name: name || '',
                animation: animation || {
                    type: "push",
                    subType: "from_left", //动画子类型（详见动画子类型常量）
                    //动画类型（详见动画类型常量）
                    duration: 300 //动画过渡时间，默认300毫秒

                }
            });
        },
        //关闭frame
        closeFrame: function (name, animation) {
            api.closeFrame({
                name: name || '',
                animation: animation || {
                    type: "fade",
                    //动画类型（详见动画类型常量）
                    duration: 300 //动画过渡时间，默认300毫秒

                }
            });
        },
        //ajax
        http: function (url, params, method, type) {
            var that = this;
            var bodyobj = {};
            type = type || 0;
            params = params || {};
            if (type === 0) {
                api.showProgress({
                    title: '努力加载中',
                    text: '请稍后...',
                    modal: true
                });
            }
            console.log(JSON.stringify(params));
            if (that.isJiami) {
                // console.log(JSON.stringify(params));
                var key = getKey(); //生成随机key
                var rsa = RSA(key); //生成对key 进行加密
                params = AESEnc(key, JSON.stringify(params)); //对传入的参数进行加密
                bodyobj.body = {
                    _rsa: rsa,
                    _cipher: params
                }
            } else {
                bodyobj.body = params;
            }
            // console.log(JSON.stringify(bodyobj));
            var tokenInfo = this.getStorage('tokenInfo');
            // console.log(JSON.stringify(tokenInfo));

            var headers = {
                'Content-Type': 'application/json;charset=utf-8',
                'token': tokenInfo && tokenInfo.token ? tokenInfo.token : ''
            };
            console.log(JSON.stringify(headers));

            // console.log('当前页面接口url:' + url +'&&thken&&'+tokenInfo.token+ '&&params:' + JSON.stringify(bodyobj));
            return new Promise(function (resolve, reject) {
                api.ajax({
                    url: url,
                    method: method || 'post',
                    headers: headers,
                    // timeout: 60,
                    data: {
                        body: bodyobj.body
                    }
                }, function (ret, err) {
                    api.hideProgress();
                    // console.log('当前页面打开方式: ' + (api.frameName.length ? 'frame' : 'window'));
                    // console.log('当前页面文件名: ' + (api.frameName.length ? api.frameName : api.winName));
                    // console.log('当前页面接口url:' + url + '&&params:' + JSON.stringify(bodyobj) + '&&res:' + JSON.stringify(ret));
                    // console.log('当前页面接口url:' + url + '&&params:' + JSON.stringify(bodyobj) + '&&err:' + JSON.stringify(err));
                    // console.log(JSON.stringify(err));

                    if (ret) {
                        if (that.isJiami) {
                            ret.data = JSON.parse(AESDec(key, ret.data)); //解密
                            console.log('当前页面接口url:' + url + 'params1' + JSON.stringify(params) + '&&params2:' + JSON.stringify(bodyobj) + '&&res:' + JSON.stringify(ret));
                        }

                        // console.log(JSON.stringify(ret));

                        if (4001 == ret.code) {
                            that.rmStorage('tokenInfo');
                            api.sendEvent({
                                name: 'tokenInfoEvent'
                            });
                            that.openWin('common-login', {}, {
                                slidBackEnabled: false
                            });
                        }
                        // 
                        console.log('----------------------start------------------------------');
                        console.log('当前页面接口url:' + url + '&&params:' + JSON.stringify(bodyobj) + '&&res:' + JSON.stringify(ret));
                        console.log('----------------------end------------------------------');

                        resolve(ret);
                    } else {
                        console.log('--------err start-------');
                        console.log('url:' + url);
                        console.log(JSON.stringify(err))
                        api.toast({
                            msg: '操作失败,请检查网络状态! 错误码:' + err.statusCode,
                            duration: 2000,
                            location: 'bottom'
                        }); // reject(err);
                        console.log('--------err end-------');

                    }

                });
            });
        },
        //check版本更新
        //版本比较
        compare: function (newV, curV) {
            if (newV && curV) {
                //将两个版本号拆成数字
                var arr1 = newV.split("."),
                    arr2 = curV.split(".");
                var minLength = Math.min(arr1.length, arr2.length),
                    position = 0,
                    diff = 0;
                //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
                while (
                    position < minLength &&
                    (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0
                ) {
                    position++;
                }
                diff = diff != 0 ? diff : arr1.length - arr2.length;
                //若newV大于curV，则返回true
                return diff > 0;
            } else {
                //输入为空
                // console.log("版本号不能为空");
                return false;
            }
        },

        toggurl: function (url) {
            // let url = url.replace('amp;','');
            // console.log('ddddddd'+url);
            if (url != '' || url != null) {
                
                // if(api.systemType == 'ios'){
                //     that.openWin('common-popadUrl',{webUrl:url})
                // } else{
                    var browser = api.require('webBrowser');
                    browser.open({
                        url: url
                    });
                // }
            }
        },
        storage: function () {
            var ls = window.localStorage;
            isAndroid = (/android/gi).test(navigator.appVersion);
            if (isAndroid) {
                ls = os.localStorage();
            }
            return ls;
        },
        setStorage: function (key, val) {
            if (arguments.length === 2) {
                if (typeof val == 'object') {
                    val = JSON.stringify(val);
                    val = 'obj-' + val;
                } else {
                    val = 'str-' + val;
                }
                var ls = this.storage();
                ls && ls.setItem(key, val);
            }
        },
        getStorage: function (key) {
            var ls = this.storage();
            if (ls) {
                var val = ls.getItem(key);
                if (val) {
                    if (val.indexOf('obj-') === 0) {
                        return JSON.parse(val.slice(4));
                    } else if (val.indexOf('str-') === 0) {
                        return val.slice(4);
                    }
                }
            }
        },
        rmStorage: function (key) {
            var ls = this.storage();
            if (ls && key) {
                ls.removeItem(key);
            }
        },
        clearStorage: function () {
            var ls = this.storage();
            if (ls) {
                ls.clear();
            }
        }
    }
});