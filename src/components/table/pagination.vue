<template>
  <el-pagination
    :currentPage="page"
    :page-size="pageSize"
    :layout="props.layout"
    :total="dataStore.dataCount"
    @current-change="current_change"
    :hide-on-single-page="true">
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
// el-pagination
const pageSize = 3
const currentPage = ref((useRoute().query['p'] as string) || '1')
const page = ref(parseInt(currentPage.value))

//更新query
// onMounted(() => {
//   router.push({ query: { ...route.query } })
// })
const props = withDefaults(defineProps<IProps>(), {
  layout: 'total, prev, pager, next',
})

const current_change = (Page: number) => {
  router.push({ query: { ...route.query, p: Page } })
  currentPage.value = String(Page)
  page.value = Page
  dataStore.query = { ...route.query, p: Page }
}
</script>
