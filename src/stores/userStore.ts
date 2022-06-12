import type { ILoginData, IRegisterData, UpdataUserData, User } from '@/apis/userApi'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import store from '@/utils/store'
import router from '@/router'
import { CacheEnum } from '@/enum/cacheEnum'

export const userStores = defineStore({
  id: 'user',
  state: () => ({
    info: {} as null | User,
    auth: getAuth(),
  }),
  actions: {
    getUserInfo() {
      return new Promise((resolve) => {
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            this.info = {
              name: user.displayName || user.email || '',
              avatar: user.photoURL || 'https://upload.cc/i1/2022/05/12/C5ogOU.png',
              permissions: ['editor'],
            }
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
      signInWithEmailAndPassword(this.auth, loginForm.account, loginForm.password)
        .then(async (userCredential) => {
          const user = userCredential.user
          store.set(CacheEnum.TOKEN_NAME, user.uid)
          const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          await router.push({ name: routeName })
          ElMessage({
            message: `歡迎${user.displayName}`,
            center: true,
            type: 'success',
          })
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
        ElMessage({
          message: '退出登入',
          center: true,
          type: 'success',
        })
      }).catch((error) => {
        console.error(error)
      })
    },

    createUser(userForm: IRegisterData,) {
      createUserWithEmailAndPassword(this.auth, userForm.account, userForm.password)
        .then((userCredential) => {
          const user = userCredential.user
          store.set(CacheEnum.TOKEN_NAME, user.uid)
          const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          router.push({ name: routeName })
          if (this.auth.currentUser) {
            updateProfile(this.auth.currentUser, {
              displayName: userForm.name
            }).then(() => {
              this.getUserInfo()
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
