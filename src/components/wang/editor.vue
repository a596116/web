<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="modelValue"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="emit('update:modelValue', modelValue)" />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig } from '@wangeditor/editor'
import { DomEditor, type IDomEditor } from '@wangeditor/editor'

export interface IProps {
  modelValue?: string
  folder: string
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
})
const emit = defineEmits(['update:modelValue'])

const editorRef = shallowRef<IDomEditor>()

const mode = ref('default')

const toolbar = DomEditor.getToolbar(editorRef.value!)

const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      server: `${env.VITE_BASEURL}upload/${props.folder}`,
      maxFileSize: 1 * 1024 * 1024, // 1M
      maxNumberOfFiles: 5,
    },
  },
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor
}
</script>
