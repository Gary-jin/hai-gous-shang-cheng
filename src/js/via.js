/**
 * @file apicloud 常用工具封装
 * @author viarotel <rotels@163.com> 
 */
export const isAndroid = /android/gi.test(navigator.appVersion);
export const isIos = !!navigator.userAgent.match(
  /\(i[^;]+;( U;)? CPU.+Mac OS X/
);
export const isPc = !isAndroid && !isIos;

export const storage = function () {
  var ls = window.localStorage;
  if (isAndroid) {
    ls = os.localStorage();
  }
  return ls;
};
export const setStorage = function (key, val) {
  if (arguments.length === 2) {
    if (typeof val == "object") {
      val = JSON.stringify(val);
      val = "obj-" + val;
    } else {
      val = "str-" + val;
    }
    var ls = storage();
    ls && ls.setItem(key, val);
  }
};
export const getStorage = function (key) {
  var ls = storage();
  if (ls) {
    var val = ls.getItem(key);
    if (val) {
      if (val.indexOf("obj-") === 0) {
        return JSON.parse(val.slice(4));
      } else if (val.indexOf("str-") === 0) {
        return val.slice(4);
      }
    }
  }
};
export const rmStorage = function (key) {
  var ls = storage();
  if (ls && key) {
    ls.removeItem(key);
  }
};
export const clearStorage = function () {
  var ls = storage();
  if (ls) {
    ls.clear();
  }
};

export const setCookie = function (name, value, domain, path, minSec) {
  var cookieEnabled = navigator.cookieEnabled ? true : false;
  if (name && cookieEnabled) {
    path = path || "/";
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    var exp;
    if (minSec) {
      exp = new Date(); // new Date("December 31, 9998");
      exp.setTime(exp.getTime() + minSec * 1000);
    } else {
      exp = new Date("9998-01-01");
    }
    var cookieString = `${name}=${escape(value)}${
      minSec ? `;expires=${exp.toGMTString()}` : ""
      };path=${path};`;
    if (domain) {
      cookieString += `domain=${domain};`;
    }
    document.cookie = cookieString;
    return true;
  }
  return false;
};
export const getCookie = function (name) {
  var cookieEnabled = navigator.cookieEnabled ? true : false;
  if (name && cookieEnabled) {
    var arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
    if (arr !== null) {
      return unescape(arr[2]);
    }
  }
  return null;
};
export const clearCookie = function (domain, path) {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  path = path || "/";
  if (keys) {
    for (var i = keys.length; i--;) {
      var cookieString = `${keys[i]}=0;expires=${new Date(
        0
      ).toUTCString()};path=${path};`;
      if (domain) {
        cookieString += `domain=${domain};`;
      }
      document.cookie = cookieString;
    }
  }
};

export const isObject = function (input) {
  return Object.prototype.toString.call(input) === "[object Object]";
};
export const isArray = function (input) {
  return (
    input instanceof Array ||
    Object.prototype.toString.call(input) === "[object Array]"
  );
};
export const isDate = function (input) {
  return (
    input instanceof Date ||
    Object.prototype.toString.call(input) === "[object Date]"
  );
};
export const isNumber = function (input) {
  return (
    input instanceof Number ||
    Object.prototype.toString.call(input) === "[object Number]"
  );
};
export const isString = function (input) {
  return (
    input instanceof String ||
    Object.prototype.toString.call(input) === "[object String]"
  );
};
export const isBoolean = function (input) {
  return typeof input == "boolean";
};
export const isFunction = function (input) {
  return typeof input == "function";
};
export const isNull = function (input) {
  return input === undefined || input === null;
};
export const isPlainObject = function (obj) {
  if (
    obj &&
    Object.prototype.toString.call(obj) === "[object Object]" &&
    obj.constructor === Object &&
    !hasOwnProperty.call(obj, "constructor")
  ) {
    var key;
    for (key in obj) {
    }
    return key === undefined || hasOwnProperty.call(obj, key);
  }
  return false;
};
export const freeze = function (obj) {
  //冻结对象
  Object.freeze(obj);
  Object.keys(obj).forEach(function (key, value) {
    if (isObject(obj[key])) {
      freeze(obj[key]);
    }
  });
  return obj;
};

/**
 * @desc 获取url参数
 * @param {string} url 要提取参数的url
 * @returns {object} 返回值为对象 
 */
export const getUrlParams = function (url = '') {
  let tempObj = {};
  let tempStr = window.location.search.substring(1);
  if (url) {
    tempStr = url.split('?')[1];
  }
  if (tempStr) {
    const tempArr = tempStr.split('&');
    tempObj = tempArr.reduce((obj, item) => {
      if (item) {
        const index = item.indexOf('=');
        let key = '';
        let value = '';
        if (index === -1) {
          key = item;
        } else {
          key = item.slice(0, index);
          value = item.slice(index + 1);
        }
        obj[key] = value;
      }
      return obj;
    }, {});
  }
  console.log(JSON.stringify(tempObj));
  return tempObj;
};


// if (!Object.getOwnPropertyNames(window.HTMLElement.prototype).includes('getRect')) {
//   Object.defineProperty(window.HTMLElement.prototype, 'getRect', {
//     get: function () {
//       var rect = this.getBoundingClientRect();
//       var clientLeft = document.documentElement.clientLeft || document.body.scrollLeft;
//       var clientTop = document.documentElement.clientTop || document.body.scrollTop;
//       var top = rect.top - clientTop;
//       var bottom = rect.bottom - clientTop;
//       var left = rect.left - clientLeft;
//       var right = rect.right - clientLeft;
//       var width = rect.width || right - left;
//       var height = rect.height || bottom - top;
//       return {
//         x: left,
//         y: top,
//         width: width,
//         height: height,
//         left: left,
//         top: top,
//         right: right,
//         bottom: bottom
//       };
//     }
//   });
// }
// if (!Object.getOwnPropertyNames(window.HTMLElement.prototype).includes('computedStyle')) {
//   Object.defineProperty(window.HTMLElement.prototype, 'computedStyle', {
//     get: function () {
//       return window.getComputedStyle(this);
//     }
//   });
// }

/**
 * 
 * @desc 方法返回元素的大小及其相对于视口的位置
 * @param {string} el 元素名 
 * @returns {object}
 */
export const getRect = function (el) {
  const tempEl = document.querySelector(el);
  let tempObj = {};
  if (tempEl) {
    tempObj = getComputedStyle(tempEl);
  }
  return tempObj;
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = function (func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
};

/**
 * @desc 设置偏好数据，存储与本地文件系统。
 * @param key 索引名
 * @param value 数据
 */
export const apiSetStorage = function (key, value) {
  api.setPrefs({
    key: key,
    value: JSON.stringify(value)
  });
};

/**
 * @desc 获取偏好数据
 * @param key 索引名
 * @returns {object} 布尔类型
 */
export const apiGetStorage = function (key) {
  var value = api.getPrefs({
    sync: true,
    key: key
  });
  if (value) {
    value = JSON.parse(value);
  }
  return value;
};

/**
 * @desc 移除偏好数据
 * @param key 索引名
 */
export const apiRmStorage = function (key) {
  api.removePrefs({
    key: key
  });
};

/**
 * @desc 提示
 * @param {Any} params 字符串或对象
 */
export const apiToast = function (params) {
  if (isString(params)) {
    api.toast({
      msg: params,
      location: "middle",
      duration: 2000
    });
  } else {
    api.toast({
      msg: params.msg,
      location: params.dir || "middle",
      duration: params.time || 2000
    });
  }
};
/**
 * @desc frame是否在当前window中存在
 * @param name frame名称
 * @returns {boolean} 布尔类型
 */
export const apiIsFrame = function (name) {
  return api.frames().some((item) => item.name === name);
};

/**
 * @desc window是否存在
 * @param name window名称
 * @returns {boolean} 布尔类型
 */
export const apiIsWin = function (name) {
  return api.windows().some((item) => item.name === name);
};

/**
 * @desc 指定权限是否开启
 * @param name 权限名称
 * @returns {boolean} 布尔类型
 */
export const apiIsAuth = function (name) {
  var tempArr = api.hasPermission({
    list: [name || ""]
  });
  return tempArr.length && tempArr[0].granted;
};

/**
 * @desc 获取系统权限并执行 后续方法
 * @param name 权限名称
 * @returns {Promise} 回调
 */
export const apiGetSystemAuth = function (name) {
  return new Promise((resolve) => {
    if (apiIsAuth(name)) {
      resolve && resolve();
    } else {
      api.confirm(
        {
          title: "提示",
          msg: "此操作需要获取相应系统权限,是否允许?",
          buttons: ["确定", "取消"]
        },
        function (ret, err) {
          if (ret.buttonIndex === 1) {
            requestPermission();
          } else {
            api.toast({
              msg: "您拒绝了相应系统权限申请",
              duration: 2000,
              location: "bottom"
            });
          }
        }
      );
    }
    function requestPermission() {
      api.requestPermission(
        {
          list: [name],
          code: 1
        },
        (ret, err) => {
          console.log(JSON.stringify(ret));
          if (isIos) {
            //回到app时触发 解决ios 授权完成授权状态没有改变的问题
            apiAddEventListener("resume", (res) => {
              apiGetSystemAuth(name);
              apiRemoveEventListener("resume"); //移除事件监听
            })
          } else {
            if (ret.list[0].granted) {
              resolve && resolve();
            } else {
              api.confirm(
                {
                  title: "提示",
                  msg:
                    "您拒绝了系统权限请求,这样将不能使用相关服务,是否手动开启?",
                  buttons: ["确定", "取消"]
                },
                (ret, err) => {
                  if (ret.buttonIndex === 1) {
                    requestPermission(name);
                  }
                }
              );
            }
          }
        }
      );
    }
  });
};

/**
 * @desc 返回占位图
 * @param w 宽
 * @param h 高
 * @returns {string} 链接地址
 */
export const tempImage = function (w, h) {
  var tempStr = "https://dummyimage.com/" + w + "x";
  if (arguments.length === 1) {
    tempStr += w;
  } else {
    tempStr += h;
  }
  return tempStr;
};

/**
 * @desc 页面调试工具
 */
export const pageDebug = function () {
  var styleEl = document.createElement("style");
  styleEl.classList.add("page-debug");
  styleEl.innerHTML =
    "\n                * { background-color: rgba(255,0,0,.2); }\n                * * { background-color: rgba(0,255,0,.2); }\n                * * * { background-color: rgba(0,0,255,.2); }\n                * * * * { background-color: rgba(255,0,255,.2); }\n                * * * * * { background-color: rgba(0,255,255,.2); }\n                * * * * * * { background-color: rgba(255,255,0,.2); }\n                * * * * * * * { background-color: rgba(255,0,0,.2); }\n                * * * * * * * * { background-color: rgba(0,255,0,.2); }\n                * * * * * * * * * { background-color: rgba(0,0,255,.2); }\n                * * * * * * * * * * { background-color: rgba(0,0,255,.2); }\n            ";
  document.querySelector("head").appendChild(styleEl);
};

/**
 * @desc 请求数据
 * @param {string} url 请求地址
 * @param {Any} options 请求方式或请求参数
 * @param {boolean} isEncrypt 是否加密
 * @returns {Promise} 回调
 */
export const apiAjax = function (url, options, { isEncrypt = true, isLoading = true } = {}) {
  let method = 'post';
  let params = {};
  let body = {};
  let key = '';
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    token: apiGetStorage("token") || ""
    // token: "b4a6366320896bcf15dce1b5d2c08f16"
    // token: "1234"
    // token: "4321"
  };
  //URL
  // console.log(url);
  //TOHEN
  // console.log(JSON.stringify(headers));



  if (isString(options)) {
    method = options;
  } else {
    params = options;
  }
  console.log(JSON.stringify(method));
  if (isEncrypt) {
    key = getKey(); //生成随机key
    // console.log(key);

    const _rsa = RSA(key); //生成对key 进行加密
    const _cipher = AESEnc(key, JSON.stringify(params)); //对传入的参数进行加密
    body = {
      _rsa,
      _cipher
    }
    // console.log('key: ' + key);
    // console.log('body: ' + JSON.stringify(body));
  } else {
    body = params;
  }

  //
  console.log(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    isLoading && api.showProgress({
      title: "努力加载中",
      text: "请稍后...",
      modal: true
    });
    api.ajax(
      {
        url,
        method,
        headers,
        data: {
          body
        }
      },
      (ret, err) => {
        // console.log(ret);
        console.log('ret: ' + JSON.stringify(ret));

        // console.log(JSON.stringify(err));
        isLoading && api.hideProgress();
        if (ret) {
          if (ret.code == 403) {
            apiRmStorage("token");
            apiOpenWin(
              "common_login",
              {},
              {
                slidBackEnabled: false
              }
            );
          } else {
            if (isEncrypt) {
              ret.data = JSON.parse(AESDec(key, ret.data)); //解密


            }
          }
          resolve && resolve(ret);
        } else {
          apiToast(`操作失败,请检查网络状态! 错误码: ${err.statusCode}`);
          reject && reject(err);
        }
        console.log('-------------------------------------------------------------------start-------------------------------------------------------------------');
        console.log('当前页面打开方式: ' + api.frameName.length ? "frame" : "window");
        console.log('当前页面文件名: ' + api.frameName.length ? api.frameName : api.winName);
        console.log('headers: ' + JSON.stringify(headers));
        console.log('url: ' + JSON.stringify(url));
        console.log('params: ' + JSON.stringify(params));
        console.log('ret: ' + JSON.stringify(ret));
        console.log('err: ' + JSON.stringify(err));
        console.log('-------------------------------------------------------------------end-------------------------------------------------------------------');
      }
    );
  });
}

