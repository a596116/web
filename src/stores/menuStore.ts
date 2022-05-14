import type { IMenu } from 'types/menu'
import router from '@/router'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'

export const menus = defineStore({
  id: 'menu',

  state: () => ({
    menus: [] as IMenu[],
    historyMenus: [] as IMenu[],
    isMenuCollapse: store.get(CacheEnum.MENU_IS_CLOSE) ?? true,
    route: null as RouteLocationNormalized | null,
  }),

  actions: {
    init() {
      this.getMenuByRoute()
      this.historyMenus = this.getHistoryMenu()
    },
    getHistoryMenu() {
      const routes = [] as RouteRecordRaw[]
      router.getRoutes().map((r) => routes.push(...r.children))
      const menus: IMenu[] = store.get(CacheEnum.HISTORY_MENU) ?? []
      return menus.filter((m) => {
        return routes.some((r) => r.name === m.route)
      })
    },

    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta?.menu) return
      this.route = route
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
    getMenuByRoute() {
      this.menus = router
        .getRoutes()
        .filter((route) => route.children.length && route.meta.menu)
        .map((route) => {
          const menu: IMenu = { ...route.meta?.menu }
          menu.children = route.children
            .filter((child) => child.meta?.menu)
            .map((route) => {
              return { ...route.meta?.menu, route: route.name }
            }) as IMenu[]
          return menu
        })
        .filter((menu) => menu.children?.length)
    },

    // 開關菜單
    toggleMenu() {
      this.isMenuCollapse = !this.isMenuCollapse
      store.set(CacheEnum.MENU_IS_CLOSE, this.isMenuCollapse)
    },
  },
})
