<script setup lang="ts">
import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import store from '@/utils/store'
// store.remove(
//   CacheEnum.TOKEN_NAME,
//   CacheEnum.HISTORY_MENU,
//   CacheEnum.REDIRECT_ROUTE_NAME,
//   CacheEnum.MENU_IS_CLOSE,
//   CacheEnum.HISTORYLINK_IS_SHOW,
//   CacheEnum.BREADCRUMB_IS_SHOW,
// )
</script>
　

<template>
  <div class="h-screen w-screen bg-gray-600 flex justify-center items-center relative">
    <div class="w-80 h-80 rounded-full border-8 border-white z-10 flex justify-center items-center">
      <img
        src="/img/logo.png"
        class="w-72 h-72 object-contain rounded-full animate__animated animate__bounce animate__infinite" />
    </div>
    <div class="absolute top-0 left-0 w-full h-full flex">
      <div
        data-text="網站首頁"
        class="title hover:bg-orange-200"
        @click="router.push({ name: 'hd' })"></div>
      <div
        data-text="後台管理"
        class="title hover:bg-green-200"
        @click="router.push({ name: 'admin/home' })"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  animation-duration: 2s;
}

.title {
  @apply text-white w-[50%] duration-300 relative cursor-pointer;

  &::before {
    @apply content-[attr(data-text)] absolute top-[50%] left-[50%] text-[10vw] font-bold opacity-0;
    transform: translate(-50%, calc(-50% + 100px));
    transition: 0.5s;
  }

  &:hover::before {
    opacity: 1;
    transform: translate(-50%, calc(-50% + 150px));
  }
}

@keyframes vertical {
  0%,
  60%,
  80%,
  100% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(5px);
  }

  40% {
    transform: translateY(-20px);
  }
}
</style>
