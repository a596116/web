<template>
  <el-menu :collapse="!menuStore.isMenuCollapse" :default-active="active_menu" class="max-w-[150px] md:max-w-[200px]"
    :unique-opened="true">
    <div class="logo">
      <img src="/img/haodai.png" alt="haodai" @click="router.push({ name: 'admin/home' })">
      <div class="ml-[14px] text-gray-500 flex flex-col md:flex-row text-2xl">
        <span>🅷🅰🅾️</span>
        <span>🅳🅰🅘</span>
      </div>
    </div>

    <el-sub-menu v-for="(menu, index) in menuStore.menus" :key="index" :index="menu.icon">
      <template #title>
        <section class="menu-icon hidden md:block">
          <component :is="icons[menu.icon!]" theme="outline" size="24"></component>
        </section>
        <span class="menu-title m-2 md:m-7">{{ menu.title }}</span>
      </template>

      <el-menu-item v-for="(cmenu, index) in menu.children" :key="index" :index="cmenu?.route?.split('/')[1]"
        @click="handle(menu, cmenu)">
        <span class="menu-title">{{ cmenu.title }}</span>
      </el-menu-item>
    </el-sub-menu>
    <div class="menubottom" @click="router.push({ name: 'hd' })">
      <icon-home-two theme="outline" size="24" class="hidden md:block" />
      <div class="m-2 md:m-4 md:pr-6">首頁</div>
    </div>

  </el-menu>
</template>

<script setup lang="ts">
import type { IMenu } from '../../../types/menu'
import { menus } from '@/stores/menuStore'
import router from '@/router'
import * as icons from '@icon-park/vue-next'
const route = useRoute()
const menuStore = menus()
const active_menu = ref(route.path.split('/')[2])

const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  router.push({ name: cmenu?.route })
  if (document.documentElement.scrollWidth <= 768) {
    menuStore.toggleMenu()
  }
}
watch(route, () => {
  active_menu.value = route.path.split('/')[2]
}, { immediate: true })




</script>

<style scoped lang="scss">
.el-menu {
  transition: width 0.3s ease-in-out;
  z-index: 100;
  @apply min-h-screen border-0 bg-[#dfe4ea];

  * {
    @apply bg-[#dfe4ea] text-gray-500;
  }

  .logo {
    @apply flex items-center py-4 px-2 w-[200px] mb-2;

    img {
      @apply w-[40px] cursor-pointer;
      background-color: transparent !important;
      filter: invert(100%) brightness(100%) drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.7));
    }

  }

  .menu-icon {
    @apply text-xl bg-transparent text-gray-500;
  }

  .menu-title {
    @apply bg-transparent text-gray-500;
  }

  .menubottom {
    @apply w-[200px] absolute bottom-0 flex justify-between items-center px-5 cursor-pointer text-gray-500 border-t-2 border-gray-400;

    * {
      transition: all 0.3s ease-in-out;
    }

    &:hover * {
      @apply text-[#fad390];
    }
  }

}
</style>
