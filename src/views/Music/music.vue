<template>
  <div class="container relative">
    <router-link
      to="/"
      class="flex justify-center items-center absolute p-2 text-hd-white hover:text-hd-black2">
      <icon-left theme="outline" class="text-4xl" />
      <span>首頁</span>
    </router-link>
    <music-container />

    <div id="section2" class="section" :class="{ sticky }">
      <div class="section bg" style="--i: 0" :class="{ static: sticky }"></div>
      <div class="section bg" style="--i: 1" :class="{ static: sticky }"></div>
      <div class="section bg" style="--i: 2" :class="{ static: sticky }"></div>
      <div class="section bg" style="--i: 3" :class="{ static: sticky }"></div>
      <div class="section bg" style="--i: 4" :class="{ static: sticky }"></div>
      <div class="section bg" style="--i: 5" :class="{ static: sticky }"></div>
    </div>
    <div class="section bg" style="--i: 1" :class="{ static: sticky }"></div>
    <div class="section bg" style="--i: 2" :class="{ static: sticky }"></div>
    <div class="section bg" style="--i: 3" :class="{ static: sticky }"></div>
    <div class="section bg" style="--i: 4" :class="{ static: sticky }"></div>
    <div class="section bg" style="--i: 5" :class="{ static: sticky }"></div>
  </div>
</template>

<script setup lang="ts">
// 背景區
const progress = ref(0)
const scroll = ref(false)
onMounted(() => {
  const app = document.querySelector('.container')!
  const section = document.querySelector('#section2')!
  const bg = document.querySelectorAll('#section2 .bg')
  app.addEventListener('scroll', function () {
    if (app.scrollTop < window.innerHeight) {
      progress.value = 0
    } else if (app.scrollTop > window.innerHeight * bg.length) {
      progress.value = 1
    } else {
      progress.value = (app.scrollTop - window.innerHeight) / (window.innerHeight * (bg.length - 1))
    }
    let position = (section.scrollWidth - window.innerWidth) * progress.value
    section.scrollTo({ left: position })
    scroll.value = app.scrollTop > 150
  })
})

const sticky = computed(() => {
  return progress.value < 1
})
</script>

<style scoped lang="scss">
.container {
  @apply w-screen h-screen overflow-auto;
  min-width: 100vw;
  /* 背景 */
  .section {
    @apply relative w-full h-full bg-white overflow-hidden;
    &.sticky {
      position: sticky !important;
      top: 0;
      left: 0;
    }
    &.static {
      position: static !important;
    }
    &.bg {
      background: url('/img/楓谷.png');
      background-size: cover;
      background-position: calc(var(--i) * -100vw);
    }
  }
  #section2 {
    @apply flex flex-nowrap overflow-hidden;
    .section {
      width: 100vw;
      min-width: 100vw;
    }
  }
}
</style>
