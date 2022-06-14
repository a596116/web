<template>
    <div class="rounded-full border-2 border-hd-white flex items-center">
        <el-dropdown class="">
            <div class="flex justify-center items-center">
                <img :src="userStore.info?.avatar ? userStore.info?.avatar : '/public/img/haodai.png'" alt="haodai"
                    class="logo1 w-8 h-8 rounded-full object-cover " />
                <span class="mx-2 text-hd-black w-full">
                    {{ userStore.info?.name }}
                </span>
            </div>
            <template #dropdown>
                <el-dropdown-menu class="px-1 py-3">
                    <el-dropdown-item class="text-hd-black hover:!text-hd-theme-color"
                        @click="router.push({ name: 'hd' })">
                        <icon-home theme="outline" size="16" class="mr-1" />
                        首頁
                    </el-dropdown-item>
                    <el-dropdown-item class="text-hd-black hover:!text-hd-theme-color">
                        <icon-setting-config theme="outline" size="16" class="mr-1" />
                        設定
                    </el-dropdown-item>
                    <el-dropdown-item class="text-hd-black hover:!text-hd-theme-color" @click="userStore.logout">
                        <icon-logout theme="outline" size="16" class="mr-1" />
                        登出
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
