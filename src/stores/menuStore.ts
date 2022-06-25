import type { IMenu } from 'types/menu'
import router from '@/router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'
import { userStores } from './userStore'
import type { RouteMeta } from 'vue-router'

export const menuStores = defineStore({
  id: 'menu',

  state: () => ({
    menus: [] as IMenu[],
    historyMenus: [] as IMenu[],
    route: null as RouteMeta | null,
    isMenuCollapse: <boolean>store.get(CacheEnum.MENU_IS_CLOSE) ?? false,
    isHistoryCollapse: <boolean>store.get(CacheEnum.HISTORYLINK_IS_SHOW) ?? false,
    isBreadcrumbCollapse: <boolean>store.get(CacheEnum.BREADCRUMB_IS_SHOW) ?? false,
    user: userStores(),
  }),

  actions: {
    async init(page: string) {
      this.getMenuByRoute(page)
      this.historyMenus = this.getHistoryMenu()
    },
    getHistoryMenu() {
      const routes = [] as RouteRecordRaw[]
      router.getRoutes().map((r) => routes.push(r))
      const menus: IMenu[] = store.get(CacheEnum.HISTORY_MENU) ?? []
      return menus.filter((m) => {
        return routes.filter((r) => r.name === m.route)
      })
    },

    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta?.menu) return
      this.route = route.meta
      const menu: IMenu = { ...route.meta?.menu, route: route.name as string }
      const index = Object.entries(this.historyMenus).findIndex(([key, value]) => value.route === route.name)
      if (index !== -1) this.historyMenus.splice(index, 1)
      this.historyMenus.unshift(menu)
      if (this.historyMenus.length > 10) this.historyMenus.pop()
      store.set(CacheEnum.HISTORY_MENU, this.historyMenus)
    },

    removeHistoryMenu(menu: IMenu) {
      if (this.historyMenus.length === 1) return
      const index = this.historyMenus.indexOf(menu)
      this.historyMenus.splice(index, 1)
      store.set(CacheEnum.HISTORY_MENU, this.historyMenus)
    },

    // 根據路由獲取菜單
    async getMenuByRoute(page: string) {
      this.menus = router
        .getRoutes()
        .filter((route) => route.meta.page?.name === page && route.meta.menu)
        .sort((a, b) => {
          return (a.meta.number!) - (b.meta.number!)
        })
        .reduce((p: IMenu[], c) => {
          const cmeun = <IMenu>c.meta.page?.menu
          if (!~p.findIndex((t) => t.title == cmeun.title)) {// 去除重複的父路由菜單
            p.push({ ...cmeun, children: [] })
          }
          // 添加子路由菜單到對應的父路由
          p[p.findIndex(m => m.title == cmeun.title)].children?.push({ ...c.meta?.menu, route: (c.name as string) })
          return p
        }, [])
    },

    // 開關菜單
    toggleMenu() {
      this.isMenuCollapse = !this.isMenuCollapse
      store.set(CacheEnum.MENU_IS_CLOSE, this.isMenuCollapse)
    },

    // 開關歷史菜單
    toggleHistoryLink() {
      store.set(CacheEnum.HISTORYLINK_IS_SHOW, this.isHistoryCollapse)
    },
    // 開關麵包屑
    toggleBreadcrumb() {
      store.set(CacheEnum.BREADCRUMB_IS_SHOW, this.isBreadcrumbCollapse)
    }
  },
})
