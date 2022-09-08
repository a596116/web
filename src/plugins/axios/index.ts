
import Axios from './Axios'

export const http = new Axios({
  // baseURL: 'https://nestjs-a596116.vercel.app/',
  baseURL: env.VITE_BASEURL,
  // baseURL: 'http://localhost:3000/',

  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
