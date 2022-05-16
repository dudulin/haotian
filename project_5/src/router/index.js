import Vue from 'vue'
import Router from 'vue-router'
import InterFace from '../components/InterFace'
import Page from '../components/Page'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/Page',
    name: 'Page',
    component: Page
  },
  {
    path: '/InterFace',
    name: 'InterFace',
    component: InterFace
  }
  ]
})
