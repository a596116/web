<template>
  <div class="bg-gray-50 border-t border-b p-3 shadow-sm" v-show="menuStore.historyMenus.length">
    <div class="grid grid-flow-col gap-3 justify-start">
      <div :to="{ name: link.route }" v-for="(link, index) in menuStore.historyMenus" :key="index"
        class="border hover:bg-orange-400 flex duration-300 hover:text-white bg-white rounded-sm shadow-sm py-2 px-2 text-sm to-gray-600"
        :class="{ 'bg-orange-400 text-white': $route.name == link.route }">
        <router-link :to="{ name: link.route }">{{ link.title }}</router-link>

        <div @click="menuStore.removeHistoryMenu(link)">
          <i class="fas fa-times text-lg ml-2 cursor-pointer hover:text-orange-800 z-20"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menus } from '@/stores/menuStore'
const menuStore = menus()
</script>

<style scoped>
</style>
