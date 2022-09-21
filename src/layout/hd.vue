<script setup lang="ts">
const active = ref<number>(0)
const menutoggle = ref<boolean>(false)
const menulist: string[] = ['首頁', '介紹', '創作', '照片']
nextTick(() => {
  window.addEventListener('scroll', onScroll, false)
})

const onScroll = () => {
  const navContents = document.querySelectorAll('.et-slide') as NodeListOf<HTMLElement>
  const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
  let navIndex: number = -1
  navContents.forEach((item: HTMLElement, v): void => {
    if (scrollTop >= item.offsetTop - 350) {
      navIndex = v
    }
  })
  if (navIndex >= 0) {
    document.querySelector<HTMLElement>('.top_button')!.style.opacity = '1'
  } else {
    document.querySelector<HTMLElement>('.top_button')!.style.opacity = '0'
  }
  const tar = document.querySelector<HTMLElement>(`.et-hero-tab:nth-child(${navIndex + 1})`)
  let slider = document.querySelector<HTMLElement>('.et-hero-tab-slider')!
  slider.style.width = `${tar?.offsetWidth}px`
  slider.style.left = `${tar?.offsetLeft}px`
  active.value = navIndex
}

const scrollTo = (index: number): void => {
  let targetOffsetTop: number = (
    document.querySelector(`.et-slide:nth-child(${index + 1})`) as HTMLElement
  ).offsetTop
  let scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
  const STEP = 500
  if (scrollTop > targetOffsetTop) {
    smoothUp()
  } else {
    smoothDown()
  }
  menutoggle.value = false
  function smoothDown() {
    if (scrollTop < targetOffsetTop) {
      if (targetOffsetTop - scrollTop >= STEP) {
        scrollTop += STEP
      } else {
        scrollTop = targetOffsetTop
      }
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
      requestAnimationFrame(smoothDown)
    }
  }
  function smoothUp() {
    if (scrollTop > targetOffsetTop) {
      if (scrollTop - targetOffsetTop >= STEP) {
        scrollTop -= STEP
      } else {
        scrollTop = targetOffsetTop
      }
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
      requestAnimationFrame(smoothUp)
    }
  }
}
</script>

<template>
  <div class="w-full min-h-screen">
    <section class="et-hero-tabs">
      <hd-home />
      <el-affix :offset="0" class="affix">
        <div class="et-hero-tabs-container">
          <span
            v-for="(item, index) in menulist"
            :key="index"
            class="et-hero-tab"
            @click="scrollTo(index)"
            >{{ item }}</span
          >
          <span class="et-hero-tab-slider"></span>
        </div>
      </el-affix>
    </section>

    <!-- Main -->
    <main class="et-main">
      <section class="et-slide" id="tab-es6">
        <h1>ES6</h1>
        <h3>something about es6</h3>
      </section>
      <section class="et-slide" id="tab-flexbox">
        <h1>Flexbox</h1>
        <h3>something about flexbox</h3>
      </section>
      <section class="et-slide" id="tab-react">
        <h1>React</h1>
        <h3>something about react</h3>
      </section>
      <section class="et-slide" id="tab-angular">
        <h1>Angular</h1>
        <h3>something about angular</h3>
      </section>
    </main>

    <!-- top btn -->
    <el-affix position="bottom" :offset="70">
      <a class="top_button" href="#">
        <icon-arrow-up theme="outline" size="24" />
      </a>
    </el-affix>
  </div>
</template>

<style scoped lang="scss">
.et-hero-tabs,
.et-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background: #eee;
  text-align: center;
  // padding: 0 2em;
  h1 {
    font-size: 2rem;
    margin: 0;
    letter-spacing: 1rem;
  }
  h3 {
    font-size: 1rem;
    letter-spacing: 0.3rem;
    opacity: 0.6;
  }
}
.et-hero-tabs {
  cursor: pointer;
}
.affix {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
}
.et-hero-tabs-container {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 101;
  &--top {
    position: fixed;
    top: 0;
  }
}

.et-hero-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #000;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 0.8rem;
  &:hover {
    color: white;
    background: var(--hd-theme-color);
    transition: all 0.5s ease;
  }
}

.et-hero-tab-slider {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 6px;
  background: var(--hd-theme-color);
  transition: left 0.3s ease;
}

.top_button {
  @apply w-10 h-10 fixed flex justify-center items-center right-16 text-lg bg-gray-500 text-white p-1 rounded-md duration-300;
  opacity: 0;
  &:hover span {
    animation: vertical 1.5s ease-in-out infinite;
  }
}

@media (min-width: 800px) {
  .et-hero-tabs,
  .et-slide {
    h1 {
      font-size: 3rem;
    }
    h3 {
      font-size: 1rem;
    }
  }
  .et-hero-tab {
    font-size: 1rem;
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
