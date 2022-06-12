import userApi, { type ILoginData } from '../apis/userApi'
import { CacheEnum } from '../enum/cacheEnum'
import router from '../router'
import { userStores } from '../stores/userStore'
import store from './store'

export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME))
}

export async function login(values: ILoginData) {
  const {
    result: { token },
  } = await userApi.login(values)
  store.set(CacheEnum.TOKEN_NAME, token)
  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
  router.push({ name: routeName })
}

export function logout() {
  store.remove(CacheEnum.TOKEN_NAME)
  router.push('/')
  userStores().info = null
}
