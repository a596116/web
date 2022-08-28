import type { ILoginData, IRegisterData } from '@/apis/userApi'
import store from '@/utils/store'
import router from '@/router'
import { CacheEnum } from '@/enum/cacheEnum'
import { msg } from '@/utils/msg'
import { permissionList } from '@/router/autoload'
import userApi from '@/apis/userApi'

export const userStores = defineStore({
  id: 'user',
  state: () => ({
    info: {} as null | IUser,
  }),

  actions: {
    /**
     * 獲取用戶資訊
     * @date 2022-08-27
     */
    async getUserInfo() {
      return new Promise(async (resolve) => {
        await userApi.info()
          .then((res) => {
            if (res.code == 20000) {
              this.info = res.data
              resolve(res)
            } else {
              console.log('未獲取到用戶資訊')
              resolve(res)
            }
          })
          .catch(() => {
            resolve(null)
          })
      })
    },

    /**
     * 添加需權限的路由
     * @date 2022-08-27
     */
    async permissionlist() {
      await this.getUserInfo()
      permissionList.forEach((r) => {
        if (this.info?.permissions.includes(r.meta?.permission!)) {
          router.addRoute(r.meta!.page!.name, r)
        }
      })
    },

    /**
     * 登入帳號
     * @date 2022-08-27
     */
    async login(loginForm: ILoginData) {
      const user = {
        account: `${loginForm.account}@gmail.com`,
        password: loginForm.password
      }
      await userApi.login(user)
        .then(async (res) => {
          if (res.code == 20000) {
            store.set(CacheEnum.TOKEN_NAME, res.data.token)
            store.set(CacheEnum.USER_NAME, res.data.userAccount)
            const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
            await this.permissionlist()
            if (this.info?.active === '1') { //檢查用戶狀態
              router.push({ name: routeName })
              msg(`歡迎${this.info?.name}`)
            } else {
              store.remove(CacheEnum.TOKEN_NAME, CacheEnum.USER_NAME)
              msg('您以被停權，請聯繫管理員', 'error')
            }
          } else {
            msg('帳號或密碼錯誤', 'error')
          }
        })
        .catch((err) => {
          msg(`登入發生錯誤，詳情-${err}`, 'error')
          console.error(err)
        })
    },

    /**
     * 新用戶註冊
     * @date 2022-08-27
     */
    async registUser(userForm: IRegisterData) {
      const user = { ...userForm, account: `${userForm.account}@gmail.com` }
      await userApi.regist(user)
        .then(res => {
          if (res.code == 20000) {
            this.login(userForm)
          } else {
            msg(`${res.code}:${res.message}`, 'error')
          }
        })
    },

    // 退出登入
    logout() {
      permissionList.forEach((r) => {
        if (router.hasRoute(r.name!)) router.removeRoute(r.name!)
      })
      store.remove(CacheEnum.TOKEN_NAME, CacheEnum.HISTORY_MENU, CacheEnum.REDIRECT_ROUTE_NAME, CacheEnum.MENU_IS_CLOSE, CacheEnum.HISTORYLINK_IS_SHOW, CacheEnum.BREADCRUMB_IS_SHOW)
      this.info = null
      router.push('/')
      msg('退出登入')
    },
  },
})
