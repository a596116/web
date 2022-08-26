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
    info: { permissions: { 'p': [] } } as null | IUser,
  }),

  actions: {
    // 獲取用戶資訊
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
    // 添加需權限的路由
    async permissionlist() {
      await this.getUserInfo()
      permissionList.forEach((r) => {
        if (this.info?.permissions['p'].includes(r.meta?.permission!)) {
          router.addRoute(r.meta!.page!.name, r)
        }
      })
    },
    // 登入帳號
    async login(loginForm: ILoginData) {
      const user = {
        account: `${loginForm.account}@gmail.com`,
        password: loginForm.password
      }
      await userApi.login(user)
        .then(async (token) => {
          if (token.code == 20000) {
            store.set(CacheEnum.TOKEN_NAME, token.data.token)
            const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
            await this.permissionlist()
            if (this.info?.active == '1') { //檢查用戶狀態
              router.push({ name: routeName })
              msg(`歡迎${this.info?.name}`)
            } else {
              store.remove(CacheEnum.TOKEN_NAME)
              msg('您以被停權，請聯繫管理員', 'error')
            }
          } else {
            msg('帳號或密碼錯誤', 'error')
          }
        })
        .catch((err) => {
          msg('帳號或密碼錯誤', 'error')
          console.error(err)
        })
    },

    // 新增用戶
    async createUser(userForm: IRegisterData) {
      await userApi.userList()
        .then(async (res) => {
          const exist = res.data.findIndex((item: IUser) => {
            return item.account == userForm.account
          })
          if (exist != -1) {
            msg('此帳號已被使用', 'error')
          } else {
            await userApi.create(userForm)
              .then((res) => {
                if (res.code == 20000) {
                  this.login({ account: userForm.account, password: userForm.password })
                } else {
                  msg(res.message, 'error')
                }
              })
              .catch((err) => {
                msg(err, 'error')
                console.error(err)
              })
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
