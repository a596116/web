import { Random } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '請求成功',
        type: 'success',
        result: {
          name: '浩呆',
          age: 21,
          avatar: '/img/logo.png',
          permissions: ['editor_markdown'],
        },
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '登入成功',
        type: 'success',
        result: {
          token: Random.string(10),
        },
      }
    },
  },
] as MockMethod[]
