<template>
  <div>
    <el-dialog
      title=""
      destroy-on-close
      :model-value="props.modelValue"
      custom-class="dialog"
      @close="close">
      <!-- <div class="flex justify-center">
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
      </div> -->

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
import { userStores } from '@/stores/userStore'

export interface IProps {
  modelValue?: boolean
  userId?: number
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  userId: 0,
})
const emit = defineEmits(['update:modelValue'])

const uploadRef = ref(null) as any

const userStore = userStores()

const columnName = 'avatar'
const user = userStore.info

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
