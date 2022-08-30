<template>
  <div class="member">
    <el-tabs v-model="page" tab-position="left" class="h-full" @tab-click="tabClick">
      <el-tab-pane label="用戶資訊" name="info">
        <member-info />
      </el-tab-pane>
      <el-tab-pane label="修改密碼" name="password">
        <member-password />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import type { TabsPaneContext } from 'element-plus'

const route = useRoute()
const page = ref(route.name?.toString().split('/').pop())
watch(
  route,
  () => {
    page.value = route.name?.toString().split('/').pop()
  },
  { immediate: true },
)

const tabClick = (tab: TabsPaneContext) => {
  router.push(tab.paneName as string)
}
</script>

<style scoped lang="scss">
.member {
  :deep(.el-tabs) {
    .el-tabs__item.is-active,
    .el-tabs__item:hover {
      color: var(--hd-theme-color);
    }

    .el-tabs__active-bar {
      background-color: var(--hd-theme-color);
    }
  }
}
</style>
