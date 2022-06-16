import type { RouteRecordRaw } from 'vue-router'

export default function autoloadModuleRoutes() {
  const modules = import.meta.globEager('../module/**/*.ts')
  const routes = [] as RouteRecordRaw[]
  Object.keys(modules).forEach((key) => {
    modules[key].default.children.forEach((route: RouteRecordRaw) => {
      route.meta!.page = modules[key].default.page
      routes.push(route)
    })
  })
  return routes
}
