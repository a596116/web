<template>
  <div>
    <el-dialog
      title=""
      destroy-on-close
      :model-value="modelValue!"
      custom-class="dialog"
      @close="close">
      <upload-cropper
        ref="uploadRef"
        :column-name="columnName"
        :file-name="user?.name!"
        folder="user"
        type="update"
        :id="user?.id" />

      <template #footer>
        <span>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="sub">確定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const { modelValue, user } = defineProps<{
  modelValue?: boolean
  user: IUser
}>()
const emit = defineEmits(['update:modelValue'])

const uploadRef = ref(null) as any

const columnName = 'avatar'

const close = () => {
  emit('update:modelValue', false)
}

const sub = () => {
  uploadRef.value!.sub()
  close()
}
</script>

<style scoped lang="scss">
:deep(.dialog) {
  @apply w-full md:max-w-[500px] h-[600px] flex flex-col justify-between items-center;
}

:deep(.upload .el-upload) {
  @apply w-[400px] h-[400px] flex justify-center items-center rounded-md cursor-pointer relative overflow-hidden;
  border: 1px dashed var(--hd-black1);
  transition: var(--el-transition-duration-fast);
  &:hover,
  &:focus {
    border-color: var(--hd-theme-color);
    color: var(--hd-theme-color);
  }
}
</style>