/**
 * @desc 打开window
 * @param pageParam 参数
 * @param option 选项
 */
export const apiOpenWin = function (option, pageParam = {}, config = {}) {
  let tempObj = {};
  if (isObject(option)) {
    tempObj = option;
  } else {
    tempObj = {
      name: option,
      url: option + ".html",
      pageParam,
      allowEdit: true,
      useWKWebView:true,
      ...config
    }
  }
  api.openWin(tempObj);
};

/**
 * @desc 打开frame
 * @param pageParam 参数
 * @param option 选项
 * @returns {function} 返回一个方法
 */
export const apiOpenFrame = function (option, pageParam = {}, config = {}) {
  let tempObj = {};
  if (isObject(option)) {
    tempObj = option;
  } else {
    tempObj = {
      name: option,
      url: option + ".html",
      pageParam,
      allowEdit: true,
      useWKWebView:true,
      bgColor: "rgba(0,0,0,0)",
      ...config
    }
  }
  api.openFrame(tempObj);
};

/**
 * @desc 关闭window
 * @returns {function} 返回执行方法
 */
export const apiCloseWin = function (name = '', animation) {
  let options = {
    animation: animation || {
      type: "fade", //动画类型（详见动画类型常量）
      duration: 300 //动画过渡时间，默认300毫秒
    },
  };
  if (name.length) {
    options = {
      name,
      ...options
    }
  }
  return api.closeWin(options);
};
/**
 * @desc 关闭frame
 * @returns {function} 返回执行方法
 */
