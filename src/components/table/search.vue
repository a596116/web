<template>
  <div class="bg-white flex justify-between flex-wrap py-5 px-8">
    <el-form
      ref="formRef"
      v-model:model="searchModel"
      label-width="80px"
      :inline="false"
      size="large"
      class="flex flex-wrap text-hd-black1">
      <el-form-item
        class="flex mr-5"
        :label="`${col.title} : `"
        v-for="col in columns"
        :key="col.name"
        :prop="col.name">
        <template v-if="col.type == 'input'">
          <el-input
            v-model="searchModel[col.name]"
            placeholder=""
            @keydown.esc="searchModel[col.name] = ''"
            clearable
            class="border rounded-md !w-[150px]">
          </el-input>
        </template>

        <template v-else-if="col.type == 'radio'">
          <el-radio-group v-model="searchModel[col.name]">
            <el-radio v-for="(item, index) in col.options" :key="index" :label="item">{{
              item
            }}</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="col.type == 'select'">
          <el-select
            v-model="searchModel[col.name]"
            clearable
            class="ml-1 border rounded-md w-[100px]">
            <el-option
              v-for="item in col.options"
              :label="Object.keys(item)[0]"
              :value="((Object.values(item)[0]) as string|number)" />
          </el-select>
        </template>
      </el-form-item>
    </el-form>

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
import { CacheEnum } from '@/enum/cacheEnum'
import { dataStores } from '@/stores/dataStore'
import { store } from '@/utils'

const { columns, tableName } = defineProps<{
  columns: searchColumnsType[]
  tableName: string
}>()

const dataStore = dataStores()

const searchModel = ref<any>(store.get(CacheEnum.SEARCH_RULE) || {})

// 查詢條件

const search = async () => {
  console.log(searchModel.value)

  Object.keys(searchModel.value).forEach((item) => {
    if (
      typeof searchModel.value[item] === 'undefined' ||
      searchModel.value[item] === null ||
      searchModel.value[item] === ''
    ) {
      delete searchModel.value[item]
    }
  })
  if (JSON.stringify(searchModel.value) === '{}') {
    ElMessage.warning('沒有查詢條件')
    return
  }
  store.set(CacheEnum.SEARCH_RULE, searchModel.value)
  await dataStore.getData(tableName)
}

// 清除查詢條件
const reset = async () => {
  if (JSON.stringify(searchModel.value) === '{}') {
    ElMessage.warning('沒有條件可以清除')
    return
  }
  searchModel.value = {}
  store.remove(CacheEnum.SEARCH_RULE)
  await dataStore.getData(tableName)
}
</script>

<style scoped></style>
