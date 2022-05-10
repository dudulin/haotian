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

为什么公司一样的安装，公司的是 vue3   家里面的 是vue2 的操作？？？？