export const apiCloseFrame = function (name = '', animation) {
  let options = {
    animation: animation || {
      type: "fade", //动画类型（详见动画类型常量）
      duration: 300 //动画过渡时间，默认300毫秒
    },
  };
  if (name.length) {
    options = {
      name,
      ...options
    }
  }
  api.closeFrame(options);
};
/**
 * @desc 发送事件
 * @param {string} name 事件名称
 * @param {object} params 事件参数
 */
export const apiSendEvent = function (name = '', params = {}) {
  api.sendEvent({
    name,
    extra: params
  });
};
/**
 * @desc 监听事件
 * @param {string} name 事件名称
 * @param {function} fn 回调
 * @param {boolean} isOnce 是否只监听一次
 */
export const apiAddEventListener = function (name = '', fn, { isOnce = false } = {}) {
  api.addEventListener({
    name,
  }, (ret, err) => {
    console.log(name + ': ' + JSON.stringify(ret));
    fn && fn(ret.value);
    isOnce && apiRemoveEventListener(name);
  });
};

/**
 * @desc 移除监听
 * @param {string} name 事件名称
 */
export const apiRemoveEventListener = function (name = '') {
  api.removeEventListener({
    name
  });
};

Vue.prototype.apiOpenWin = apiOpenWin;
Vue.prototype.apiOpenFrame = apiOpenFrame;
Vue.prototype.apiCloseWin = apiCloseWin;
Vue.prototype.apiCloseFrame = apiCloseFrame;
Vue.prototype.tempImage = tempImage;