import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import qs from 'qs'

import './common/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import ImgPreview from './components/public/index.js'
import VueAMap from 'vue-amap'
import axios from './api/config.js'

import router from './router/index.js'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

Vue.use(ImgPreview)

Vue.use(VueAMap)

Vue.prototype.isLogin = 0
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.prototype.$qs = qs
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
