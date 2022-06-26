<template>
  <div>
    <div class="bg-white flex justify-between py-5 px-8">
      <div class="flex flex-wrap text-hd-black1">
        <div class="flex mr-5">
          <span class="flex items-center">用戶姓名：</span>
          <div class="ml-1">
            <el-input
              v-model="firebaseStore.searchInput"
              placeholder=""
              @keydown.esc="firebaseStore.searchInput = ''"
              clearable
              class="border rounded-md w-[150px]">
            </el-input>
          </div>
        </div>
        <div class="flex mr-5">
          <span class="flex items-center">用戶狀態：</span>
          <el-select
            v-model="firebaseStore.filterActive"
            clearable
            class="ml-1 border rounded-md w-[100px]">
            <el-option label="true" value="1" />
            <el-option label="fales" value="0" />
          </el-select>
        </div>
        <div class="flex mr-5">
          <span class="flex items-center">用戶權限：</span>
          <el-radio-group v-model="firebaseStore.filterPermission">
            <el-radio label="浩呆">浩呆</el-radio>
            <el-radio label="admin">admin</el-radio>
            <el-radio label="user">user</el-radio>
          </el-radio-group>
        </div>
      </div>
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

    <el-table
      ref="tableRef"
      :data="usersList"
      tooltip-effect="dark"
      stripe
      show-overflow-tooltip
      class="text-base"
      @sort-change="sortChange">
      <el-table-column
        prop="createdAt"
        label="日期"
        width="120"
        sortable="custom"
        :default-sort="{ prop: 'date', order: 'ascending' }"
        :sort-orders="['ascending', 'descending']" />
      <el-table-column prop="name" label="名稱" />

      <el-table-column label="權限">
        <template #default="scope">
          <template v-for="(item, index) in scope.row.permissions.split(',')" :key="index">
            <el-tag
              v-if="item"
              :color="item == '浩呆' ? '#fdcb6e' : item == 'admin' ? '#6ec7a2' : '#75cdd8'"
              class="mx-1 !border-0"
              effect="dark">
              {{ item }}
            </el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="狀態">
        <template #default="scope">
          <el-switch
            :model-value="scope.row.active"
            active-value="1"
            inactive-value="0"
            class="ml-2"
            active-color="#13ce66"
            @change="changeActive(scope.row)" />
        </template>
      </el-table-column>

      <el-table-column label="頭像" width="110">
        <template #default="scope">
          <el-image :src="scope.row.avatar" fit="cover" alt="haodai" class="w-[100px]"> </el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-popover placement="bottom" :width="0">
            <template #reference>
              <el-button>操作</el-button>
            </template>
            <button
              @click="editUser(scope.row.id)"
              class="!bg-green-200 !text-white hover:!bg-green-300 w-[60px] flex justify-center items-center rounded-sm text-base py-1">
              編輯
            </button>
            <button
              @click="editUser(scope.row.id)"
              class="!bg-red-300 !text-white hover:!bg-red-400 w-[60px] flex justify-center items-center rounded-sm text-base py-1">
              刪除
            </button>
          </el-popover>
        </template>
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
        <div class="flex justify-center items-center">
          <span class="mr-5">用戶權限：</span>
          <el-checkbox-group v-model="editPermissions">
            <el-checkbox label="浩呆" />
            <el-checkbox label="admin" />
            <el-checkbox label="user" />
          </el-checkbox-group>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import userApi from '@/apis/userApi'
import { firebaseStores } from '@/stores/firebaseStore'
import { ElMessageBox } from 'element-plus'
import { ElTable } from 'element-plus'

const route = useRoute()
const router = useRouter()
const tableRef = ref<InstanceType<typeof ElTable>>()
const firebaseStore = firebaseStores()

firebaseStore.init()
watch(
  route,
  async () => {
    await firebaseStore.getData('user')
  },
  { immediate: true },
)

// 渲染數據
const usersList = computed((): IUser[] => {
  return firebaseStore.data
})

// 查詢條件
const search = () => {
  if (firebaseStore.searchInput) {
    router.push({
      query: { ...route.query, s: firebaseStore.searchInput },
    })
  }
  if (firebaseStore.filterPermission) {
    router.push({
      query: { ...route.query, m: firebaseStore.filterPermission },
    })
  }
  if (firebaseStore.filterActive) {
    router.push({
      query: { ...route.query, a: firebaseStore.filterActive },
    })
  }
}
// 排序
const sortChange = (order: any) => {
  const o = order.order.replace('ending', '')
  firebaseStore.order = o
  router.push({ query: { ...route.query, o: o } })
}

// 清除查詢條件
const reset = () => {
  firebaseStore.filterActive = ''
  firebaseStore.order = ''
  firebaseStore.searchInput = ''
  firebaseStore.filterPermission = ''
  router.push({ query: {} })
}

// 變更用戶狀態
const changeActive = (user: IUser) => {
  ElMessageBox.confirm('確定嗎？', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (user.active == '1') {
        firebaseStore.update('user', user.id, { active: '0' })
      } else {
        firebaseStore.update('user', user.id, { active: '1' })
      }
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
const editPermissions = ref<string[]>([])
const editId = ref<string>('')
const editUser = async (id: string) => {
  const user = (await userApi.getUser(id)) as unknown as IUser
  editId.value = id
  dialogVisible.value = true
  editPermissions.value = user.permissions.split(',')
}
const changePermissions = async () => {
  firebaseStore.update('user', editId.value, { permissions: editPermissions.value.join(',') })
  dialogVisible.value = false
}
</script>
