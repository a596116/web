<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <template v-if="menuStore.route">
        <el-breadcrumb-item v-for="(r, index) in menuStore.route.matched" :key="index">
          {{ r.meta.menu?.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { menus } from '@/stores/menuStore'
const menuStore = menus()
</script>

<style scoped>
</style>
