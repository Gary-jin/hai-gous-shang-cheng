//接口地址
// export const ip = 'http://haigoushop.vmall99.com/api/'; //测试
export const ip = 'http://www.haigousc.cn/api/'; //正式
// export const ip = 'http://192.168.0.125/index.php/api/';

const config = {
    /******user******/
    getUserInfo: ip + 'user/getUserInfo',//获取用户信息
    login: ip + 'user/login',//login
    updateAvatar: ip + 'user/updateAvatar',//修改头像
    delCollection: ip + 'user/delCollection',//删除收藏记录
    emptyCollection: ip + 'user/emptyCollection',//清空收藏记录
    getHistory: ip + 'user/getHistory',//浏览记录
    emptyWatch: ip + 'user/emptyWatch',//清空浏览记录
    getCollection: ip + 'user/getCollection',//收藏记录
    signIn: ip + 'user/signIn',//- 签到
    instructions: ip + 'user/instructions',//- 使用说明
    coinLog: ip + 'user/coinLog',//- 金币记录
    moneyLog: ip + 'user/moneyLog',//- 余额记录
    qrcodeInfo: ip + 'user/qrcodeInfo',//- 清空浏览记录
    mobilelogin: ip + 'user/mobilelogin',//- 清空浏览记录
    /********Good 获取超值购商城商品*************/
    getCheapGoodsList: ip + 'good/getCheapGoodsList',//- 获取超值购商城商品
    coinTypeGoods: ip + 'good/coinTypeGoods',//- 获取金币商城新品上线商品
    getCate: ip + 'good/getCate',//- 获取分类
    getCoinGoodsList: ip + 'good/getCoinGoodsList',//- 获取所有金币商城商品
    goodsDetail: ip + 'good/goodsDetail',//- 获取所有金币商城商品

    /********Home - 搜索页面*************/
    cancleCollection: ip + 'home/cancleCollection',//- 取消商品收藏
    collection: ip + 'home/collection',//- 商品收藏
    shareGoodsHome: ip + 'home/shareGoodsHome',//- 商品分享页面
    clearSearchKey: ip + 'home/clearSearchKey',//- 清除搜索历史
    getRecommGoods: ip + 'home/getRecommGoods',//- 猜你喜欢
    getBannerList: ip + 'home/getBannerList',//- 获取Banner图
    getCateList: ip + 'home/getCateList',//- 获取分类
    getSubCate: ip + 'home/getSubCate',//- 获取二级分类
    searchGoods: ip + 'home/searchGoods',//- Home - 搜索
    optimizationGoods: ip + 'home/optimizationGoods',//-  好货推荐
    HotRecommGoods: ip + 'home/HotRecommGoods',//-  热门推荐
    getTaoGoodsInfo: ip + 'home/getTaoGoodsInfo',//- 获取淘客商品详情
    getHomeImage: ip + 'home/getHomeImage',//-  获取首页图片
    getNotice: ip + 'home/getNotice',//-  通知广告
    searchHome: ip + 'home/searchHome',//- 搜索页
    taovideo: ip + 'home/taovideo',//-  抖券视频
    exchange: ip + 'home/exchange',//-  兑换优惠券
    buyLimitGoods: ip + 'home/buyLimitGoods',//-   限时抢购商品
    buyLimitTimes: ip + 'home/buyLimitTimes',//-  限时抢购时间列表返回
    get_time: ip + 'home/get_time',//-  获取倒计时时间

    /************Recharge - 充值记录*************/
    carmiRecharge: ip + 'recharge/carmiRecharge',//-  充值记录
    getRechargeLog: ip + 'recharge/getRechargeLog',//-  充值记录
    getPayMoeny: ip + 'recharge/getPayMoeny',//-  获取支付金额
    rechargePay: ip + 'recharge/rechargePay',//-  获取支付金额
    /************address -*************/
    modifyAddrInfo: ip + 'address/modifyAddrInfo',//-  修改或新增地址
    delAddress: ip + 'address/delAddress',//-   删除收货地址
    getAddrInfo: ip + 'address/getAddrInfo',//-  获取单个地址信息
    getAddressList: ip + 'address/getAddressList',//-获 取收货地址列表
    regionData: ip + 'address/regionData',//-获 获取省市县
    defaultSet: ip + 'address/defaultSet',//-默认地址设置
    /*****************Oreder*********************/
    createCoinOrder: ip + 'order/createCoinOrder',//- 创建订单
    getCoinOrder: ip + 'order/getCoinOrder',//- 获取金币商城订单列表
    getCheapOrder: ip + 'order/getCheapOrder',//- - 获取超值购商城订单列表
    payOrder: ip + 'order/payOrder',//- 订单支付
    orderDetail: ip + 'order/orderDetail',//订单详情
    isAddress: ip + 'order/isAddress',//是否填写收货地址
    getTaoOrderList: ip + 'order/getTaoOrderList',//是否填写收货地址
    /*****************Taoauth 渠道备案***************************/
    relationAuth: ip + 'taoauth/relationAuth',//渠道备案
    /*******************Common************************/
    imgBaseUpload: ip + 'common/imgBaseUpload',//上传图片（base64方式）
    optionList: ip + 'common/optionList',//反馈列表
    goodsOpinion: ip + 'common/goodsOpinion',//商品用户反馈
    getService: ip + 'common/getService',//服务热线
    appVersion: ip + 'common/appVersion',//软件更新
    addOpinion: ip + 'common/addOpinion',//用户反馈
    getProblem: ip + 'common/getProblem',//获取问题类型
    send: ip + 'sms/send',//获取问题类型
    get_is_display : ip + 'home/get_is_display',   //上架隐藏

}

export default config