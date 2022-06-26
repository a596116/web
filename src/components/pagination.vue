<template>
  <el-pagination
    :v-model:currentPage="parseInt(dataStore.currentPage)"
    :page-size="dataStore.pagesize"
    :layout="props.layout"
    :total="dataStore.total"
    @current-change="current_change">
  </el-pagination>
</template>

<script setup lang="ts">
import { dataStores } from '@/stores/dataStore'

export interface IProps {
  layout?: string
}
const router = useRouter()
const route = useRoute()
const dataStore = dataStores()

//更新query
router.push({ query: { ...route.query } })
const props = withDefaults(defineProps<IProps>(), {
  layout: 'total, prev, pager, next',
})

const current_change = (Page: number) => {
  router.push({ query: { ...route.query, p: Page } })
  dataStore.currentPage = String(Page)
}
</script>
