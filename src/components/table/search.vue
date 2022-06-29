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
          <el-radio-group v-model="filterRadio">
            <el-radio v-for="(item, index) in col.options" :key="index" :label="item">{{
              item
            }}</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="col.type == 'select'">
          <el-select v-model="filterSelect" clearable class="ml-1 border rounded-md w-[100px]">
            <el-option
              v-for="item in col.options"
              :label="Object.keys(item)[0]"
              :value="((Object.values(item)[0]) as string|number)" />
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
const filterRadio = ref((useRoute().query['m'] as string) || '') // 篩選權限
const filterSelect = ref((useRoute().query['a'] as string) || '') // 篩選權限
const search = () => {
  let list = {} as any
  if (searchInput.value) {
    list.s = searchInput.value
  }
  if (filterRadio.value) {
    list.m = filterRadio.value
  }
  if (filterSelect.value) {
    list.a = filterSelect.value
  }
  router.push({
    query: { ...route.query, ...list },
  })
  dataStore.query = { ...route.query, ...list }
}

// 清除查詢條件
const reset = () => {
  filterSelect.value = ''
  searchInput.value = ''
  filterRadio.value = ''
  dataStore.order = ''
  router.push({ query: {} })
  dataStore.query = {}
}
</script>

<style scoped></style>
