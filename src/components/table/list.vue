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
        :label="col.label"
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
          <template v-for="(item, index) in row[col.prop]['p']" :key="index">
            <el-tag v-if="item" :color="col.options[item]" class="mx-1 !border-0" effect="dark">
              {{ item }}
            </el-tag>
          </template>
        </template>
        <template v-else-if="col.type === 'switch'">
          <el-switch
            :model-value="row[col.prop]"
            active-value="1"
            inactive-value="0"
            class="ml-2"
            active-color="#13ce66"
            @change="changeActive(row, col.prop)" />
        </template>
        <template v-else>
          {{ row[col.prop] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="日期"
        width="120"
        sortable="custom"
        :default-sort="{ prop: 'date', order: 'ascending' }"
        :sort-orders="['ascending', 'descending']" />

      <!-- 操作列 -->
      <el-table-column
        :width="120"
        #default="{ row }"
        v-if="$slots.button"
        align="center"
        fixed="right">
        <slot name="button" :model="row"></slot>
        <el-popover placement="bottom" :width="0">
          <template #reference>
            <el-button>操作</el-button>
          </template>
          <button
            @click="edit(row.id)"
            class="!bg-green-200 !text-white hover:!bg-green-300 w-[60px] flex justify-center items-center rounded-sm text-base py-1">
            編輯
          </button>
        </el-popover>
      </el-table-column>
    </el-table>

    <!-- 分頁 -->
    <div class="flex justify-center mt-5">
      <Pagination layout="total, prev, pager, next"> </Pagination>
    </div>

    <!-- Dialog -->
    <Dialog
      v-model="dialogVisible"
      title="用戶資料"
      @before-close="changePermissions"
      @change-close="dialogVisible = false"
      @change-sub="changePermissions">
      <template #default>
        <form-list :fields="editForm" :model="editData" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { dataStores } from '@/stores/dataStore'
import { ElMessageBox } from 'element-plus'
import { ElTable } from 'element-plus'
import type { tableColumnsType } from '@/config/table'
import userApi from '@/apis/userApi'

const { columns, tableName, editForm } = defineProps<{
  tableName: string
  columns: tableColumnsType[]
  editForm: any
}>()

const dataStore = dataStores()
const route = useRoute()
const router = useRouter()

dataStore.init()
watch(
  route,
  async () => {
    await dataStore.getData(tableName)
  },
  { immediate: true },
)
// 渲染數據
const usersList = computed((): IUser[] => {
  return dataStore.data
})

// 排序
const sortChange = (order: any) => {
  const o = order.order.replace('ending', '')
  dataStore.order = o
  router.push({ query: { ...route.query, o: o } })
}

// 變更switch狀態
const changeActive = (user: IUser, prop: string) => {
  ElMessageBox.confirm('確定嗎？', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      let s = {} as any
      s[prop] = user.active == '1' ? '0' : '1'
      dataStore.update(tableName, user.id, s)
    })
    .catch(() => {
      if (user.active == '1') {
        user.active = '0'
      } else {
        user.active = '1'
      }
    })
}

// 些改資料
const dialogVisible = ref(false)
const editId = ref<string>('')
const editData = ref<IUser>()
const edit = async (id: string) => {
  editData.value = (await userApi.getUser(String(id))) as unknown as IUser
  editId.value = id
  dialogVisible.value = true
}
const changePermissions = async () => {
  dataStore.update('user', editId.value, editData.value)
  dialogVisible.value = false
}
</script>

<style scoped></style>
