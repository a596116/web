<template>
  <div class="bg-white flex justify-between py-5 px-8">
    <slot></slot>
    <div class="flex">
      <el-button
        @click="search"
        class="!bg-hd-theme-color !text-gray-50 py-4 hover:!text-hd-white !border-0">
        <icon-search theme="outline" size="20" /> 查詢
      </el-button>

      <el-button @click="reset" class="py-4">
        <icon-clear theme="outline" size="20" /> 清除
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dataStores } from '@/stores/dataStore'
const route = useRoute()
const router = useRouter()
const dataStore = dataStores()

// 查詢條件
const search = () => {
  let list = {} as any
  if (dataStore.searchInput) {
    list.s = dataStore.searchInput
  }
  if (dataStore.filterPermission) {
    list.m = dataStore.filterPermission
  }
  if (dataStore.filterActive) {
    list.a = dataStore.filterActive
  }
  router.push({
    query: { ...route.query, ...list },
  })
}

// 清除查詢條件
const reset = () => {
  dataStore.filterActive = ''
  dataStore.order = ''
  dataStore.searchInput = ''
  dataStore.filterPermission = ''
  router.push({ query: {} })
}
</script>

<style scoped></style>
