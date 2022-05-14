<template>
  <el-menu :collapse="!menuStore.isMenuCollapse" :default-active="active_menu" class="max-w-[150px] md:max-w-[200px]">
    <div class="logo">
      <img src="/img/logo.png" alt="haodai">
      <span class="text-lg">浩呆</span>
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
  menuStore.setCurrentMenu(route)
  active_menu.value = route.path.split('/')[2]
}, { immediate: true })


</script>

<style scoped lang="scss">
.el-menu {
  transition: width 0.3s ease-in-out;
  z-index: 100;
  @apply min-h-screen border-0 bg-slate-500;

  * {
    @apply bg-slate-500;
  }




  .logo {
    @apply flex items-center text-gray-500 p-4 w-[200px];

    img {
      @apply w-[40px];
    }

    span {
      @apply ml-6 text-white;
    }
  }

  .menu-icon {
    @apply text-xl bg-transparent text-white;
  }

  .menu-title {
    @apply bg-transparent text-white;
  }


}
</style>
