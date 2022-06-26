import type { ILoginData, IRegisterData } from '@/apis/userApi'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
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
    auth: getAuth(),
  }),

  actions: {
    // 獲取用戶資訊
    async getUserInfo() {
      return new Promise(async (resolve) => {
        await userApi.info()
          .then((user) => {
            this.info = user as unknown as IUser
            resolve(user)
          })
      })
    },

    // 登入帳號
    async login(loginForm: ILoginData) {
      await userApi.login(loginForm)
        .then(async (token) => {
          store.set(CacheEnum.TOKEN_NAME, token)
          const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          await this.permissionlist()
          if (this.info?.active == '1') {
            router.push({ name: routeName })
            msg(`歡迎${this.info?.name}`)
          } else {
            store.remove(CacheEnum.TOKEN_NAME)
            this.info = null
            msg('您以被停權，請聯繫管理員', 'error')
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
        .then(async (res: any) => {
          const exist = res.findIndex((item: IUser) => {
            return item.account == userForm.account
          })
          if (exist != -1) {
            msg('此帳號已被使用', 'error')
          } else {
            await userApi.create(userForm)
              .then((res: any) => {
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

    // 更新使用者資料
    updateUserInfo(obj: any) {
      if (this.auth.currentUser) {
        updateProfile(this.auth.currentUser, {
        }).then(() => {
          console.log('update success')
        }).catch((error) => {
        })
      }
    },

    // 添加需權限的路由
    async permissionlist() {
      await this.getUserInfo()
      permissionList.forEach((r) => {
        if (this.info?.permissions.split(',').includes(r.meta?.permission!)) {
          router.addRoute(r.meta!.page!.name, r)
        }
      })
    },
  },
})
