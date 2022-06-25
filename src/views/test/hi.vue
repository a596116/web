<template>
  <div class="">
    <div>首頁</div>
    <button @click="getMes">獲取數據</button>
    <button @click="logout">註銷</button>
  </div>
</template>

<script setup lang="ts">
import { http } from '@/plugins/axios'

const getMes = () => {
  http
    .request({
      url: 'jwtmes',
      method: 'get',
    })
    .then((res) => {
      console.log(res)
    })
}
const logout = () => {
  localStorage.removeItem('jwt')
}
</script>

<style scoped></style>
