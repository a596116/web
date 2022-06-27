import { http } from '@/plugins/axios'
class userApi {
  // 修改資料data(table哪張表, id哪筆資料, data要修改的資料)
  update<T>(table: string, id: string, data: T) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'put',
      data,
    })
  }
  // 用戶列表(table哪張表)
  dataList(table: string, page: string, order?: string, searchInput?: string, permission?: string, active?: string) {
    const o = order ? `&o=${order}` : ''
    const s = searchInput ? `&s=${searchInput}` : ''
    const m = permission ? `&m=${permission}` : ''
    const a = active ? `&a=${active}` : ''
    return http.request({
      url: `data/${table}?p=${page}${o}${s}${m}${a}`,
    })
  }

}

export default new userApi()
