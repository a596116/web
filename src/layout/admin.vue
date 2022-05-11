<template>
  <div class="admin grid md:grid-cols-[auto_1fr] min-h-screen w-screen">
    <hd-menu />
    <div class="content bg-gray-100 grid grid-rows-[auto_1fr]">
      <div class="">
        <hd-nav-bar />
        <hd-history-link class="hidden md:block" />
      </div>

      <div class="m-3 relative overflow-y-auto">
        <router-view #default="{ Component, route }">
          <Transition
            appear
            class="animate__animated"
            :enter-active-class="route.meta.enterClass ?? 'animate__bounceInRight'"
            :leave-active-class="route.meta.leaveClass ?? 'animate__bounceOutLeft'">
            <component :is="Component" class="absolute w-full" />
          </Transition>
        </router-view>
        <!-- <router-view></router-view> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menus } from '@/stores/menuStore'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
menus().init()
watch(route, () => menus().addHistoryMenu(route), { immediate: true })
</script>

<script lang="ts">
export default {
  route: {
    meta: {
      auth: true,
      menu: {
        title: 'Dashboard',
        icon: 'fas fa-home',
      },
    },
  },
}
</script>

<style scoped lang="scss">
.animate__bounceInRight {
  animation-duration: 0.8s;
}
.animate__bounceOutLeft {
  animation-duration: 0.5s;
}
</style>
