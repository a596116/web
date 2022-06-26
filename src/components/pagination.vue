<template>
  <el-pagination
    :v-model:currentPage="parseInt(firebaseStore.currentPage)"
    :page-size="firebaseStore.pagesize"
    :layout="props.layout"
    :total="firebaseStore.total"
    @current-change="current_change">
  </el-pagination>
</template>

<script setup lang="ts">
import { CacheEnum } from '@/enum/cacheEnum'
import { firebaseStores } from '@/stores/firebaseStore'
import { store } from '@/utils'

export interface IProps {
  layout?: string
}
const router = useRouter()
const route = useRoute()
const firebaseStore = firebaseStores()

// 獲取query
// const page = store.get(CacheEnum.CURRENT_PAGE) || 1
//更新query
router.push({ query: { ...route.query } })

const props = withDefaults(defineProps<IProps>(), {
  layout: 'total, prev, pager, next',
})

const current_change = (Page: number) => {
  router.push({ query: { ...route.query, p: Page } })
  firebaseStore.currentPage = String(Page)
}
</script>
