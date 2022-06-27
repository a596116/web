<template>
  <teleport to="body">
    <div class="">
      <el-dialog v-model="dialogState" title="用户资料" custom-class="dialog" top="20px">
        <form-list :fields="userEditForm" :model="user" />
        <el-button type="primary" size="default" @click="a">123</el-button>
      </el-dialog>
    </div>
  </teleport>
  <!-- <el-button type="primary" size="default" @click="loadUser">显示</el-button> -->
</template>

<script setup lang="ts">
import userApi from '@/apis/userApi'
import { userEditForm } from '@/config/form'

const { id } = defineProps<{
  id?: number
}>()

let dialogState = ref(false)
let user = ref<IUser>()

const loadUser = async () => {
  user.value = (await userApi.getUser(String(id))) as unknown as IUser
  dialogState.value = true
}

const a = () => {
  console.log(user.value)
}
</script>

<style scoped></style>
