import { http } from '@/plugins/axios'
import { dataStores } from '@/stores/dataStore'
export interface Data<T> {
  count: number
  rows: T[]
}
export interface Upload {
  name: string
  url: string
}

class dataApi {
  // 修改資料data(table哪張表, id哪筆資料, data要修改的資料)
  update(table: string, id: string, data: any) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'put',
      data,
    })
  }
  // 用戶列表
  userList<IUser>(page = 1, query?: any) {
    const p = page || 1
    return http.request<Data<IUser>>({
      method: 'post',
      url: `data/user/${p}`,
      data: { ...query }
    })
  }

  // Blog列表
  blogList<T>(page = 1, query?: any) {
    const p = page || 1
    return http.request<Data<IUser>>({
      method: 'post',
      url: `data/blog/${p}`,
      data: { ...query }
    })
  }

  // 上傳檔案（圖片）
  upload(data: FormData, folder: string, id: string) {
    return http.request<Upload>({
      url: `data/upload/${folder}/${id}`,
      method: 'post',
      data,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  }

  create<T>(table: string, data: T) {
    return http.request({
      url: `data/create/${table}`,
      method: 'post',
      data
    })
  }

  delete(table: string, id: number) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'DELETE'
    })
  }

}

export default new dataApi()
