<template>
  <div>
    <div class="w-[200px]">
      <section class="bg-hd-theme-color p-2">
        <el-image
          :src="user?.avatar ? user?.avatar : '/public/img/haodai.png'"
          fit="cover"
          class="w-full">
        </el-image>
      </section>
      <section class="bg-hd-bg-black flex justify-center items-center py-2 text-lg">
        {{ user?.name }}
      </section>
    </div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import { userStores } from '@/stores/userStore'

const userStore = userStores()
const user = userStore.info
</script>

<style scoped></style>
