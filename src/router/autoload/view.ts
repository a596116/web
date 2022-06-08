import type { RouteRecordRaw } from 'vue-router'
const layout = import.meta.globEager('../../layout/*.vue')
const views = import.meta.globEager('../../views/**/*.vue')

// 獲取父路由
const getRouteByModule = (file: string, module: { [key: string]: any }) => {
  const name = file.replace(/.+layout\/|.+views\/|\.vue/gi, '')
  console.log(name)
  const route = {
    path: `/${name}`,
    name: name,
    component: module.default,
  }
  return Object.assign(route, module.default?.route)
}

// 獲取子路由
const getChildrenRoutes = (layoutRoute: RouteRecordRaw) => {
  const routes = [] as RouteRecordRaw[]
  Object.entries(views).forEach(([file, module]) => {
    if (file.includes(`../views/${layoutRoute.name as string}`)) {
      const route = getRouteByModule(file, module)
      routes.push(route)
    }
  })
  return routes
}

const layoutRoutes = [] as RouteRecordRaw[]

// 獲取所有路由
const getRoutes = () => {
  Object.entries(layout).forEach(([file, module]) => {
    const route = getRouteByModule(file, module)
    route.children = getChildrenRoutes(route)
    layoutRoutes.push(route)
  })
  return layoutRoutes
}

export default getRoutes
