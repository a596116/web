<script setup lang="ts">
// import { user } from '@/utils'
</script>

<template>
  <div class="h-screen w-screen bg-gray-700 flex flex-col justify-center items-center">
    <img src="/img/logo.png" class="w-60 h-60 object-contain rounded-full border-8 border-white mb-5" />
    <div>
      <router-link :to="{ name: 'hd' }"
        class="bg-purple-500 text-white w-full p-2 rounded-md m-5 hover:bg-purple-600 duration-300">首頁</router-link>
      <router-link :to="{ name: 'admin/home' }"
        class="bg-purple-500 text-white w-full p-2 rounded-md m-5 hover:bg-purple-600 duration-300">後台管理</router-link>
      <!-- <router-link v-if="!user.isLogin()" :to="{ name: 'login' }" class="hd-button hd-danger ml-3">用戶登入</router-link> -->
    </div>
    <div class="text-gray-200 text-4xl font-mono drop-shadow-md mt-6">浩呆</div>
  </div>
</template>
