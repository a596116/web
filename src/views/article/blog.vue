<template>
  <div>
    <el-button type="primary" @click="newBtn" class="m-3">新增文章</el-button>
    <table-search :columns="blogSearchForm" table-name="blog"> </table-search>
    <table-list
      :columns="blogTableColumns"
      table-name="blog"
      :edit-form="userEditForm"
      permission="admin"
      @action="tableButtonAction"
      :buttons="[
        { title: '編輯', command: 'edit', type: 'primary' },
        { title: '刪除', command: 'del', type: 'danger' },
      ]">
    </table-list>

    <form-article ref="formRef" v-model="visible" :fields="blogForm" table="blog" />
  </div>
</template>

<script setup lang="ts">
import { userEditForm, blogForm } from '@/config/form'
import { blogTableColumns } from '@/config/table'
import { blogSearchForm } from '@/config/search'
import { dataStores } from '@/stores/dataStore'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const dataStore = dataStores()
const visible = ref(false)
const formRef = ref(null) as any

const tableButtonAction = async (model: any, command: string) => {
  switch (command) {
    case 'edit':
      router.push({ query: { ...route.query, id: model.id } })
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
          await dataStore.delete('blog', model.id)
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
