import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/upload/image',
    method: 'post',
    response: () => {
      return {
        code: 200,
        errno: 0,
        message: 'δΈε³ζε',
        type: 'success',
        result: {
          url: '/img/logo.png',
        },
      }
    },
  },
] as MockMethod[]
