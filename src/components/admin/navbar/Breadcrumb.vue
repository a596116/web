<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'admin/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>{{ menuStore.route?.menu?.title }}</el-breadcrumb-item>
      <!-- <template v-if="menuStore.route">
        <el-breadcrumb-item v-for="(r, index) in menuStore.route.matched" :key="index">
          {{ r.meta.menu?.title }}
        </el-breadcrumb-item>
      </template> -->
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { menuStores } from '@/stores/menuStore'
const menuStore = menuStores()
</script>

<style lang="scss">
.el-breadcrumb__inner {
  color: var(--hd-black1) !important;
}

.el-breadcrumb__inner.is-link {
  color: var(--hd-black2) !important;
}

.el-breadcrumb__inner.is-link:hover {
  color: var(--hd-theme-color) !important;
}
</style>
