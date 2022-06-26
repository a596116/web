import type { ILoginData, IRegisterData, UpdataUserData } from '@/apis/userApi'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import store from '@/utils/store'
import router from '@/router'
import { CacheEnum } from '@/enum/cacheEnum'
import { firebaseStores } from './dataStore'
import { msg } from '@/utils/msg'
import { permissionList } from '@/router/autoload'

export const userStores = defineStore({
  id: 'user',
  state: () => ({
    info: {} as null | IUser,
    auth: getAuth(),
    firebasestore: firebaseStores()
  }),
  actions: {
    getUserInfo() {
      return new Promise((resolve) => {
        onAuthStateChanged(this.auth, async (user) => {
          if (user) {
            this.info = await this.firebasestore.get('users', user.displayName!) as null | IUser
            // setTimeout(() => resolve(user), 3000) // 模擬網路延遲
            resolve(user)
          } else {
            resolve(user)
          }
        })
      })
    },
    isLogin() {
      return Boolean(store.get(CacheEnum.TOKEN_NAME))
    },
    // 添加需權限的路由
    async permissionlist() {
      await this.getUserInfo()
      permissionList.forEach((r) => {
        if (this.info?.permissions.includes(r.meta?.permission!)) {
          router.addRoute(r.meta!.page!.name, r)
        }
      })
    },
    async login(loginForm: ILoginData) {
      signInWithEmailAndPassword(this.auth, `${loginForm.account}@gmail.com`, loginForm.password)
        .then(async (userCredential) => {
          await this.permissionlist()
          const user = userCredential.user
          if (this.info?.active) {
            store.set(CacheEnum.TOKEN_NAME, user.uid)
            const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
            router.push({ name: routeName })
            msg(`歡迎${user.displayName}`)
          } else {
            this.info = null
            msg('您以被停權，請聯繫管理員', 'error')
          }
        })
        .catch((error) => {
          msg('帳號或密碼錯誤', 'error')
          console.error(error)
        })
    },
    logout() {
      signOut(this.auth).then(() => {
        permissionList.forEach((r) => {
          if (router.hasRoute(r.name!)) router.removeRoute(r.name!)
        })
        store.remove(CacheEnum.TOKEN_NAME, CacheEnum.HISTORY_MENU, CacheEnum.REDIRECT_ROUTE_NAME, CacheEnum.MENU_IS_CLOSE, CacheEnum.HISTORYLINK_IS_SHOW, CacheEnum.BREADCRUMB_IS_SHOW)
        this.info = null
        router.push('/')
        msg('退出登入')
      }).catch((error) => {
        console.error(error)
      })
    },

    async createUser(userForm: IRegisterData,) {
      const userName = await this.firebasestore.get('users', userForm.name)
      if (userName != null) {
        msg('此名稱已被使用', 'error')
      } else {
        createUserWithEmailAndPassword(this.auth, `${userForm.account}@gmail.com`, userForm.password)
          .then((userCredential) => {
            const user = userCredential.user
            store.set(CacheEnum.TOKEN_NAME, user.uid)
            const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
            if (this.auth.currentUser) {
              updateProfile(this.auth.currentUser, {
                displayName: userForm.name
              }).then(async () => {
                this.firebasestore.add('users', userForm.name, { ...userForm, permissions: [], active: true })
                await this.permissionlist()
                router.push({ name: routeName })
                msg(`歡迎${userForm.name}`)
              }).catch((error) => {
                console.error(error)
              })
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    updateUserInfo(obj: UpdataUserData) {
      if (this.auth.currentUser) {
        updateProfile(this.auth.currentUser, {
        }).then(() => {
          console.log('update success')
        }).catch((error) => {
        })
      }
    }
  },
})
