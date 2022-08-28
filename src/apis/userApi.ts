import { CacheEnum } from '@/enum/cacheEnum'
import { http } from '@/plugins/axios'
import { store } from '@/utils'

export interface IRegisterData {
  name: string
  account: string
  password: string
  token?: string
}
export interface ILoginData {
  account: string
  password: string
}
class userApi {
  // 用戶資訊
  info() {
    return http.request<IUser>({
      url: `user/info?account=${store.get(CacheEnum.USER_NAME)}`,
    })
  }
  /**
   * 用戶登入
   */
  login(loginForm: ILoginData) {
    return http.request<Login>({
      url: 'auth/login',
      method: 'POST',
      data: loginForm,
    })
  }

  /**
   * 用戶註冊
   */
  regist(userForm: IRegisterData) {
    return http.request({
      url: 'auth/regist',
      method: 'post',
      data: { ...userForm, active: '1', permissions: userForm.name === 'admin' ? 'admin,user' : 'user' }
    })
  }

  update(id: string, data: IUser) {
    return http.request({
      url: `user/${id}`,
      method: 'put',
      data,
    })
  }

  getUser(id: string) {
    return http.request<IUser>({
      url: `user/${id}`,
    })
  }

  /**
   * 獲取註冊驗證碼
   */
  captcha(id?: string) {
    return http.request({
      url: `auth/captcha/${id ? id : '-1'}`,
    })
  }

  verify(captcha: { captcha: string, id: string }) {
    return http.request({
      method: 'POST',
      url: 'auth/captcha',
      data: captcha
    })
  }

}

export default new userApi()
