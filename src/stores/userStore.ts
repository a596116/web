import type { ILoginData, IRegisterData, UpdataUserData, User } from '@/apis/userApi'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import store from '@/utils/store'
import router from '@/router'
import { CacheEnum } from '@/enum/cacheEnum'
import { db } from "@/stores/firebase/firebase"
import { ElMessage } from 'element-plus'
import autoload from '@/router/autoload'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    info: {} as null | User,
    auth: getAuth(),
  }),
  getters: {
  },
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
    login(loginForm: ILoginData) {
      signInWithEmailAndPassword(this.auth, loginForm.account, loginForm.password)
        .then(async (userCredential) => {
          const user = userCredential.user
          store.set(CacheEnum.TOKEN_NAME, user.uid)
          const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          await router.push({ name: routeName })
          // 刷新一次獲取需過濾的路由
          location.reload()
        })
        .catch((error) => {
          ElMessage.error('帳號或密碼錯誤')
        })
    },
    logout() {
      signOut(this.auth).then(() => {
        store.remove(CacheEnum.TOKEN_NAME)
        router.push('/')
        this.info = null
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
