<template>
  <div class="w-screen h-screen overflow-auto photo-bg">
    <div class="external">
      <div class="horizontal-scroll-wrapper">
        <div
          class="img-wrapper"
          v-for="song of songList"
          :key="song.id"
          :class="randomCss(song.id)">
          <el-image
            class="img"
            :src="song.cover"
            :z-index="9999"
            :preview-teleported="true"
            :preview-src-list="photoList"
            :initial-index="song.id" />
          <!-- <a :href="song.cover" target="_blank" rel="noopener">
            <img :src="song.cover" alt="" />
          </a> -->
        </div>
      </div>
    </div>
    <div id="section2" class="section" :class="{ sticky }">
      <div
        class="section bg"
        v-for="(item, index) of sectionNum"
        :key="index"
        :style="{ '--i': index }"
        :class="{ static: sticky }"></div>
    </div>
    <div
      class="section bg"
      v-for="(item, index) of sectionNum"
      :key="index"
      :style="{ '--i': index }"
      :class="{ static: sticky }"></div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const progress = ref(0)
const scroll = ref(false)
const sectionNum = Math.floor(12868 / window.innerWidth)
onMounted(() => {
  const container = document.querySelector('.horizontal-scroll-wrapper')!
  const section = document.querySelector('#section2')!
  const bg = document.querySelectorAll('#section2 .bg')
  container.addEventListener('scroll', function () {
    if (container.scrollTop < 0) {
      progress.value = 0
    } else if (container.scrollTop > window.innerHeight * bg.length) {
      progress.value = 1
    } else {
      progress.value = container.scrollTop / (window.innerHeight * bg.length)
    }
    let position = (section.scrollWidth - window.innerWidth) * progress.value
    section.scrollTo({ left: position })
    scroll.value = container.scrollTop > 150
  })
})

const songList = await axios.get(`/songs/photo.json`, {}).then((r) => r.data)

const photoList = ref([])
songList.forEach((i: any) => {
  photoList.value.push(i.cover)
})

const sticky = computed(() => {
  return progress.value < 1
})

const randomCss = (id: number) => {
  let css = [
    'slower',
    'slower1',
    'slower2',
    'slower-down',
    'faster',
    'faster1',
    'fastest',
    'vertical',
  ]

  return css[(id + css.length) % css.length]
}
</script>

<style scoped lang="scss">
/* hide scrollbar */
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

::-webkit-scrollbar-button {
  width: 1px;
  height: 1px;
}
.external {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  z-index: 11;
  position: absolute;
}

.horizontal-scroll-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vh;
  transform: rotate(-90deg) translate3d(0, -100vh, 0);
  transform-origin: right top;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  height: 100vw;
  perspective: 1px;
  transform-style: preserve-3d;
  padding-bottom: 10rem;
}
.img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  transform-origin: 50% 50%;
  transform: rotate(90deg) translateZ(0.1px) scale(0.9) translateX(0px) translateY(-3vh);
  transition: 1s;
  z-index: 50;
}

.img-wrapper:hover {
  // min-height: 55vh;
  transform: rotate(90deg) translateZ(0.1px) scale(1) translateX(0px) translateY(-3vh);
}

.slower {
  transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(10%) translateY(-20vh);
}
.slower1 {
  transform: rotate(90deg) translateZ(-0.25px) scale(1.05) translateX(-50px) translateY(8vh);
}
.slower2 {
  transform: rotate(90deg) translateZ(-0.3px) scale(1.3) translateX(0%) translateY(-12vh);
}
.slower-down {
  transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(0%) translateY(16vh);
}
.faster {
  transform: rotate(90deg) translateZ(0.15px) scale(0.8) translateX(0%) translateY(-6vh);
}
.faster1 {
  transform: rotate(90deg) translateZ(0.05px) scale(0.8) translateX(0%) translateY(10vh);
}
.fastest {
  transform: rotate(90deg) translateZ(0.22px) scale(0.7) translateX(-10vh) translateY(-15vh);
}
.vertical {
  transform: rotate(90deg) translateZ(-0.15px) scale(1.15) translateX(0%) translateY(0%);
}
.last {
  transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(25vh) translateY(-8vh);
}
.scroll-info,
header {
  position: absolute;
  left: 1rem;
}

header {
  bottom: 1rem;
}
.scroll-info {
  top: 1rem;
}
a {
  color: inherit;
  font-weight: 500;
}
h1 {
  font-weight: 300;
  font-size: 1rem;
}

.img-wrapper a {
  overflow: hidden;
  display: block;
  padding: 1vh;
  background: #efecdb;
  box-shadow: 0 10px 50px #5f2f1182;
}
.img {
  max-width: 45vh;
  max-height: 50vh;
  transition: 0.5s;
  vertical-align: top;
  filter: saturate(40%) sepia(30%) hue-rotate(5deg);
}
a:hover img {
  filter: none;
}
p {
  margin: 0;
}
.scroll-info {
  display: flex;
  align-items: center;
}
.icon svg {
  width: 50px;
  fill: currentcolor;
}

.section {
  @apply relative  h-full bg-white overflow-hidden;
  &.sticky {
    position: sticky !important;
    top: 0;
    left: 0;
  }
  &.static {
    position: static !important;
  }
  &.bg {
    background: url('/img/maplestory/楓谷.png');
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
</style>
