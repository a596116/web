
import Axios from './Axios'

export const http = new Axios({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 5000,
  headers: {},
})
