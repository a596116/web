<template>
  <div>
    <el-dialog
      title="上傳圖片或圖片網址"
      destroy-on-close
      :model-value="modelValue!"
      custom-class="dialog"
      @close="close">
      <div v-if="imageUrl" class="w-[400px] h-[400px]">
        <vue-cropper
          ref="cropper"
          :img="imageUrl"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          :fixed="true"
          :high="option.high"
          mode="cover"
          :max-img-size="option.max" />
        <div class="flex justify-end">
          <a href="javascript:;" class="text-2xl" @click="imageUrl = ''">x</a>
        </div>
      </div>
      <div class="" v-else>
        <el-upload
          class="upload"
          action="#"
          :disabled="true"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarSuccess">
          <icon-plus theme="outline" size="30" />
        </el-upload>
        <div class="flex flex-row justify-center items-center mt-5">
          <span>圖片網址：</span>
          <el-input v-model.trim="inputUrl" class="flex-1 border rounded-md" />
        </div>
      </div>

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
import { type UploadProps, type UploadFile, ElMessage } from 'element-plus'
import { VueCropper } from 'vue-cropper'
import userApi from '@/apis/userApi'
const {
  modelValue,
  fileName,
  columnName,
  folder,
  type,
  id,
  size = '400',
} = defineProps<{
  modelValue?: boolean
  fileName: string
  columnName: string
  folder: string
  type: 'update' | 'create' | 'avatar'
  id?: string
  url?: string
  size?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', d: boolean): void
  (e: 'update:url', d: string): void
}>()

// 上傳照片
const imageUrl = ref('')
const inputUrl = ref('')
const uploadSize = `${size}px`

const cropper = ref<typeof VueCropper>()
const option = ref({
  size: 1,
  full: false,
  outputType: 'png',
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 200,
  autoCropHeight: 200,
  centerBox: false,
  high: true,
  max: 99999,
})

const handleAvatarSuccess: UploadProps['onChange'] = (response, uploadFile: any) => {
  if (response.raw?.type !== 'image/jpeg' && response.raw?.type !== 'image/png') {
    ElMessage.error('上傳的檔案類型不符合(jpg, png)')
    return false
  } else if (response.raw?.size / 1024 / 1024 > 2) {
    ElMessage.error('上傳的檔案大小不能超過 2MB')
    return false
  }
  imageUrl.value = URL.createObjectURL(uploadFile.pop().raw)
}

const close = () => {
  emit('update:modelValue', false)
  imageUrl.value = ''
  inputUrl.value = ''
}

const sub = async () => {
  if (!imageUrl.value && !inputUrl.value) {
    ElMessage.warning('沒添加照片')
  }

  let formData = new FormData()

  if (inputUrl.value) {
    emit('update:url', inputUrl.value)
    close()
  } else if (imageUrl.value) {
    cropper.value?.getCropBlob(async (data: Blob) => {
      const file = new File([data], `${fileName}.jpg`, { type: 'image/jpg' })
      formData.append(folder, file)
      emit('update:url', imageUrl.value)
    })
  }

  if (type === 'avatar') {
    //用戶頭像
    await userApi.uploadAvatar(formData, folder, id!).then((res) => {
      if (res.code === 20000) {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      close()
    })
  }
}
</script>

<style scoped lang="scss">
:deep(.dialog) {
  @apply w-11/12 md:max-w-[500px] h-[80%] flex flex-col justify-between items-center;
  .el-dialog__body {
    @apply w-full;
  }
}
:deep(.upload .el-upload) {
  @apply w-full flex justify-center items-center rounded-md cursor-pointer relative overflow-hidden;
  height: v-bind(uploadSize);
  border: 1px dashed var(--hd-black1);
  transition: var(--el-transition-duration-fast);
  &:hover,
  &:focus {
    border-color: var(--hd-theme-color);
    color: var(--hd-theme-color);
  }
}
</style>
