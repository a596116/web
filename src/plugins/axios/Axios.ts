import axios, { type AxiosRequestConfig } from 'axios'
import { CacheEnum } from '@/enum/cacheEnum'
import { store } from '@/utils'
import router from '@/router'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  public async request<T, D = responseResult<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance.request<D>(config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  // 請求攔截
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = {
          // Authorization: 'Bearer ' + store.get(CacheEnum.TOKEN_NAME),
          token: store.get(CacheEnum.TOKEN_NAME)
        }
        return config
      },
      (error) => {
        console.error('請求失敗')
        return Promise.reject(error)
      },
    )
  }

  // 響應攔截
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        switch (error.response.status) {
          case 401:
            store.remove(CacheEnum.TOKEN_NAME)
            router.push({ name: 'login' })
            break
        }
        return Promise.reject(error)
      },
    )
  }
}
