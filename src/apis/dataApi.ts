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
  userList<IUser>(query?: any) {
    const page = dataStores().page // 頁數
    return http.request<Data<IUser>>({
      method: 'post',
      url: `data/user/${page}`,
      data: { ...query }
    })
  }

  // Blog列表
  blogList<T>(query?: any) {
    const p = query.p || 1 // 頁數
    const o = query.o ? `&o=${query.o}` : '' // 排序
    const s = query.s ? `&s=${query.s}` : ''  // 搜索
    const m = query.m ? `&m=${query.m}` : ''  //單選條件radio
    return http.request<Data<T>>({
      url: `data/blog/${p}?${o}${s}${m}`,
    })
  }

  // 上傳檔案（圖片）
  upload(data: FormData, folder: string, id: number) {
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
      url: `data?id=${table}`,
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
