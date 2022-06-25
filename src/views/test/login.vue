<template>
  <div>
    <h1>登入</h1>
    <form @submit.prevent="dologin">
      <input type="text" v-model="user.username" />
      <input type="text" v-model="user.password" />
      <button>登入</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { http } from '@/plugins/axios'

const user = reactive({
  username: '',
  password: '',
})

const dologin = () => {
  http
    .request({
      url: 'jwtlogin',
      method: 'post',
      data: {
        user: user,
      },
    })
    .then((res) => {
      if (res.code == 20000) {
        localStorage.setItem('jwt', res.token)
        console.log(res.token)
        router.push({ name: 'admin/hi' })
      }
    })
}
</script>

<style scoped></style>
