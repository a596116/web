import { userStores } from '@/stores/userStore'
import type { Router, RouteRecordRaw } from 'vue-router'
import autoloadModuleRoutes from './module'

let routes = [] as RouteRecordRaw[]
export const permissionList = [] as RouteRecordRaw[]
routes = autoloadModuleRoutes()

export default async (router: Router) => {
  const user = userStores()
  routes = routes.filter((r) => {
    const permission = r.meta?.permission
    if (permission) { // 儲存需權限的路由
      permissionList.push(r)
    }
    return permission ? user.info?.permissions['p'].includes(permission) : true
  })
  routes.forEach((route) => { // 添加一般的路由
    router.addRoute(route.meta?.page?.name!, route)
  })

}
