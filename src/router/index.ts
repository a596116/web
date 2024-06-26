import { createRouter, createWebHistory } from 'vue-router'
import { userStores } from '@/stores/userStore'
import autoload from './autoload'
import guard from './guard'
import { routes } from './routes'
import type { App } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const setupRouter = async (app: App) => {
  // if (window.location.href.match(/admin/ig)) {
  await userStores().getUserInfo()
  // }
  autoload(router)
  guard(router)
  app.use(router)
}


export default router
