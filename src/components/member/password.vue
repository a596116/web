<template>
  <div>
    <el-card
      shadow="hover"
      :body-style="{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }">
      <el-form
        :model="userPassword"
        ref="formRef"
        :rules="userPasswordAlterFormRules"
        label-width="80px"
        :inline="false"
        size="large">
        <el-form-item
          v-for="f in userPasswordAlterForm"
          :label="f.title"
          :ley="f.name"
          :prop="f.name">
          <el-input
            v-model.trim="userPassword[f.name]"
            :placeholder="f.placeholder"
            :readonly="f.readonly"
            :disabled="f.disabled"
            class="border rounded-md" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="alterPassword">確認</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { userPasswordAlterForm } from '@/config/form'
import { userStores } from '@/stores/userStore'
import { userPasswordAlterFormRules } from '@/config/formRules'
import userApi from '@/apis/userApi'
const userStore = userStores()
const userPassword = ref<any>({})

const formRef = ref()
const alterPassword = async () => {
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      userApi
        .alterUserPassword({ ...userPassword.value, account: userStore.info?.account })
        .then((res) => {
          if (res.code !== 20000) {
            throw res
          }
          ElMessage.success(res.message)
          userPassword.value = {}
        })
        .catch((res) => {
          ElMessage.warning(res.message)
          console.log(res.message)
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
