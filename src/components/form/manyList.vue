<template>
  <div class="p-4 border-2 rounded-md">
    <div
      class="flex flex-wrap justify-center border-2 border-slate-300 mb-2 rounded-md"
      v-for="(l, index) of list"
      :key="index">
      <el-form
        v-model:model="list[index]"
        label-width="70px"
        :rules="formRules"
        :inline="false"
        size="large"
        class="flex-1">
        <el-form-item
          :label="f.title"
          v-for="f of fields"
          :key="f.name"
          :prop="f.name"
          class="mt-4">
          <div class="flex items-center mb-5" v-if="f.type == 'image'" @click="uploadDialog = true">
            <div class="upload-img" v-if="!list[index].img">上傳圖片</div>
            <el-image
              v-else
              :src="list[index].img"
              fit="cover"
              class="upload-img editor"
              alt="haodai">
            </el-image>
          </div>
          <upload-img
            v-else-if="uploadDialog"
            v-model="uploadDialog"
            :file-name="String(Date.now())"
            column-name="image"
            :folder="table!"
            type="create"
            v-model:url="list[index].img" />
          <el-input
            v-else
            v-model.trim="list[index][f.name]"
            :placeholder="f.placeholder"
            class="border rounded-md" />
        </el-form-item>
      </el-form>
      <section
        @click="del"
        class="bg-red-300 hover:bg-red-400 ml-2 px-1 text-center text-white"
        style="writing-mode: vertical-lr">
        刪除欄位
      </section>
    </div>
    <section
      class="m-2 w-full py-1 text-white text-center bg-green-400 hover:bg-green-500 mt-4 rounded-md"
      @click="addList">
      增加欄位
    </section>
  </div>
</template>

<script setup lang="ts">
import type { formColumnsType } from '@/config/form'
import { cloneDeep, zipObject } from 'lodash-es'
const { fields, model, formRules, table } = defineProps<{
  fields: formColumnsType[]
  model: any
  formRules?: any
  table?: string
}>()

const emit = defineEmits<{
  (e: 'update:model', d: any): void
}>()

const list = ref<any>(model ? [...model] : [])
const uploadDialog = ref(false)

defineExpose({ list })

const addList = () => {
  list.value = [
    ...list.value,
    zipObject(
      fields.map((f) => f.name),
      fields.map((f) => f.value ?? ''),
    ),
  ]
}

const watchList = computed(() => {
  return cloneDeep(list.value)
})
watch(watchList, () => {
  emit('update:model', list.value)
})

const del = () => {
  console.log(list.value)
}
</script>
