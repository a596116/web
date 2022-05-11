import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/upload/image',
    method: 'post',
    response: () => {
      return {
        code: 200,
        errno: 0,
        message: '上傳成功',
        type: 'success',
        result: {
          url: '/img/logo.png',
        },
      }
    },
  },
] as MockMethod[]
