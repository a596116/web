import { http } from '@/plugins/axios'

export interface Upload {
  url: string
}

class uploadApi {
  uploadImage(data: FormData) {
    return http.request<Upload>({
      url: 'upload/image',
      method: 'post',
    })
  }
}

export default new uploadApi()
