import App from '../App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import autoload from './autoload'
import guard from './guard'
import { userStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/hd',
      name: 'hd',
      component: () => import('../layout/hd.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue'),
      meta: { guest: true },
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/article.vue'),
    },
    {
      path: '/:any(.*)',
      name: 'notFound',
      component: () => import('../views/error/404.vue'),
    },
  ]
})


export const setupRouter = async (app: App) => {
  await userStore().getUserInfo()
  autoload(router)
  guard(router)
  app.use(router)
}


export default router
