<template>
  <div>
    <el-button type="primary" @click="newBtn" class="m-3">新增文章</el-button>
    <table-search :columns="topicSearchForm" table-name="topic"> </table-search>
    <table-list
      :columns="topicTableColumns"
      table-name="topic"
      :edit-form="userEditForm"
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
      :fields="topicForm"
      @action="formButtonAction"
      table="topic" />
  </div>
</template>

<script setup lang="ts">
import { userEditForm, topicForm } from '@/config/form'
import { topicTableColumns } from '@/config/table'
import { topicSearchForm } from '@/config/search'
import { dataStores } from '@/stores/dataStore'
import { ElMessageBox } from 'element-plus'
import { userStores } from '@/stores/userStore'

const dataStore = dataStores()
const visible = ref(false)
const formRef = ref(null) as any

const tableButtonAction = async (model: any, command: string) => {
  switch (command) {
    case 'edit':
      formRef.value.modelData = {
        id: model.id,
        title: model.title,
        TopicTag: model.TopicTag,
        content: model.content,
        image: model.image,
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
          await dataStore.delete('topic', model.id)
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
  if (model.title == '' || model.content == '') {
    ElMessage.warning('標題和內容需填寫！')
    return
  }
  switch (command) {
    case 'new':
      console.log({ ...model, userid: userStore.info?.id })

      await dataStore.create('topic', { ...model, userid: userStore.info?.id })
      break
    case 'edit':
      await dataStore.update('topic', id, { ...model }, 'admin')
      break
  }
}
</script>
