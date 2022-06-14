import { CacheEnum } from '@/enum/cacheEnum'
import { userStores } from '@/stores/userStore'
import { store } from '@/utils'
import type { RouteLocationNormalized, Router } from 'vue-router'
import autoload from './autoload'
class Guard {
  constructor(private router: Router) { }
  public run() {
    this.router.beforeEach(this.beforeEach.bind(this))
  }

  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    if (from.name == 'login') {
      autoload(this.router)
    }
    if (to.meta.auth && !this.token()) {
      store.set(CacheEnum.REDIRECT_ROUTE_NAME, to.name)
      return { name: 'login' }
    }
    if (to.meta.guest && this.token()) return from
  }

  private token(): string | null {
    return store.get(CacheEnum.TOKEN_NAME)
  }
}

export default (router: Router) => {
  new Guard(router).run()
}
