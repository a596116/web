import { defineStore } from 'pinia'
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
    close: store.get(CacheEnum.MENU_IS_CLOSE) ?? true,
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
    removeHistoryMenu(menu: IMenu) {
      const index = this.historyMenus.indexOf(menu)
      this.historyMenus.splice(index, 1)
      store.set(CacheEnum.HISTORY_MENU, this.historyMenus)
    },
    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta?.menu) return
      this.route = route

      const menu: IMenu = { ...route.meta?.menu, route: route.name as string }
      const isHas = this.historyMenus.some((menu) => menu.route === route.name)
      if (!isHas) this.historyMenus.unshift(menu)
      if (this.historyMenus.length > 10) this.historyMenus.pop()

      store.set(CacheEnum.HISTORY_MENU, this.historyMenus)
    },
    setCurrentMenu(route: RouteLocationNormalizedLoaded) {
      this.menus.forEach((menu) => {
        menu.isClick = false
        menu.children?.forEach((child) => {
          child.isClick = false
          if (child.route === route.name) {
            menu.isClick = true
            child.isClick = true
          }
        })
      })
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
      this.close = !this.close
      store.set(CacheEnum.MENU_IS_CLOSE, this.close)
    },
  },
})
