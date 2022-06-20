<template>
  <div>
    <div class="bg-white flex justify-between py-5 px-8">
      <div class="flex flex-wrap text-hd-black1">
        <div class="flex mr-5">
          <span class="flex items-center">用戶姓名：</span>
          <div class="ml-1">
            <el-input
              v-model="searchInput"
              placeholder=""
              @keydown.esc="searchInput = ''"
              clearable
              class="border rounded-md w-[150px]">
            </el-input>
          </div>
        </div>
        <div class="flex mr-5">
          <span class="flex items-center">用戶狀態：</span>
          <el-select v-model="filterActive" clearable class="ml-1 border rounded-md w-[100px]">
            <el-option label="true" value="true" />
            <el-option label="fales" value="false" />
          </el-select>
        </div>
        <div class="flex mr-5">
          <span class="flex items-center">用戶權限：</span>
          <el-checkbox-group v-model="filterPermission">
            <el-checkbox label="浩呆" />
            <el-checkbox label="admin" />
            <el-checkbox label="user" />
          </el-checkbox-group>
        </div>
      </div>
      <div class="flex">
        <!-- <el-button
                    class="!bg-hd-theme-color text-gray-50 py-4 hover:!text-hd-white hover:!bg-hd-theme-hover-color !border-0 focus:!text-hd-white">
                    <icon-search theme="outline" size="20" /> 查詢
                </el-button> -->

        <el-button
          @click=";(filterPermission = []), (filterActive = ''), (searchInput = '')"
          class="py-4">
          <icon-clear theme="outline" size="20" /> 清除
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableRef"
      :data="usersList.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      tooltip-effect="dark"
      stripe
      show-overflow-tooltip
      class="text-base"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      @sort-change="sort = !sort">
      <el-table-column
        prop="date"
        label="日期"
        width="110"
        sortable
        :sort-orders="['ascending', 'descending']" />
      <el-table-column prop="name" label="名稱" />

      <el-table-column label="權限">
        <template #default="scope">
          <el-tag
            v-for="(item, index) in scope.row.permissions"
            :key="index"
            :color="item == '浩呆' ? '#fdcb6e' : item == 'admin' ? '#6ec7a2' : '#75cdd8'"
            class="mx-1 !border-0"
            effect="dark">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="狀態">
        <template #default="scope">
          <el-switch
            v-model="scope.row.active"
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
          <section class="flex justify-end">
            <icon-edit
              theme="outline"
              size="26"
              class="bg-green-200 hover:bg-green-300 text-hd-white p-2 mx-3 rounded-[50%] cursor-pointer"
              @click="editUser(scope.row.name)" />
          </section>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分頁 -->
    <div class="flex justify-center mt-5">
      <Pagination
        v-model="currentPage"
        :pagesize="pagesize"
        layout="total, prev, pager, next"
        :total="total">
      </Pagination>
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
import { firebaseStores } from '@/stores/firebaseStore'
import { ElMessageBox } from 'element-plus'
import { ElTable } from 'element-plus'

const tableRef = ref<InstanceType<typeof ElTable>>()
const firebaseStore = firebaseStores()
const getUsersLists = await firebaseStore.data('users')
onMounted(() => {})
// 查詢條件
const searchInput = ref<string>('')
// 分頁
const totalpage = ref()
const total = ref(5)
const pagesize = 3
const currentPage = ref(1)
// 排序
const sort = ref(true)
// 篩選
const filterPermission = ref<any[]>([])
const filterActive = ref<string>('')
// 渲染數據
const usersList = computed((): IUser[] => {
  let user = getUsersLists.value.sort((a: IUser, b: IUser) => {
    return sort.value ? (a.date > b.date ? 1 : -1) : a.date > b.date ? -1 : 1
  })
  user = user
    .filter((value: IUser) => {
      //姓名篩選
      let content = value.name.toLowerCase()
      let keyword = searchInput.value.toLowerCase()
      return searchInput.value ? content.indexOf(keyword) != -1 : true
    })
    .filter((v: IUser) => {
      //權限篩選
      const permission = filterPermission.value.filter((m) => {
        return v.permissions.includes(m as string)
      })
      return filterPermission.value.length ? permission[0] : true
    })
    .filter((v: IUser) => {
      //狀態篩選
      return filterActive.value ? filterActive.value == String(v.active) : true
    })

  totalpage.value = Math.ceil(user.length / pagesize)
  total.value = user.length
  return user
})

const changeActive = (user: IUser) => {
  ElMessageBox.confirm('確定嗎？', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      firebaseStore.update('users', user.name, { active: user.active })
    })
    .catch(() => {
      user.active = !user.active
    })
}

const c = () => {
  console.log(123)
}

// 些改資料
const dialogVisible = ref(false)
const editPermissions = ref<string[]>([])
const editId = ref<string>('')
const editUser = async (id: string) => {
  editId.value = id
  const user = (await firebaseStore.get('users', id)) as IUser
  dialogVisible.value = true
  editPermissions.value = user.permissions
}
const changePermissions = () => {
  firebaseStore.update('users', editId.value, { permissions: editPermissions.value })
  dialogVisible.value = false
  ElMessage.success('儲存成功')
}
</script>

<style lang="scss" scoped></style>
