import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import InterFace from '../components/InterFace'
import Page from '../components/Page'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
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
