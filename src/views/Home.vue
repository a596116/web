<script setup lang="ts">
import router from '@/router'
useTitle('浩呆')
</script>
<template>
  <div class="h-screen w-screen bg-gray-600 flex justify-center items-center relative">
    <div class="w-80 h-80 rounded-full border-8 border-white z-10 flex justify-center items-center">
      <img
        src="/img/logo.png"
        class="w-72 h-72 object-contain rounded-full animate__animated animate__bounce animate__infinite" />
    </div>
    <div class="absolute top-0 left-0 w-full h-full flex flex-wrap">
      <div
        data-text="網站首頁"
        class="title hover:bg-orange-200"
        @click="router.push({ name: 'hd' })"></div>
      <div
        data-text="後台管理"
        class="title hover:bg-green-200"
        @click="router.push({ name: 'admin/home' })"></div>
      <div
        data-text="MapleStory"
        class="title hover:bg-teal-200"
        @click="router.push({ name: 'maplestory' })"></div>
      <div
        data-text="後台管理"
        class="title hover:bg-rose-200"
        @click="router.push({ name: 'admin/home' })"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  animation-duration: 2s;
}

.title {
  @apply text-white w-[50%] h-[50%] duration-300 relative cursor-pointer;

  &::before {
    @apply content-[attr(data-text)] absolute top-[20%] left-[50%] text-[6vw] font-bold opacity-0;
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
