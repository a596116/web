import { userStore } from '@/stores/userStore'
import type { Router, RouteRecordRaw } from 'vue-router'
import autoloadModuleRoutes from './module'
import getRoutes from './view'

let routes = [] as RouteRecordRaw[]
routes = env.VITE_ROUTER_AUTOLOAD ? getRoutes() : autoloadModuleRoutes()

export default async (router: Router) => {
  const user = userStore()
  routes = routes.map((route) => {
    route.children = route.children?.filter((child) => {
      const permission = child.meta?.permission
      return permission ? user.info?.permissions?.includes(permission) : true
    })
    return route
  })
  routes.forEach((route) => {
    router.addRoute(route)
  })
}
