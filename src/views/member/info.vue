<template>
  <div>
    <form-list
      ref="formRef"
      :fields="userForm"
      :model="user"
      :form-rules="userInfoFormRules"
      class="flex-1">
      <template #image>
        <div class="flex items-center">
          <section class="w-[200px] bg-hd-theme-color" @click="avatarDialog = true">
            <el-image
              :src="userStore.info?.avatar ? userStore.info?.avatar : '/img/haodai.png'"
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
          folder="user"
          type="update" />
      </template>
      <template #button>
        <el-button type="primary" @click="save()">儲存</el-button>
      </template>
    </form-list>
  </div>
</template>

<script setup lang="ts">
import { userForm } from '@/config/form'
import { dataStores } from '@/stores/dataStore'
import { userStores } from '@/stores/userStore'
import { userInfoFormRules } from '@/config/formRules'
import _ from 'lodash'
const userStore = userStores()
const dataStore = dataStores()
const user = ref(_.cloneDeep(userStore.info))

const avatarDialog = ref(false)

const formRef = ref()
const save = async () => {
  await formRef.value.formRef.validate((valid: boolean) => {
    if (valid) {
      dataStore.update('user', user.value?.id!, user.value).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    }
  })
}
</script>

<style scoped lang="scss">
.user_avatar {
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
</style>
