<template>
  <div class="bg-white p-3 px-5 flex justify-between items-center">
    <div class="flex items-center justify-center">
      <section @click="menuStore.toggleMenu" :class="{ 'rotate-180': menuStore.close }" class="duration-200 text-xl mr-2">
        <i class="fas fa-square-caret-left text-gray-600 cursor-pointer"></i>
      </section>
      <breadcrumb class="hidden md:block" />
    </div>

    <div class="flex items-center justify-center">
      <notification class="mr-5" />
      <div @click="fullScreen" class="mr-5 text-lg cursor-pointer hidden md:block">
        <icon-full-screen theme="outline" size="24" fill="#000" v-if="!isFullScreen" />
        <icon-off-screen theme="outline" size="24" fill="#000000" v-else />
      </div>
      <div class="flex justify-center items-center relative group cursor-pointer z-10">
        <img :src="user.info?.avatar" class="w-8 h-8 rounded-full object-cover" />
        <span class="ml-1 text-sm to-gray-600">{{ user.info?.name }}</span>
        <section class="group-hover:block absolute top-full bg-white shadow-sm px-3 whitespace-nowrap border rounded-md hidden">
          <div class="flex items-center cursor-pointer border-b py-3">
            <a class="fas fa-folder-open"></a>
            <span class="text-xs to-gray-600 ml-2">文黨資料</span>
          </div>
          <div class="flex items-center cursor-pointer py-3">
            <a class="fas fa-house-user"></a>
            <span class="text-xs to-gray-600 ml-2">網站首頁</span>
          </div>
          <div class="flex items-center cursor-pointer py-3" @click="userLogout.logout">
            <a class="fa fa-sign-out"></a>
            <span class="text-xs to-gray-600 ml-2">退出登入</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { menus } from '@/stores/menuStore'
import { user as userLogout } from '@/utils'

const user = userStore()
const menuStore = menus()
const isFullScreen = ref<boolean>(false)
const fullScreen = () => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}
</script>

<style scoped></style>
