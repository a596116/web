<template>
  <div class="flex justify-center">
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
    <el-upload
      v-else
      class="upload"
      action="#"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleAvatarSuccess">
      <icon-plus theme="outline" size="30" />
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { type UploadProps, type UploadFile, ElMessage } from 'element-plus'
import { VueCropper } from 'vue-cropper'
import { dataStores } from '@/stores/dataStore'
import dataApi from '@/apis/dataApi'
import { msg } from '@/utils/msg'

const { fileName, columnName, folder, type, id } = defineProps<{
  fileName: string
  columnName: string
  folder: string
  type: 'update' | 'create'
  id?: number
  url?: string
}>()
const emit = defineEmits<{
  (e: 'update:url', d: string): void
}>()

const dataStore = dataStores()

// 上傳照片
const imageUrl = ref('')

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

const sub = ref(async () => {
  if (imageUrl.value == '') {
    msg('沒添加照片')
  }
  let formData = new FormData()
  cropper.value?.getCropBlob(async (data: Blob) => {
    const file = new File([data], `${fileName}.jpg`, { type: 'image/jpg' })
    formData.append('file', file)
    const res = await dataApi.upload(formData, folder)
    if (type == 'update') {
      //如果是更新資料,直接update
      if (res.code == 20000) {
        let updateData = {} as any
        updateData[columnName] = res.data.file
        await dataStore.update(folder, id!, updateData)
        msg('修改成功！請重新整理頁面')
      }
    } else {
      //如果是新增資料,返回地址
      emit('update:url', res.data.file)
    }
  })
})
defineExpose({ sub })
</script>

<style scoped></style>
