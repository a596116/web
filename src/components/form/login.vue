<template>
  <div>
    <el-form ref="FormRef" v-model:model="model" :rules="rules" class="form">
      <h1>{{ title }}</h1>
      <el-form-item v-for="f of fields" :key="f.name" :prop="f.name">
        <el-input
          v-if="f.name !== 'captcha'"
          v-model.trim="model[f.name]"
          :placeholder="f.placeholder"
          clearable
          :show-password="f.type == 'password'"
          :type="f.type"
          @keyup.enter="submitForm(FormRef)"
          class="mt-[20px]" />
        <div v-else class="flex justify-center items-center">
          <el-input
            v-model.trim="model[f.name]"
            :placeholder="f.placeholder"
            clearable
            maxlength="4"
            @keyup.enter="submitForm(FormRef)"
            class="mt-[20px]" />
          <div v-html="captcha.img" @click="getNewCaptcha(captcha.id)"></div>
        </div>
      </el-form-item>
      <slot name="button"></slot>
      <el-form-item>
        <el-button type="primary" @click="submitForm(FormRef)">{{
          type == 'login' ? '登入' : '註冊'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { formColumnsType } from '@/config/form'
import { userStores } from '@/stores/userStore'
import userApi from '@/apis/userApi'

const { fields, model, title, type, rules } = defineProps<{
  fields: formColumnsType[]
  model: any
  title: string
  type: string
  rules: any
}>()

const captcha = ref<any>({ id: '-1', img: '' })
onMounted(() => {
  getNewCaptcha()
})

const getNewCaptcha = (id?: string) => {
  model.captcha = ''
  userApi.captcha(id).then((res) => {
    captcha.value = res.message
  })
}

const FormRef = ref<FormInstance>()

const userStore = userStores()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (type == 'login') {
    await formEl?.validate((valid: boolean) => {
      if (valid) {
        userStore.login(model)
      }
    })
  } else if (type == 'register') {
    await formEl?.validate((valid: boolean) => {
      if (valid) {
        const cap = {
          captcha: model.captcha,
          id: captcha.value.id,
        }
        userApi.verify(cap).then((res) => {
          if (res.code === 20000) {
            userStore.registUser(model)
          } else {
            ElMessage.error('認證碼錯誤')
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">
:deep(.el-form) {
  @apply relative w-[340px] h-full py-[40px] px-[30px];

  h1 {
    @apply relative text-hd-black1 text-[24px] font-semibold mb-[40px];
    letter-spacing: 1px;

    &::before {
      @apply content-[''] absolute left-0 bottom-[-10px] w-[80px] h-[4px] bg-hd-black1;
    }
  }
  .el-form-item.is-error .el-input {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
  .el-input {
    @apply w-full border-0 outline-none px-[20px] py-[10px] rounded-[35px] text-base;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    ::placeholder {
      color: var(--hd-black1) !important;
    }
    :deep(.el-input__suffix-inner) {
      @apply text-green-500;
    }
  }

  .el-button {
    @apply bg-white text-black rounded-[20px] mt-[40px] px-[50px] py-[8px] border-0 font-black cursor-pointer relative text-center overflow-hidden;
    letter-spacing: 8px;
  }
}
</style>
