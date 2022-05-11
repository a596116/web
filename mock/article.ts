import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
export default [
  {
    url: '/api/article',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '請求成功',
        type: 'success',
        result: new Array(10).fill('').map((article, index) => {
          return {
            id: index,
            title: Random.ctitle(),
            content: Random.cparagraph(),
          }
        }),
      }
    },
  },
] as MockMethod[]
