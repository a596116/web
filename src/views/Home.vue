<script setup lang="ts">
import router from '@/router'

useTitle('浩呆')
</script>
<template>
  <div class="relative flex items-center justify-center w-screen h-screen bg-gray-600">
    <div class="description">請點選四周</div>
    <div class="z-10 flex items-center justify-center border-8 border-white rounded-full w-80 h-80">
      <el-image
        src="/img/logo.png"
        fit="contain"
        :lazy="true"
        class="rounded-full w-72 h-72 animate__animated animate__bounce animate__infinite"></el-image>
    </div>
    <div class="absolute top-0 left-0 flex flex-wrap w-full h-full">
      <div
        data-text="網站首頁"
        class="title hover:bg-orange-200"
        @click="router.push({ name: 'hd' })"></div>
      <a
        data-text="浩呆博客"
        class="title hover:bg-green-200"
        href="https://wanghaodai.com/"
        target="_blank"></a>
      <div data-text="Music" class="title hover:bg-teal-200" @click=""></div>
      <div
        data-text="後台管理"
        class="title hover:bg-rose-200"
        @click="router.push({ name: 'admin/home' })"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  @apply absolute top-[100px] left-1/2 z-[11] flex text-xl text-white rounded-lg p-4;
  background: rgba(0, 0, 0, 0.5);
  letter-spacing: 10px;
  transform: translateX(-50%);
}
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
