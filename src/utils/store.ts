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
  remove(key: string) {
    localStorage.removeItem(key)
  },
}
