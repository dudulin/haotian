import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import { Button, Tab } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios // 修改原本的异步
Vue.use(ElementUI)
// Vue.use(Button, Tab)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})