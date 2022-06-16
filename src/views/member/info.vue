<template>
  <div>
    <div class="w-[200px] bg-hd-theme-color p-2">
      <el-image
        :src="userStore.info?.avatar ? userStore.info?.avatar : '/public/img/haodai.png'"
        fit="cover"
        class="w-full">
      </el-image>
    </div>
    {{ userStore.info }}
  </div>
</template>

<script setup lang="ts">
import { userStores } from '@/stores/userStore'

const userStore = userStores()
</script>

<style scoped></style>
