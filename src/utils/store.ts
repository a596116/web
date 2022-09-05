// 存儲localstorage
export default {
  // expire 單位秒 token存放時間
  set(key: string, data: any, expire?: number): void {
    if (expire) {
      expire = new Date().getTime() + expire * 1000
    }
    localStorage.setItem(key, JSON.stringify({ data, expire }))
  },
  get(key: string): any {
    const cacheStore = localStorage.getItem(key)
    if (cacheStore) {
      const cache = JSON.parse(cacheStore)
      const expire = cache?.expire
      if (expire && expire < new Date().getTime()) {
        localStorage.removeItem(key)
        return null
      }
      return cache.data
    }
    return null
  },
  remove(...key: string[]) {
    key.forEach((v) => {
      localStorage.removeItem(v)
    })
  },
  removeAll() {
    localStorage.removeItem('user_name')
    localStorage.removeItem('login_token')
    localStorage.removeItem('redirect_router_name')
    localStorage.removeItem('history_menu')
    localStorage.removeItem('dashboard_card_index')
    localStorage.removeItem('menu_is_close')
    localStorage.removeItem('historylink_is_show')
    localStorage.removeItem('breadcrumb_is_show')
  }
}
