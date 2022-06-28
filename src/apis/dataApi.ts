import { http } from '@/plugins/axios'
export interface Data<T> {
  count: number
  rows: T[]
}
export interface Upload {
  name: string
  file: string
}
class userApi {
  // 修改資料data(table哪張表, id哪筆資料, data要修改的資料)
  update<T>(table: string, id: number, data: T) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'put',
      data,
    })
  }
  // 用戶列表(table哪張表)
  dataList<T>(table: string, query: any) {
    const p = query.p ? `p=${query.p}` : '' // 頁數
    const o = query.o ? `&o=${query.o}` : '' // 排序
    const s = query.s ? `&s=${query.s}` : ''  // 搜索
    const m = query.m ? `&m=${query.m}` : ''  //單選條件radio
    const a = query.a ? `&a=${query.a}` : '' //select條件
    return http.request<Data<T>>({
      url: `data/${table}?${p}${o}${s}${m}${a}`,
    })
  }

  upload(data: FormData, folder: string) {
    return http.request<Upload>({
      url: `upload/${folder}`,
      method: 'post',
      data,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  }

}

export default new userApi()
