
import Axios from './Axios'

export const http = new Axios({
  baseURL: '/api',
  timeout: 5000,
  headers: {},
})
