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

    <form-article ref="formRef" v-model="visible" :fields="topicForm" table="topic" />
  </div>
</template>

<script setup lang="ts">
import { userEditForm, topicForm } from '@/config/form'
import { topicTableColumns } from '@/config/table'
import { topicSearchForm } from '@/config/search'
import { dataStores } from '@/stores/dataStore'
import { ElMessageBox } from 'element-plus'

const dataStore = dataStores()
const visible = ref(false)
const formRef = ref(null) as any

const tableButtonAction = async (model: any, command: string) => {
  switch (command) {
    case 'edit':
      formRef.value.modelData = {
        id: model.id,
        title: model.title,
        category: model.category,
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
</script>
