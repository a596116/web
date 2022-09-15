<template>
  <el-pagination
    :currentPage="page"
    :page-size="pageSize"
    :layout="props.layout"
    :total="dataStore.dataCount"
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
// el-pagination
const pageSize = 5
const currentPage = ref(dataStore.page)
const page = ref(parseInt(currentPage.value))

//更新query
// onMounted(() => {
//   router.push({ query: { ...route.query } })
// })
const props = withDefaults(defineProps<IProps>(), {
  layout: 'total, prev, pager, next',
})

const current_change = (Page: number) => {
  dataStore.page = String(Page)
  currentPage.value = String(Page)
  page.value = Page
}
</script>
