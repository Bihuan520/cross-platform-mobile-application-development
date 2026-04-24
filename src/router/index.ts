import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/detail/:id',   // :id 是動態參數，對應清單中的 diary.id
    name: 'Detail',
    component: () => import('@/views/DiaryDetail.vue')
  },
  {
    path: '/add',
    component: () => import('@/views/AddDiaryPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
