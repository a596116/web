<template>
  <div class="info">
    <form-list
      ref="formRef"
      :fields="userForm"
      :model="user"
      :form-rules="userInfoFormRules"
      class="flex-1">
      <template #image>
        <div class="flex items-center mb-4">
          <section class="w-[200px] bg-hd-theme-color" @click="avatarDialog = true">
            <el-image
              :src="userStore.info?.avatar !== '0' ? userStore.info?.avatar : '/img/haodai.png'"
              fit="cover"
              class="user_avatar">
            </el-image>
          </section>
        </div>
        <upload-img
          v-model="avatarDialog"
          :id="user!.id"
          :file-name="user!.name"
          column-name="avatar"
          folder="avatar"
          type="avatar" />
      </template>
      <template #button>
        <el-button type="primary" @click="alter()">儲存</el-button>
      </template>
    </form-list>
  </div>
</template>

<script setup lang="ts">
import type { IAlterUser } from '@/apis/userApi'
import { userForm } from '@/config/form'
import { userStores } from '@/stores/userStore'
import { userInfoFormRules } from '@/config/formRules'
import _ from 'lodash'
import userApi from '@/apis/userApi'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'
import { ElMessage, ElMessageBox } from 'element-plus'

const userStore = userStores()
const user = ref(_.cloneDeep(userStore.info))

const avatarDialog = ref(false)

const formRef = ref()
const alter = async () => {
  await formRef.value.formRef.validate((valid: boolean) => {
    if (valid) {
      ElMessageBox.prompt('請輸入密碼', '', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      })
        .then(async ({ value }) => {
          if (!value) {
            ElMessage.warning('請輸入密碼')
            return
          }
          const alterUser: IAlterUser = {
            id: userStore.info?.id!,
            name: user.value?.name!,
            phone: user.value?.phone!,
            password: value,
          }
          await userApi
            .alterUserInfo(alterUser)
            .then(async (res) => {
              if (res.code == 20000) {
                store.set(CacheEnum.USER_NAME, alterUser.phone)
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              } else {
                throw res
              }
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消修改',
          })
        })
    }
  })
}
</script>

<style scoped lang="scss">
:deep(.user_avatar) {
  @apply w-full cursor-pointer relative flex justify-center items-center;
  &::after {
    content: '修改';
    @apply absolute text-white w-full h-full text-lg flex justify-center items-center invisible;
    background-color: #6f6f6f70;
  }
  &:hover::after {
    @apply visible;
  }
}
:deep(.info) {
}
</style>
