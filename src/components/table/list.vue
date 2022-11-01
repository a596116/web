<template>
  <div>
    <el-table
      ref="tableRef"
      :data="usersList"
      tooltip-effect="dark"
      stripe
      show-overflow-tooltip
      class="text-base"
      @sort-change="sortChange">
      <el-table-column
        v-for="col in columns"
        :fixed="col.fixed || false"
        :prop="col.prop"
        :key="col.prop"
        :label="col.title"
        :width="col.width"
        :align="col.align"
        #default="{ row }">
        <template v-if="col.type === 'image'">
          <el-image
            preview-teleported
            :hide-on-click-modal="true"
            :preview-src-list="[row[col.prop]!]"
            :src="row[col.prop]"
            fit="cover"
            class="rounded-md" />
        </template>
        <template v-else-if="col.type === 'tag'">
          <template v-for="(item, index) in row[col.prop]!" :key="index">
            <el-tag v-if="item" :color="col.options[item]" class="mx-1 !border-0" effect="dark">
              {{ item }}
            </el-tag>
          </template>
        </template>
        <template v-else-if="col.type === 'preview'">
          <el-button type="info" @click="showPreview(row, col.prop)">預覽</el-button>
        </template>
        <template v-else-if="col.type === 'category'">
          <el-tag class="mx-1 !border-0" :color="col.options[row[col.prop]]" effect="dark">
            {{ row[col.prop] }}
          </el-tag>
        </template>
        <template v-else-if="col.type === 'switch'">
          <el-switch
            :model-value="row[col.prop]"
            active-value="1"
            inactive-value="0"
            class="ml-2"
            active-color="#13ce66"
            :disabled="row.name === 'admin'"
            @change="changeSwitch(row, col.prop)" />
        </template>
        <template v-else-if="col.type === 'list'">
          <span>{{ row[col.prop].length }}</span>
        </template>
        <template v-else-if="col.type === 'link'">
          <a :href="row[col.prop]" target="_blank">{{ row[col.prop] }}</a>
        </template>
        <template v-else>
          {{ row[col.prop] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="日期"
        width="200"
        sortable="custom"
        :default-sort="{
          prop: 'date',
          order: store.get(CacheEnum.SEARCH_RULE)?.order || 'descending',
        }"
        :sort-orders="['ascending', 'descending']" />

      <!-- 操作列 -->
      <el-table-column
        :width="buttonColumnWidth"
        #default="{ row }"
        v-if="buttons"
        align="center"
        fixed="right">
        <el-button-group>
          <el-button
            :disabled="row.name === 'admin'"
            :type="item.type || 'default'"
            v-for="(item, key) in buttons"
            @click="emit('action', row, item.command)">
            {{ item.title }}
          </el-button>
        </el-button-group>
      </el-table-column>
    </el-table>

    <!-- 分頁 -->
    <div class="flex justify-center mt-5">
      <table-pagination layout="total, prev, pager, next" :table-name="tableName">
      </table-pagination>
    </div>

    <el-dialog v-model="previewVisible" title="" custom-class="dialog">
      <div class="" v-html="html"></div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { dataStores } from '@/stores/dataStore'
import { ElMessageBox } from 'element-plus'
import { ElTable } from 'element-plus'
import type { tableButtonType, tableColumnsType } from '@/config/table'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'

const { columns, tableName, buttons, permission } = defineProps<{
  tableName: string
  columns: tableColumnsType[]
  buttons?: tableButtonType[]
  permission?: string
}>()

const emit = defineEmits<{
  (e: 'action', model: any, command: string): void
}>()

const dataStore = dataStores()

await dataStore.init(tableName)
onUnmounted(() => {
  store.remove(CacheEnum.SEARCH_RULE)
})

// 渲染數據
const usersList = computed(() => {
  return dataStore.data
})

// 排序
const sortChange = async (order: any) => {
  store.set(CacheEnum.SEARCH_RULE, { ...store.get(CacheEnum.SEARCH_RULE), order: order?.order })
  await dataStore.getData(tableName)
}

// 變更switch狀態
const changeSwitch = (data: any, prop: string) => {
  ElMessageBox.confirm('確定嗎？', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      let s = {} as any
      s[prop] = data[prop] == '1' ? '0' : '1'
      dataStore.update(tableName, data.id, s, permission)
    })
    .catch(() => {
      if (data[prop] == '1') {
        data[prop] = '0'
      } else {
        data[prop] = '1'
      }
    })
}
const previewVisible = ref(false)
const html = ref()
const showPreview = (row: any, col: any) => {
  previewVisible.value = true
  html.value = row[col]
}

// 按鈕寬度
let buttonColumnWidth = computed(() => {
  if (buttons?.length) {
    return (
      [...buttons].reduce((width: number, btn: tableButtonType) => {
        return (width += btn.title.length * 15 + 32)
      }, 0) + 24
    )
  }
})
</script>

<style lang="scss" scoped>
:deep(.dialog) {
  @apply w-11/12 md:w-[800px] h-[80%]  mt-24;
}
:deep(.el-dialog__body) {
  @apply p-0 px-3;
}
</style>
