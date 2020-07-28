import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const baseRouter = [
  {
    path: '/',
    to: '/views/home/index',
    show: true,
    component: () => import('@/views/home/index'),
    meta: {title: '首页', icon: ''}
  },
  {
    path: '/piece',
    to: '/views/piece/index',
    show: true,
    component: () => import('@/views/piece/index'),
    meta: {title: '知识碎片', icon: ''}
  },
  {
    path: '/house',
    to: '/views/house/index',
    show: true,
    component: () => import('@/views/house/index.vue'),
    meta: {title: '房屋信息', icon: ''}
  },
  {
    path: '/ViewPiece',
    to: '/views/components/view-piece',
    show: false,
    component: () => import('@/views/components/view-piece.vue'),
    meta: {title: '子集', icon: ''}
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: baseRouter
})
