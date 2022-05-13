<template>
  <div>
    <div id="toasteditor"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import ToastEditor from './toastEditor'

export interface IProps {
  modelValue?: string
  height?: number
  placeholder?: string
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  height: 500,
  placeholder: '',
})

const emit = defineEmits(['update:modelValue'])

nextTick(() => {
  const toastUi = new ToastEditor('#toasteditor', props.modelValue, `${props.height}px`)
  toastUi.editor.on('change', (type: string) => {
    const content = type == 'markdown' ? toastUi.editor.getMarkdown() : toastUi.editor.getHTML()
    emit('update:modelValue', content)
  })
})
</script>

<style lang="scss" scoped>
#toasteditor {
  z-index: 5;
  @apply bg-white;
  .toastui-editor-mode-switch {
    display: none !important;
  }
}
</style>
