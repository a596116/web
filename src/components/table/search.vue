<template>
  <div class="bg-white flex justify-between py-5 px-8">
    <div class="flex flex-wrap text-hd-black1">
      <section class="flex mr-5" v-for="col in columns">
        <span class="flex items-center">{{ col.title }}：</span>
        <template v-if="col.type == 'input'">
          <el-input
            v-model="searchInput"
            placeholder=""
            @keydown.esc="searchInput = ''"
            clearable
            class="border rounded-md !w-[150px]">
          </el-input>
        </template>

        <template v-else-if="col.type == 'radio'">
          <el-radio-group v-model="filterPermission">
            <el-radio label="浩呆">浩呆</el-radio>
            <el-radio label="admin">admin</el-radio>
            <el-radio label="user">user</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="col.type == 'select'">
          <el-select v-model="filterActive" clearable class="ml-1 border rounded-md w-[100px]">
            <el-option label="true" value="1" />
            <el-option label="fales" value="0" />
          </el-select>
        </template>
      </section>
    </div>

    <!-- button -->
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
import type { searchColumnsType } from '@/config/search'
import { dataStores } from '@/stores/dataStore'

const { columns } = defineProps<{
  columns: searchColumnsType[]
}>()

const route = useRoute()
const router = useRouter()
const dataStore = dataStores()

// 查詢條件

const searchInput = ref((useRoute().query['s'] as string) || '')
const filterPermission = ref((useRoute().query['m'] as string) || '') // 篩選權限
const filterActive = ref((useRoute().query['a'] as string) || '') // 篩選權限
const search = () => {
  let list = {} as any
  if (searchInput.value) {
    list.s = searchInput.value
  }
  if (filterPermission.value) {
    list.m = filterPermission.value
  }
  if (filterActive.value) {
    list.a = filterActive.value
  }
  router.push({
    query: { ...route.query, ...list },
  })
  dataStore.query = { ...route.query, ...list }
}

// 清除查詢條件
const reset = () => {
  filterActive.value = ''
  searchInput.value = ''
  filterPermission.value = ''
  dataStore.order = ''
  router.push({ query: {} })
  dataStore.query = {}
}
</script>

<style scoped></style>
