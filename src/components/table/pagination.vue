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
  tableName: string
}
const dataStore = dataStores()
const router = useRouter()
const route = useRoute()
// el-pagination
const pageSize = 5
const page = ref(parseInt(route.params.id as string) || 1)

//更新query
// onMounted(() => {
// router.push({ query: { ...route.query } })
// })
const props = withDefaults(defineProps<IProps>(), {
  layout: 'total, prev, pager, next',
  tableName: '',
})

const current_change = async (Page: number) => {
  page.value = Page
  await router.push({ name: `admin/${props.tableName}`, params: { id: Page } })
  await dataStore.getData(props.tableName)
}
</script>
