import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld' // @/=>src/  src 为根目录
import Second from '@/components/Second' // @/=>src/  src 为根目录
import Third from '@/components/Third' // @/=>src/  src 为根目录
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Third',
    name: 'Third',
    component: Third
  },
  {
    path: '/othe',
    name: 'Second',
    redirect: '/Third', // 重定向到 Third
    component: Second
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  }
  ]
})
