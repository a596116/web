import { CacheEnum } from '@/enum/cacheEnum'
import { http } from '@/plugins/axios'
import { store } from '@/utils'

export interface IRegisterUser {
  name: string
  phone: string
  password: string
  token?: string
}
export interface ILoginUser {
  phone: string
  password: string
}

export interface IAlterUser {
  id: string
  name: string
  phone: string
  password: string
}

export interface IAlterUserPassword {
  phone: string
  password: string
  newPassword: string
}

class userApi {
  // 用戶資訊
  info() {
    return http.request<IUser>({
      url: `user/info?phone=${store.get(CacheEnum.USER_NAME)}`,
    })
  }
  /**
   * 用戶登入
   */
  login(loginForm: ILoginUser) {
    return http.request<Login>({
      url: 'auth/login',
      method: 'POST',
      data: loginForm,
    })
  }

  /**
   * 用戶註冊
   */
  regist(userForm: IRegisterUser) {
    return http.request({
      url: 'auth/regist',
      method: 'post',
      data: { ...userForm, active: '1', avatar: '0', permissions: userForm.name === 'admin' ? ['admin', 'user'] : ['user'] }
    })
  }

  /**
   * 修改用戶資訊
   * @date 2022-08-30
   */
  alterUserInfo(user: IAlterUser) {
    return http.request({
      url: `auth/alter`,
      method: 'POST',
      data: user,
    })
  }

  /**
   * 修改用戶密碼
   * @date 2022-08-30
   */
  alterUserPassword(user: IAlterUserPassword) {
    return http.request({
      url: `auth/alterPassword`,
      method: 'POST',
      data: user,
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

  uploadAvatar(data: FormData, folder: string, id: number) {
    return http.request({
      url: `data/upload/${folder}/${id}`,
      method: 'post',
      data,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  }

}

export default new userApi()
