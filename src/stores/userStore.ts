import { defineStore } from 'pinia'
import userApi, { type User } from '@/apis/userApi'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    info: {} as null | User,
  }),
  getters: {},
  actions: {
    async getUserInfo() {
      const res = await userApi.info()
      this.info = res.result
    },
  },
})
