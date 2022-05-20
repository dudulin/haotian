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
Vue.filter('dateFormart', (str, fmtStr) => {
  let fmt = !fmtStr ? 'hh:mm:ss' : fmtStr

  function createDate(fmt) {
    let now = new Date()
    var o = {
      'M+': now.getMonth() + 1, // 月份
      'd+': now.getDate(), // 日
      'h+': now.getHours(), // 小时
      'm+': now.getMinutes(), // 分
      's+': now.getSeconds(), // 秒
      'q+': Math.floor((now.getMonth() + 3) / 3), // 季度
      'S': now.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  switch (str) {
    case 'time':
      str = createDate(fmt)
      break
    default:
      break
  }
  return str
})
Vue.filter('dateFormart2', i => {
  return 6666666
})
// Vue.use(Button, Tab)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
