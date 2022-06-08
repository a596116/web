<template>
  <div class="bg-[#f1f2f6] p-3 px-5 flex justify-between items-center">
    <div class="flex items-center justify-center re">
      <section @click="menuStore.toggleMenu" :class="{ 'rotate-180': menuStore.isMenuCollapse }"
        class="duration-200 text-xl mr-3">
        <!-- <icon-menu-unfold theme="outline" size="24" class="text-gray-600 cursor-pointer" /> -->
        <icon-right-square theme="outline" size="26" class="text-gray-600 cursor-pointer" />
      </section>

      <!-- <admin-breadcrumb class="hidden md:block" /> -->
    </div>

    <div class="flex items-center justify-center">
      <notification class="mr-5" />

      <div @click="fullScreen" class="mr-5 text-lg cursor-pointer hidden md:block">
        <icon-full-screen theme="outline" size="24" fill="#000" v-if="!isFullScreen" />
        <icon-off-screen theme="outline" size="24" fill="#000" v-else />
      </div>

      <div class="rounded-full border-2 border-gray-400 flex items-center">
        <el-dropdown class="">
          <div class="flex justify-center items-center">
            <img :src="user.info?.avatar" alt="haodai" class="logo1 w-8 h-8 rounded-full object-cover " />
            <span class="mx-2">
              {{ user.info?.name }}
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="px-1 py-3">
              <el-dropdown-item>
                <icon-setting-config theme="outline" size="16" fill="#000000" class="mr-1" />
                設定
              </el-dropdown-item>
              <el-dropdown-item @click="user.logout">
                <icon-logout theme="outline" size="16" fill="#000000" class="mr-1" />
                登出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { menus } from '@/stores/menuStore'

const user = userStore()
const menuStore = menus()
const isFullScreen = ref<boolean>(false)

const fullScreen = () => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}
</script>

<style scoped lang="scss">
</style>
