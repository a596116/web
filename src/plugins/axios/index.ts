
import Axios from './Axios'

export const http = new Axios({
  // baseURL: 'http://103.61.139.237:7001/',
  // baseURL: '/api',
  // baseURL: env.VITE_BASEURL,
  baseURL: 'http://localhost:7001/',
  timeout: 5000,
  headers: {},
})
