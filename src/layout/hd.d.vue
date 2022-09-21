<script setup lang="ts">
const active = ref<number>(0)
const menutoggle = ref<boolean>(false)
const menulist: string[] = ['首頁', '介紹', '創作', '照片']
nextTick(() => {
  window.addEventListener('scroll', onScroll, false)
})

const onScroll = () => {
  const navContents = document.querySelectorAll('.et-hero-tabs') as NodeListOf<HTMLElement>
  let offsetTopArr: number[] = []
  navContents.forEach((item: HTMLElement): void => {
    offsetTopArr.push(item.offsetTop - 350)
  })
  const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
  let navIndex: number = 0
  for (let n = 0; n < offsetTopArr.length; n++) {
    if (scrollTop >= offsetTopArr[n]) {
      navIndex = n
    }
  }
  active.value = navIndex
}

const scrollTo = (index: number): void => {
  let targetOffsetTop: number = (
    document.querySelector(`.content:nth-child(${index + 1})`) as HTMLElement
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

//////////////////////
// class StickyNavigation {
//   currentId: any
//   currentTab: any
//   tabContainerHeight: number
//   constructor() {
//     this.currentId = null
//     this.currentTab = null
//     this.tabContainerHeight = 70
//     let self = this
//     // $('.et-hero-tab').click(function () {
//     //   self.onTabClick(event, $(this))
//     // })
//     // $(window).scroll(() => {
//     //   this.onScroll()
//     // })
//     // $(window).resize(() => {
//     //   this.onResize()
//     // })
//   }

//   onTabClick(event: any, element: any) {
//     event.preventDefault()
//     let scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
//     // let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1
//     document.querySelector('html')?.animate({ scrollTop: scrollTop }, 600)
//     document.querySelector('body')?.animate({ scrollTop: scrollTop }, 600)
//   }

//   onScroll() {
//     this.checkTabContainerPosition()
//     this.findCurrentTabSelector()
//   }

//   onResize() {
//     if (this.currentId) {
//       this.setSliderCss()
//     }
//   }

//   checkTabContainerPosition() {
//     let offset =
//       document.querySelector<HTMLElement>('.et-hero-tabs')!.offsetTop +
//       document.querySelector<HTMLElement>('.et-hero-tabs')!.offsetHeight -
//       this.tabContainerHeight
//     let scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
//     if (scrollTop > offset) {
//       document.querySelector<any>('.et-hero-tabs-container').addClass('et-hero-tabs-container--top')
//     } else {
//       document
//         .querySelector<any>('.et-hero-tabs-container')
//         .removeClass('et-hero-tabs-container--top')
//     }
//   }

//   findCurrentTabSelector(element?: any) {
//     let newCurrentId
//     let newCurrentTab
//     let self = this
//     document.querySelectorAll<any>('.et-hero-tab').forEach((e) => {
//       let id = e.getAttribute('href')
//       let offsetTop = document.querySelector<HTMLElement>(id)!.offsetTop - this.tabContainerHeight
//       let offsetBottom =
//         document.querySelector<HTMLElement>(id)!.offsetTop +
//         document.querySelector<HTMLElement>(id)!.offsetHeight -
//         this.tabContainerHeight
//       if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
//         newCurrentId = id
//         newCurrentTab = $(this)
//       }
//     })
//     if (this.currentId != newCurrentId || this.currentId === null) {
//       this.currentId = newCurrentId
//       this.currentTab = newCurrentTab
//       this.setSliderCss()
//     }
//   }

//   setSliderCss() {
//     let width = 0
//     let left = 0
//     if (this.currentTab) {
//       width = this.currentTab.css('width')
//       left = this.currentTab.offset().left
//     }
//     $('.et-hero-tab-slider').css('width', width)
//     $('.et-hero-tab-slider').css('left', left)
//   }
// }

// new StickyNavigation()
</script>

<template>
  <div class="w-full min-h-screen">
    <nav>
      <img src="/img/haodai.png" alt="haodai" class="logo hidden md:block" @click="scrollTo(0)" />
      <ul class="navigation">
        <li v-for="(item, index) in menulist" :key="index">
          <span
            class="px-0 md:px-5"
            :class="{ active: active === index }"
            @click="scrollTo(index)"
            >{{ item }}</span
          >
        </li>
      </ul>
      <div class="top_button" @click="scrollTo(0)">
        <icon-arrow-up theme="outline" size="24" />
      </div>
    </nav>
    <section>
      <div class="content">
        <hd-home />
      </div>
      <div class="content bg-red-400">123</div>
      <div class="content bg-green-200">456</div>
      <div class="content bg-blue-200">789</div>
    </section>
  </div>
</template>

<style scoped lang="scss">
nav {
  @apply fixed top-0 left-0 w-full px-20 py-2 flex justify-between items-center z-20 bg-white opacity-90;

  .logo {
    @apply relative w-14 h-11 duration-200 cursor-pointer;
    filter: invert(70%) brightness(50%) drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.7));

    &:hover {
      transform: rotate(-10deg);
    }
  }

  ul {
    @apply relative flex justify-center items-center;

    li {
      @apply ml-5;
      list-style: none;

      span {
        @apply text-gray-500 text-xl font-medium cursor-pointer py-2 duration-300;
        &.active {
          &::before {
            @apply content-[""] absolute -bottom-1 left-[0] w-full -translate-x-[50%] h-1 bg-[#ffc107];
          }
        }
      }
    }
  }

  .top_button {
    @apply w-10 h-10 absolute flex justify-center items-center top-[93vh] right-16 text-lg bg-gray-500 text-white p-1 rounded-md;

    &:hover span {
      animation: vertical 1.5s ease-in-out infinite;
    }
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

.content {
  @apply relative min-h-screen;
}
</style>
