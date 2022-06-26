<template>
  <div>
    <h1>登入</h1>
    <form @submit.prevent="">
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
</script>

<style scoped></style>
