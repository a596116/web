<template>
  <div>
    <el-drawer
      ref="drawerRef"
      v-model="modelValue"
      :before-close="handleClose"
      direction="ttb"
      size="100%"
      :show-close="false"
      custom-class="drawer">
      <template #header="{ close, titleId }">
        <section class="flex justify-center">
          <h2
            :id="titleId"
            class="bg-green-300 px-3 py-1 rounded-md text-hd-black1"
            :class="{ 'bg-amber-300': type == 'edit' }">
            {{ type == 'new' ? '新增資料' : '更改資料' }}
          </h2>
        </section>
        <div class="flex justify-end mt-3">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </template>

      <section class="flex flex-col">
        <div class="flex w-full">
          <div class="flex flex-col w-full">
            <div v-for="f of fields" :key="f.name" :prop="f.name">
              <div
                class="flex items-center mb-5"
                v-if="f.type == 'image'"
                @click="uploadDialog = true">
                <div class="upload-img" v-if="modelData.image == ''">上傳圖片</div>
                <el-image v-else :src="modelData.image" fit="cover" class="upload-img editor">
                </el-image>
              </div>
              <section v-else-if="f.type == 'select'" class="flex mb-5">
                <span class="w-[100px] flex justify-end items-center mr-3">{{ f.title }} :</span>
                <el-select
                  v-model="modelData[f.name]"
                  multiple
                  placeholder="請選擇類別"
                  :collapse-tags="true"
                  class="border rounded-md w-auto!">
                  <el-option v-for="o in f.options" :label="o" :value="o" />
                </el-select>
              </section>
              <section v-else-if="f.type == 'list'">
                <form-many-list
                  ref="manyListRef"
                  :fields="list!"
                  :table="table"
                  v-model:model="modelData[f.name]"
                  class="flex-1"></form-many-list>
              </section>
              <section v-else-if="f.type == 'radio'"></section>
              <section v-else-if="f.type == 'input'" class="flex mb-5">
                <span class="w-[100px] flex justify-end items-center mr-3">{{ f.title }} :</span>
                <el-input v-model="modelData[f.name]" class="flex-1 border rounded-md" />
              </section>
              <WangEditor
                v-model="modelData.content"
                v-else-if="f.type == 'content'"
                folder="topic"
                class="mt-5" />
            </div>
          </div>
        </div>
      </section>

      <upload-img
        v-model="uploadDialog"
        :file-name="String(Date.now())"
        column-name="image"
        :folder="table"
        type="create"
        :id="modelData.id"
        v-model:url="modelData.image" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElDrawer, ElMessageBox } from 'element-plus'
import type { formColumnsType } from '@/config/form'
import { zipObject } from 'lodash-es'

const { modelValue, fields, table, list } = defineProps<{
  modelValue: boolean
  fields: formColumnsType[]
  table: string
  list?: formColumnsType[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', d: boolean): void
  (e: 'action', model: any, command: string): void
}>()

const type = ref('none')
const modelData = ref(
  zipObject(
    fields.map((f) => f.name),
    fields.map((f) => (f.name === 'TopicTag' ? [] : f.value)),
  ),
)

defineExpose({ modelData, type })

const manyListRef = ref()

const uploadDialog = ref(false)
const drawerRef = ref<InstanceType<typeof ElDrawer>>()

// 版面關閉時清空表單
const clear = () => {
  modelData.value = zipObject(
    fields.map((f) => f.name),
    fields.map((f) => (f.name === 'TopicTag' ? [] : f.value)),
  )
  type.value = 'none'
  emit('update:modelValue', false)
}

/**
 * 提交表單
 * @date 2022-10-31
 */
const submit = async () => {
  emit('action', modelData.value, type.value)
  clear()
  drawerRef.value!.close()
}

let timer: NodeJS.Timeout
const handleClose = (done: Function) => {
  ElMessageBox.confirm(`是否要${type.value == 'new' ? '新增' : '更改'}資料?`)
    .then(() => {
      timer = setTimeout(() => {
        submit()
      }, 2000)
    })
    .catch(() => {
      clear()
      done()
    })
}

const cancelForm = () => {
  emit('update:modelValue', false)
  clear()
  clearTimeout(timer)
}

const l: any = fields.filter((i) => {
  return i.type === 'list'
})
watch(type, () => {
  if (type.value !== 'none' && manyListRef.value) {
    if (type.value === 'new') {
      manyListRef.value[0].list = []
    } else {
      manyListRef.value[0].list = [...modelData.value[l[0].name]]
    }
  }
})
</script>

<style scoped lang="scss">
.upload-img {
  @apply w-[200px] h-[200px] cursor-pointer relative flex justify-center items-center rounded-md;
  border: 1px dashed var(--hd-black1);
  &.editor {
    &::after {
      content: '修改';
      @apply absolute text-white w-full h-full text-lg flex justify-center items-center invisible;
      background-color: #6f6f6f70;
    }
    &:hover::after {
      @apply visible;
    }
  }
}
</style>
