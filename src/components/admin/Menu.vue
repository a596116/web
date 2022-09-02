<template>
  <el-menu
    :collapse="!menuStore.isMenuCollapse"
    :default-active="active_menu"
    class="admin-menu"
    :unique-opened="true">
    <div class="logo">
      <img src="/img/haodai.png" alt="haodai" @click="router.push({ name: 'admin/home' })" />
      <div class="ml-[14px] hidden md:flex flex-row text-2xl">
        <span class="">🅷🅰🅾</span>
        <span>🅳🅰🅸</span>
      </div>
    </div>

    <div class="" v-for="(menu, index) in menuStore.menus" :key="index">
      <el-sub-menu v-if="menu.children?.length != 1" :index="menu.title!">
        <template #title>
          <section class="hidden md:block">
            <component :is="(icons as any)[menu.icon!]" theme="outline" size="24"></component>
          </section>
          <span class="m-2 md:m-7">{{ menu.title }}</span>
        </template>

        <el-menu-item
          v-for="(cmenu, index) in menu.children"
          :key="index"
          :index="cmenu?.route?.split('/')[1]"
          @click="handle(menu, cmenu)">
          <span class="menu-title">{{ cmenu.title }}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item
        v-else
        :index="menu.children[0]?.route?.split('/')[1]"
        @click="handle(menu, menu.children![0])">
        <section class="hidden md:block">
          <component :is="(icons as any)[menu.icon!]" theme="outline" size="24"></component>
        </section>
        <span class="m-2 md:m-7">{{ menu.children[0].title }}</span>
      </el-menu-item>
    </div>

    <div class="menubottom" @click="router.push({ name: 'home' })">
      <icon-home-two theme="outline" size="24" class="hidden md:block" />
      <div class="m-2 md:m-4 md:pr-6">首頁</div>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import type { IMenu } from '../../../types/menu'
import { menuStores } from '@/stores/menuStore'
import router from '@/router'
import * as icons from '@icon-park/vue-next'
const route = useRoute()
const menuStore = menuStores()
const active_menu = ref(route.path.split('/')[2])

const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  router.push({ name: cmenu?.route })
  if (document.documentElement.scrollWidth <= 768) {
    menuStore.toggleMenu()
  }
}
watch(
  route,
  () => {
    active_menu.value = route.path.split('/')[2]
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.admin-menu {
  transition: width 0.3s ease-in-out;
  z-index: 200;
  @apply max-w-[130px] md:max-w-[200px] min-h-screen border-0 bg-hd-bg-black;

  * {
    @apply text-hd-black1 bg-hd-bg-black;
  }

  .logo {
    @apply flex items-center py-4 px-2 w-[200px] mb-2;

    img {
      @apply w-[40px] cursor-pointer;
      background-color: transparent !important;
      filter: invert(100%) brightness(100%) drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.7));
    }
  }

  .menubottom {
    @apply w-[200px] absolute bottom-0 flex justify-between items-center px-5 cursor-pointer;

    * {
      transition: all 0.3s ease-in-out;
    }

    &:hover * {
      @apply text-hd-theme-color;
    }
  }
}
</style>
<style lang="scss">
// Menu
.el-sub-menu__title,
.el-menu-item {
  span,
  i {
    transition: 0.3s ease-in-out !important;
  }

  &:hover {
    span,
    i {
      color: var(--hd-theme-color) !important;
    }
  }
}

.el-menu-item {
  &:hover,
  &.is-active {
    span {
      color: var(--hd-theme-color) !important;
    }

    border-right: 4px solid var(--hd-theme-color);
  }
}

.is-active .el-sub-menu__title * {
  color: var(--hd-theme-color) !important;
}

.el-menu--collapse .is-active .el-sub-menu__title {
  border-right: 4px solid var(--hd-theme-color);
}

.form-container input::placeholder {
  color: #fff !important;
}

.el-menu.el-menu--collapse {
  @apply w-0;
}

@media (min-width: 768px) {
  .admin-menu.el-menu--collapse {
    width: 64px;
  }
}
</style>
