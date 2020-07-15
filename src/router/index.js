import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const baseRouter = [
  {
    path: '/home',
    to: '/views/home/index',
    component: () => import('@/views/home/index'),
    meta: {title: '首页', icon: ''}
  },
  {
    path: '/piece',
    to: '/views/piece/index',
    component: () => import('@/views/piece/index'),
    meta: {title: '知识碎片', icon: ''}
  },
  {
    path: '/house',
    to: '/views/house/index',
    component: () => import('@/views/house/index.vue'),
    meta: {title: '房屋信息', icon: ''}
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: baseRouter
})
