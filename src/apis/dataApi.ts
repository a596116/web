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

export interface Birthday {
  name: string
  url: string
  gift: any
}

class dataApi {
  // 用戶列表
  userList<IUser>(page = 1, query?: any) {
    const p = page || 1
    return http.request<Data<IUser>>({
      method: 'post',
      url: `data/user/${p}`,
      data: { ...query }
    })
  }

  // Topic列表
  topicList<T>(page = 1, query?: any) {
    const p = page || 1
    return http.request<Data<IUser>>({
      method: 'post',
      url: `data/topic/${p}`,
      data: { ...query }
    })
  }

  // birthday列表
  birthdayList<T>(page = 1, query?: any) {
    const p = page || 1
    return http.request<Data<Birthday>>({
      method: 'post',
      url: `data/birthday/${p}`,
      data: { ...query }
    })
  }

  // 修改資料data(table哪張表, id哪筆資料, data要修改的資料)
  update(table: string, id: string, data: any) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'put',
      data,
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
