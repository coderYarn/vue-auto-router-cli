
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
mode: 'history',
base: process.env.BASE_URL,
routes: [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About/index.vue'),
    
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
    
      children:[
  {
    path: '/home/hello',
    name: 'Hello',
    component: () => import('../views/Home/Hello/index.vue'),
  }
      ]
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index/index.vue'),
    
  },
]
})