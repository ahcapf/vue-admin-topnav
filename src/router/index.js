import Vue from 'vue'
import VueRouter from 'vue-router'
import editRoutes from './modules/editUpload'
import statisticalRoutes from './modules/statisticalAnalysis'

import Layout from '@/views/Layout'
Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: Layout,
  }
]

export const asyncRouterMap = [...editRoutes, ...statisticalRoutes]



const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

export default router;
