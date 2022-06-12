<template>
  <div class="bg-hd-bg-white p-3 px-5 flex justify-between items-center theme">
    <div class="flex items-center justify-center">
      <section @click="menuStore.toggleMenu" :class="{ 'rotate-180': menuStore.isMenuCollapse }"
        class="duration-200 text-xl mr-3 ">
        <icon-right-square theme="outline" size="26" class="text-hd-black1 cursor-pointer" />
      </section>

      <admin-navbar-breadcrumb class="hidden md:block" :class="{ 'md:hidden': !menuStore.isBreadcrumbCollapse }" />
    </div>

    <div class="flex items-center justify-center">
      <admin-navbar-full-screen class="mr-5" />
      <admin-navbar-theme-setting class="mr-5" />


      <notification class="mr-5" />

      <admin-navbar-user-info />
    </div>

  </div>
</template>

<script setup lang="ts">
import { menuStores } from '@/stores/menuStore'
const menuStore = menuStores()
</script>

