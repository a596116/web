<template>
  <div class="cursor"></div>
  <!-- <div class="cursor-f"></div> -->
  <suspense>
    <!-- <template #default> -->
    <router-view class=""></router-view>
    <!-- </template> -->
    <!-- <template #fallback>
      <div class="w-screen h-screen bg-slate-400 flex justify-center items-center">
        <div class="w-80 h-80 rounded-full border-8 border-white z-10 flex justify-center items-center">
          <img src="/img/logo.png"
            class="w-72 h-72 object-contain rounded-full animate__animated animate__bounce animate__infinite" />
        </div>
      </div>
    </template> -->
  </suspense>
</template>

<script setup lang="ts">
import { cursor } from './utils'

const route = useRoute()
onMounted(() => {
  cursor()
})
watch(route, () => {
  cursor()
})
</script>

<style lang="scss">
@import '@/styles/base.scss';

.cursor {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999 !important;
  width: var(--width);
  height: var(--height);
  transform: translate(calc(var(--x) - var(--width) / 2), calc(var(--y) - var(--height) / 2));
  transition-duration: 125ms;
  transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
  transition-property: width, height, transform;
  transition: 150ms width cubic-bezier(0.39, 0.575, 0.565, 1),
    150ms height cubic-bezier(0.39, 0.575, 0.565, 1),
    100ms transform cubic-bezier(0.39, 0.575, 0.565, 1);
  pointer-events: none;
  will-change: transform;
}
@media (pointer: fine) {
  .cursor {
    display: block;
  }
}
.cursor::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--radius);
  border: 1.5px solid #414659;
  opacity: var(--scale);
  pointer-events: none;
  -webkit-transform: scale(var(--scale));
  transform: scale(var(--scale));
  transition: 300ms opacity cubic-bezier(0.39, 0.575, 0.565, 1),
    300ms transform cubic-bezier(0.39, 0.575, 0.565, 1),
    150ms border-radius cubic-bezier(0.39, 0.575, 0.565, 1);
}

html:not(html:hover) .cursor::after {
  opacity: 0;
  transform: scale(0);
}
</style>
