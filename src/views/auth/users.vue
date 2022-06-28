<template>
  <div>
    <table-search :columns="userSearchForm"> </table-search>

    <table-list :columns="userTableColumns" table-name="user" :edit-form="userEditForm">
    </table-list>
  </div>
</template>

<script setup lang="ts">
import { userEditForm } from '@/config/form'
import { userTableColumns } from '@/config/table'
import { userSearchForm } from '@/config/search'
</script>
