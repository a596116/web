<template>
  <div class="bg-gray-50 border-t border-b p-3 shadow-sm" v-show="menuStore.historyMenus.length">
    <div class="grid grid-flow-col gap-3 justify-start">
      <div
        :to="{ name: link.route }"
        v-for="(link, index) in menuStore.historyMenus"
        :key="index"
        class="border hover:bg-hd-theme-color flex duration-300 hover:text-white bg-white rounded-sm shadow-sm py-2 px-2 text-sm to-gray-600 box-border"
        :class="{ 'bg-hd-theme-color text-white': route.name == link.route }"
        @click.middle="menuStore.removeHistoryMenu(link)">
        <router-link :to="{ name: link.route }">{{ link.title }} </router-link>

        <icon-close
          @click="menuStore.removeHistoryMenu(link)"
          theme="outline"
          size="16"
          class="ml-2 cursor-pointer hover:text-hd-black1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuStores } from '@/stores/menuStore'
const menuStore = menuStores()
const route = useRoute()
</script>

<style scoped></style>
