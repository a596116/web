<template>
  <div>
    <el-button type="primary" @click="newBtn" class="m-3">新增壽星</el-button>
    <table-list
      :columns="birthdayTableColumns"
      table-name="birthday"
      permission="admin"
      @action="tableButtonAction"
      :buttons="[
        { title: '編輯', command: 'edit', type: 'primary' },
        { title: '刪除', command: 'del', type: 'danger' },
      ]">
    </table-list>

    <form-article
      ref="formRef"
      v-model="visible"
      :list="birthdayGiftForm"
      :fields="birthdayForm"
      @action="formButtonAction"
      table="birthday" />
  </div>
</template>

<script setup lang="ts">
import { birthdayForm, birthdayGiftForm } from '@/config/form'
import { birthdayTableColumns } from '@/config/table'
import { dataStores } from '@/stores/dataStore'
import { userStores } from '@/stores/userStore'
import { ElMessageBox } from 'element-plus'

const dataStore = dataStores()
const visible = ref(false)
const formRef = ref(null) as any

const tableButtonAction = async (model: any, command: string) => {
  switch (command) {
    case 'edit':
      formRef.value.modelData = {
        id: model.id,
        name: model.name,
        url: model.url,
        gift: model.gift,
      }
      formRef.value.type = 'edit'
      visible.value = true
      break
    case 'del':
      ElMessageBox.confirm('確定刪除嗎？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await dataStore.delete('birthday', model.id)
        })
        .catch(() => {
          return
        })
      break
  }
}

const newBtn = () => {
  visible.value = !visible.value
  formRef.value.type = 'new'
}

const userStore = userStores()
const formButtonAction = async (model: any, command: string) => {
  const id = model.id
  delete model.id
  // if (model.title == '' || model.content == '') {
  //   ElMessage.warning('標題和內容需填寫！')
  //   return
  // }
  switch (command) {
    case 'new':
      console.log({ ...model })

      await dataStore.create('birthday', { ...model })
      break
    case 'edit':
      await dataStore.update('birthday', id, { ...model }, 'admin')
      break
  }
}
</script>
