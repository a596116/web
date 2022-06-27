<template>
  <div class="">
    <el-dialog
      :model-value="props.modelValue"
      :title="props.title"
      custom-class="dialog"
      :before-close="handleClose"
      @close="emit('update:modelValue', false)">
      <slot></slot>
      <template #footer>
        <span>
          <el-button @click="emit('change-close')">取消</el-button>
          <el-button type="primary" @click="emit('change-sub')">儲存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
export interface IProps {
  modelValue?: boolean
  title?: string
  width?: string
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  title: '',
  width: '500',
})
const emit = defineEmits<{
  (e: 'update:modelValue', d: boolean): void
  (e: 'change-close'): void
  (e: 'change-sub'): void
  (e: 'before-close'): void
}>()

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否儲存？')
    .then(() => {
      emit('before-close')
      done()
    })
    .catch(() => {
      emit('update:modelValue', false)
    })
}

const dialogWidth = `${props.width}px`
</script>

<style scoped lang="scss">
:deep(.dialog) {
  @apply w-11/12 md:max-w-[v-bind(dialogWidth)];
}
:deep(.el-dialog__body) {
  @apply p-0 px-3;
}
</style>
