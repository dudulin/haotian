import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/pages/index/index'
import AboutUs from '../components/pages/aboutUs/index'
import Service from '../components/pages/service/index'
import Product from '../components/pages/product/index'
import ProductDetail from '../components/pages/productDetail/index'
import Login from '../components/pages/login/index'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/ProductDetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
