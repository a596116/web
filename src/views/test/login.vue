<template>
  <div>
    <form-list :fields="userEditForm" :model="user" />
  </div>
</template>

<script setup lang="ts">
import userApi from '@/apis/userApi'
import { userEditForm } from '@/config/form'

const user = (await userApi.getUser('1')) as unknown as IUser
</script>

<style scoped></style>
