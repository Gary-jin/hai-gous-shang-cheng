# vuecli3 + apicloud 脚手架

> Apicloudcli + Vant2 + Vue-cli3
>

## 目录结构

- dist 编译代码，压缩后上传到 Apicloud 发布 App
- src 源代码，所有开发在此开始
  - js 需要按需引用编译的js文件夹
  - css 需要按需引用编译的css文件夹
  - image 需要按需引用编译的image文件夹
  - components Vue 公用组件
  - **pages** Apicloud 使用 openWin 和 openFrame 打开的页面，vue 组件化，支持**多级目录**
    - common 公用页面 封装的以下复用页面
    - tab0 ~tabN //对应相应tabBar页面的子页面文件夹
    - tab0.vue~tabN.vue //tabBar对应的页面
- public Webpack 编译时的模板文件，**不能随意修改，除非您知道自己在干什么**
  - js/fastclick.min.js 移动端减少触点反馈时间
  - js/vue.js 未压缩 vue 库，用于开发环境
  - js/vue.min.js 压缩 vue 库，用于生产环境
  - js/common.js 公用混合，全局引入
  - js/const.js  全局请求引入
  - js/rsa.js rsa 加密全局引入
  - js/aes.js aes加密全局引入
  - js/fastclick.min.js 兼容低版本系统 全局引入
  - css/common.css 公共样式 全局引入 所有的页面 vue组件 依赖此样式
  - css/iconfont.css 字体图标 全局引入
  - index.html Apicloud 启动文件
  - page.ejs 将 pages 下 vue 编译为 Apicloud 可用的模板
  - config.xml Apicloud 配置文件
- .env 开发和生成环境对应的入口地址
- 其他省略

## 开始使用

### 安装依赖

```bash
npm i # 初始化安装npm模块
```

### 端口配置

> 打开./.env，修改 VUE_APP_ENTRY_DEV 测试环境下调试手机 或浏览器 能访问你本地测试服的局域网 IP 和测试服端口，如下：

```text
VUE_APP_ENTRY_DEV=http://192.168.0.125:8080/home.html
VUE_APP_ENTRY_PRD=./home.html
```

### 手机实时调试

> npm run dev / wifi-start /  wifi-log 都只需运行一次
>
> api 方法之外的修改会自动热加载

```bash
npm run dev # 开启本地测试服
npm run wifi-start # 开wifi服务，Apploader连接wifi服务，wifi-stop 停止服务
npm run wifi-log # 真机wifi日志输出
npm run wifi-sync # 真机wifi同步
```

### 浏览器调试

待本地测试服完全开启后，查看测试服端口，如下 Network 地址：

```bash
npm run dev # 开启本地测试服
### 浏览器中输入对应页面文件名
# src/page/home.vue 例: http://192.168.0.125:8080/home.html
# 多级目录 src/page/tab0/test.vue 例: http://192.168.0.125:8080/tab0-test.html
```

### 编译上传

> 注意 dev模式 页面加载比较慢 需要打包编译 ./dist目录为需要上传的文件

```bash
 npm run build # 编译打包
```

## 注意事项

- 如无需高级配置，那么只需关注 src 目录下文件

- 跨页面执行函数的方法 vm.$refs.page.xxx

- apicloud 多级目录引用

```javascript
//文件路径 src/page/home.vue
api.openWin({
    name: 'home',
    url: 'home.html'
});
//文件路径 src/page/tab0/test.vue
api.openWin({
    name: 'tab0-test',
    url: 'tab0-test.html'
});
```

- 首页入口 框架默认 home.html 为 App 首页入口，你也可以修改其他页面为入口，只需修改./.env

```text
VUE_APP_ENTRY_DEV=http://192.168.0.104:8080/home.html # 修改home.html为main.htm
VUE_APP_ENTRY_PRD=./home.html # 修改home.html为main.html
```

- 你可以在 vue 中直接使用 api.xxx，也可以使用 this.\$ac.xxx 来调用 api sdk 建议使用this.\$ac在浏览器调试时不会影响进程

- ES6 支持 vue 支持大部分 ES6 语法，但要注意的是如果你修改 public 下的 page.ejs 和 index.html，请不要使用 ES6 语法，因为 webpack 默认没有转义模板文件

