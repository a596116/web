import { CacheEnum } from '@/enum/cacheEnum'
import { http } from '@/plugins/axios'
import { store } from '@/utils'

export interface IRegisterData {
  account: string
  password: string
  name: string
  avatar?: string
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
      url: `user/info/${store.get(CacheEnum.TOKEN_NAME)}`,
    })
  }
  // 用戶列表
  userList() {
    return http.request<IUser[]>({
      url: `user`,
    })
  }
  // 登入
  login(loginForm: ILoginData) {
    return http.request<Login>({
      url: 'login',
      method: 'post',
      data: {
        user: loginForm,
      },
    })
  }
  // 新增用戶
  create(userForm: IRegisterData) {
    return http.request({
      url: 'user',
      method: 'post',
      data: {
        user: { ...userForm, active: '1', permissions: { "p": [] } },
      },
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

}

export default new userApi()
