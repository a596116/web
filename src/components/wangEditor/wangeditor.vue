<template>
  <div>
    <div style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ApiEnum } from '@/enum/apiEnum'

export interface IProps {
  modelValue?: string
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
})
const emit = defineEmits(['update:modelValue'])

const editorRef = shallowRef()

const mode = ref('default')
const valueHtml = ref(props.modelValue)

const toolbarConfig = {}
const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      server: ApiEnum.UPLOAD_IMAGE_URL,
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

const handleChange = (editor: any) => {
  emit('update:modelValue', valueHtml.value)
}
</script>
