// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 引入 router 配置文件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app2',
  router,
  components: {
    App
  },
  template: '<App/>' // 使用了模板
})

/* <div id="app">
  helloWord
</div>
根 vue 模板 不进行操作

vuejs vuerouter axios

style */
