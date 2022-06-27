<template>
  <div>
    <table-search>
      <template #default>
        <div class="flex flex-wrap text-hd-black1">
          <section class="flex mr-5">
            <span class="flex items-center">用戶姓名：</span>
            <div class="ml-1">
              <el-input
                v-model="dataStore.searchInput"
                placeholder=""
                @keydown.esc="dataStore.searchInput = ''"
                clearable
                class="border rounded-md !w-[150px]">
              </el-input>
            </div>
          </section>
          <section class="flex mr-5">
            <span class="flex items-center">用戶狀態：</span>
            <el-select
              v-model="dataStore.filterActive"
              clearable
              class="ml-1 border rounded-md w-[100px]">
              <el-option label="true" value="1" />
              <el-option label="fales" value="0" />
            </el-select>
          </section>
          <section class="flex mr-5">
            <span class="flex items-center">用戶權限：</span>
            <el-radio-group v-model="dataStore.filterPermission">
              <el-radio label="浩呆">浩呆</el-radio>
              <el-radio label="admin">admin</el-radio>
              <el-radio label="user">user</el-radio>
            </el-radio-group>
          </section>
        </div>
      </template>
    </table-search>

    <table-list :columns="userTableColumns" table-name="user" :edit-form="userEditForm">
      <template #button="{ model }">
        <user-info :id="model.id" />
      </template>
    </table-list>
  </div>
</template>

<script setup lang="ts">
import { dataStores } from '@/stores/dataStore'
import { userEditForm } from '@/config/form'
import { userTableColumns } from '@/config/table'

const dataStore = dataStores()
</script>
