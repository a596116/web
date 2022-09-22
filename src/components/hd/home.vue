<template>
  <div :class="{ scroll }" class="relative w-full h-screen flex justify-center">
    <ul class="bgList">
      <li
        v-for="n in total"
        :key="n"
        :style="img(n - 1)"
        :class="{ active: bgactive === n - 1 || bgpreactive === n - 1 }"></li>
    </ul>
    <div class="homeTitle">
      <span class="typed"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typed from 'typed.js'
const scroll = ref(false)
const total = ref(5)
const animationDuration = 10
const bgactive = ref(0)
const bgpreactive = ref(0)
const bgimg = [
  'https://media.altphotos.com/cache/images/2018/01/11/09/1504/sunset-cliff.jpg',
  'https://media.altphotos.com/cache/images/2020/12/09/15/1504/landscape-mountain.jpg',
  'https://media.altphotos.com/cache/images/2020/10/13/08/1504/sky-pylons-lines.jpg',
  'https://media.altphotos.com/cache/images/2020/11/10/09/1504/church-moon.jpg',
  'https://media.altphotos.com/cache/images/2018/01/12/04/1504/manhattan-seagull-skyline.jpg',
]

const img = (n: number) => {
  return {
    backgroundImage: `url(${bgimg[n]})`,
    animationDuration: `${animationDuration}s`,
  }
}

window.addEventListener('scroll', function () {
  scroll.value = window.scrollY > 0
})

setInterval(() => {
  bgpreactive.value = bgactive.value
  bgactive.value = (bgactive.value + 1 + total.value) % total.value
}, (animationDuration / 2) * 1500)

let typed = {} as Typed
onMounted(() => {
  typed = new Typed('.typed', {
    strings: ['Hao Dai', 'So Cute'],
    typeSpeed: 200,
    backSpeed: 100,
    loop: true,
  })
})
onUnmounted(() => {
  typed.destroy()
})
</script>

<style scoped lang="scss">
.bgList {
  @apply absolute w-full h-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] duration-500 z-10 bg-white;
  list-style: none;

  li {
    @apply opacity-0 absolute w-full h-full;
    background: center no-repeat;
    background-size: 150% auto;

    &.active {
      animation: bgAnimate linear;
    }
  }
}

.scroll .bgList {
  width: 70%;
  height: 300px;
}

@keyframes bgAnimate {
  0% {
    opacity: 0;
    background-size: 150% auto;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    background-size: 110% auto;
  }
}

:deep(.homeTitle) {
  @apply absolute bottom-40 flex justify-center flex-row;
  span {
    @apply text-6xl text-gray-400 duration-500;
    letter-spacing: 5px;
  }
  .typed-cursor {
    font-size: 3.75rem !important;
  }
}
</style>
