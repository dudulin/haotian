// ======================
配置环境
node -v
v12.18.0
npm -v
6.14.4
前端工程化
webpack
打包发布
Source Map

// ======================
实际操作
vue初始化
webpack 设置


// ======================
前端工程化
模块化 (js、css、、资源 的 模块化)
组件化 (复用现有的UI结构，样式，行为)
规范化 (目录结构划分，编码规范化，接口规范化，文档规范化，Git分支规范化)
自动化 (自动化构建，自动化部署，自动化测试)
工具，技术，流程，经验  进行规范化 标准化

// ========================
工程化 实际方案
webpack
vue
element
git  github git-tortoise

# 项目开始操作
1.vue-cli 脚手架 全局安装    cli--命令行界面
vue2 支持最多，vue3 暂时不用, @vue/cli 暂时不用
https://cli.vuejs.org/zh/guide/#cli
$ npm install -g vue-cli
 vue-cli@2.9.6   @vue/cli 4.0.5

 vue create project_1     /   你也可以通过 vue ui 命令以图形化界面创建和管理项目：
 键盘上下按钮选择默认

 npm install --save-dev webpack-dev-server
 修复热更新问题  配置 vue.config.js：   devServer: { port: 3000, open: true, hot: true,//自动保存 },

 github 拉取下来的项目要到 cd project_3  npm i

 node 的版本太高运行不了  https://github.com/coreybutler/nvm-windows/releases/tag/1.1.9
 nvm ls   // 查看目前已经安装的版本
 nvm install 10.5.0  // 安装指定的版本的nodejs
 nvm use 10.5.0  // 使用指定版本的nodejs
删除node_module文件   
npm cache clean --force       package-lock.json文件也删除     ==>4048
cnpm i   才解决
vue -h   没有 vue ui 版本太低导致



vue2 的vue cli 最新版本就是 2.9.6

为什么公司一样的安装，公司的是 vue3   家里面的 是vue2 的操作？？？？  ------- 公司之前安装了 @vue/cli

可以使用 yarn 
npm i -g yarn
yarn      yarn run serve

太多问题  
用完全的 vue2 方法 不使用 vue create   不使用yarn

    vue init webpack project_4          ------- 正常运行
    cd project_4 
    npm run dev 
    --open package.json 浏览器自动 打开
    vue 全部都是组件 不再书写 html js


  npmrc文件删除掉：npm config ls -l可以查看文件位置：userconfig = “C:\Users\Administrator\.npmrc”
  where vue  ------- 全部删除 之后 npm uninstall -g @vue/cli   ---------- npm install -g vue-cli
  vue -V   => 2.9.6   
  vue - h   终于正常


  找到根目录下的.eslintrc.js文件，在 rules中添加：
"space-before-function-paren": 0 

  只有在main.js  里面引用了 vue 和 router  根 vue  其他vue 文件 只是配置好 对外暴露配置
  export default {}

  组件 3 部分  template script  style


  # 编辑好 vue 的代码片段 方便使用 还可以迭代优化 ctrl+shift+p => snippets

  // ==============
  vue init webpack project_5   => runtime-only => cd project_5
  1.修改 根目录下的.eslintrc.js文件  => rules =>  "space-before-function-paren": 0

1. package.json => scripts = > dev = > --open

  app.vue -- 主入口文件

  Path Intellisense  --- 路径补全工具

  npm i element-ui -S

  main.js => 
  import { Button, Tab } from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css'
  Vue.use(Button, Tab)

  vue cli2 的插件安装 
  还是 npm i -S pack_name  
  -S 依赖 必须的，element-ui
  -D 开发依赖，不打包上线 类似 webpack

  Vue.prototype.$http = axios  // 修改原本的异步
  axios 使用 时候去看 文档

  rap2 接口网站 http://rap2.taobao.org/account/login


  settting.json => "javascript.format.semicolons": "remove",  => 格式化 去分号设置 

  ---
  ##项目逻辑
  1.导入 测试数据 和线上 数据
  2.tabs 选择对应参数 勾选
  3.校验生产 table 和 总结

  --页面 和 数据源 校验规则 不一样
  页面数据 ------ 传到 page.vue      进行加工 返回 
  接口数据 ------ 传到 interface.vue 进行加工 返回 

  返回的table 数据 显示

  this.$emit('pageCallback', [])

  ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上

   this.$refs.mychild.parentHandleclick()
  ---
  npm run build  ===> 报错： because its MIME type ('text/html') is not
  

  问题其实就是css样式获取不到，在build>webpack.prod.conf.js>output里添加

  publicPath: './'      => 修复了

  图标丢失 
  在 build/webpack.prod.conf.js 中, rules: utils.styleLoaders =》将  extract: true =>  extract: false