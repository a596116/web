<template>
  <div>
    <table-search :columns="userSearchForm"> </table-search>

    <table-list
      :columns="userTableColumns"
      table-name="user"
      :edit-form="userEditForm"
      permission="浩呆"
      @action="tableButtonAction"
      :buttons="[{ title: '編輯', command: 'edit', type: 'primary' }]">
    </table-list>

    <!-- Dialog -->
    <Dialog
      v-model="dialogVisible"
      title="用戶資料"
      @before-close="changeEditor"
      @change-close="dialogVisible = false"
      @change-sub="changeEditor">
      <template #default>
        <form-list :fields="userEditForm" :model="editData" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { userEditForm } from '@/config/form'
import { userTableColumns } from '@/config/table'
import { userSearchForm } from '@/config/search'
import { dataStores } from '@/stores/dataStore'
import _ from 'lodash'

const dataStore = dataStores()
const dialogVisible = ref(false)
const editData = ref<IUser>()
const tableButtonAction = async (model: IUser, command: string) => {
  switch (command) {
    case 'edit':
      editData.value = _.cloneDeep(model)
      dialogVisible.value = true
      break
  }
}
const changeEditor = async () => {
  dataStore.update('user', editData.value?.id!, editData.value, '浩呆')
  dialogVisible.value = false
}
</script>
