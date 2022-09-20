<template>
  <div class="flex items-center">
    <el-dropdown class="">
      <div class="w-full flex justify-center items-center">
        <img
          :src="userStore.info?.avatar !== '0' ? userStore.info?.avatar : '/img/haodai.png'"
          class="logo1 w-8 h-8 rounded-full object-cover" />
        <span class="mx-2 text-hd-black w-full text-base">
          {{ userStore.info?.name }}
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="px-1 py-3">
          <el-dropdown-item
            class="text-hd-black hover:!text-hd-theme-color"
            @click="router.push({ name: 'admin/member/info' })">
            <icon-home theme="outline" size="16" class="mr-1" />
            會員訊息
          </el-dropdown-item>
          <!-- <el-dropdown-item class="text-hd-black hover:!text-hd-theme-color"
                        @click="router.push({ name: 'admin/member/info' })">
                        <icon-setting-config theme="outline" size="16" class="mr-1" />
                        設定
                    </el-dropdown-item> -->
          <el-dropdown-item
            class="text-hd-black hover:!text-hd-theme-color"
            @click="userStore.logout">
            <icon-logout theme="outline" size="16" class="mr-1" />
            退出登入
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { userStores } from '@/stores/userStore'
const userStore = userStores()
</script>
