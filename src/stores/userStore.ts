import type { ILoginData, IRegisterData, UpdataUserData, User } from '@/apis/userApi'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import store from '@/utils/store'
import router from '@/router'
import { CacheEnum } from '@/enum/cacheEnum'
import { firebaseStores } from './firebaseStore'
import { msg } from '@/utils/msg'

export const userStores = defineStore({
  id: 'user',
  state: () => ({
    info: {} as null | User,
    auth: getAuth(),
    firebasestore: firebaseStores()
  }),
  actions: {
    getUserInfo() {
      return new Promise((resolve) => {
        onAuthStateChanged(this.auth, async (user) => {
          if (user) {
            this.info = await this.firebasestore.get('users', user.displayName!) as null | User
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
    login(loginForm: ILoginData) {
      signInWithEmailAndPassword(this.auth, `${loginForm.account}@gmail.com`, loginForm.password)
        .then((userCredential) => {
          const user = userCredential.user
          store.set(CacheEnum.TOKEN_NAME, user.uid)
          const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          router.push({ name: routeName })
          msg(`歡迎${user.displayName}`)
        })
        .catch((error) => {
          ElMessage.error('帳號或密碼錯誤')
          console.error(error)
        })
    },
    logout() {
      signOut(this.auth).then(() => {
        store.remove(CacheEnum.TOKEN_NAME)
        store.remove(CacheEnum.HISTORY_MENU)
        router.push('/')
        this.info = null
        msg('退出登入')
      }).catch((error) => {
        console.error(error)
      })
    },

    createUser(userForm: IRegisterData,) {
      createUserWithEmailAndPassword(this.auth, `${userForm.account}@gmail.com`, userForm.password)
        .then((userCredential) => {
          const user = userCredential.user
          store.set(CacheEnum.TOKEN_NAME, user.uid)
          const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          router.push({ name: routeName })
          msg(`歡迎${userForm.name}`)
          if (this.auth.currentUser) {
            updateProfile(this.auth.currentUser, {
              displayName: userForm.name
            }).then(() => {
              this.getUserInfo()
              this.firebasestore.add('users', userForm.name, userForm)
            }).catch((error) => {
              console.error(error)
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
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
