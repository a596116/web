<template>
  <div class="text-black text-3xl">
    <table-list :columns="userTableColumns" table-name="user" :edit-form="userEditForm">
      <template #button="{ model }">
        <user-info :id="model.id" />
      </template>
    </table-list>
  </div>
</template>

<script setup lang="ts">
import { userTableColumns } from '@/config/table'
import { userEditForm } from '@/config/form'
</script>

<style scoped></style>
