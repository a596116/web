<template>
  <div class="menu w-[200px] bg-gray-800 py-4 px-3 relative" :class="{ close: menuStore.close }">
    <div class="logo">
      <i class="fab fa-apple text-yellow-400 text-[30px]"></i>
      <span class="text-lg">浩呆</span>
    </div>
    <!-- Menu -->
    <div class="container">
      <dl v-for="(menu, index) in menuStore.menus" :key="index">
        <dt @click="handle(menu)">
          <section>
            <component :is="icons[menu.icon!]" theme="outline" size="24" fill="#fff" class="text-2xl"></component>
            <span class="menu-title">{{ menu.title }}</span>
          </section>
          <section :class="{ 'rotate-180': menu.isClick }" class="duration-300">
            <i class="fas fa-angle-down"></i>
          </section>
        </dt>
        <dd :class="menu.isClick && !menuStore.close ? 'block' : 'hidden'">
          <div :class="{ active: cmenu.isClick }" v-for="(cmenu, index) in menu.children" :key="index" @click="handle(menu, cmenu)">
            {{ cmenu?.title }}
          </div>
        </dd>
      </dl>
    </div>
    <div class="bg" @click="menuStore.close = true"></div>
  </div>
</template>

<script setup lang="ts">
import type { IMenu } from '#/menu'
import { menus } from '@/stores/menuStore'
import router from '@/router'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import * as icons from '@icon-park/vue-next'
const route = useRoute()
const menuStore = menus()

const resetMenus = () => {
  menuStore.menus.forEach((pmenu) => {
    pmenu.isClick = false
    pmenu.children?.forEach((cmenu) => {
      cmenu.isClick = false
    })
  })
}
const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  resetMenus()
  pmenu.isClick = true
  if (cmenu) {
    cmenu.isClick = true
    router.push({ name: cmenu.route })
  }
}

watch(route, () => menuStore.setCurrentMenu(route), { immediate: true })
</script>

<style scoped lang="scss">
.menu {
  @apply z-20;

  .logo {
    @apply flex items-center text-gray-300 p-4;

    span {
      @apply ml-4;
    }
  }

  .container {
    dl {
      @apply text-gray-300 text-sm relative;

      dt {
        @apply text-base mt-6 flex justify-between items-center cursor-pointer rounded-md p-3;

        section {
          @apply flex items-center;

          .menu-title {
            @apply ml-2;
          }
        }
      }

      dd {
        div {
          @apply py-3 pl-4 my-2 rounded-md cursor-pointer hover:bg-amber-400 duration-300 bg-gray-600;

          &.active {
            @apply bg-amber-500;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .menu {
    &.close {
      @apply w-auto px-0;

      .logo {
        span {
          @apply hidden;
        }
      }

      .container {
        dl {
          dt {
            @apply rounded-none;
            section {
              .menu-title {
                @apply hidden;
              }
              &:nth-of-type(2) {
                @apply hidden;
              }
            }
          }
          &:hover {
            dd {
              @apply absolute left-full top-0 w-[200px] bg-gray-500 block p-2 rounded-md;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .menu {
    @apply h-screen w-[200px] absolute left-0 top-0 z-50;
    &.close {
      @apply hidden;
    }
    .bg {
      width: calc(100vw - 200px);
      @apply absolute h-screen bg-yellow-200 opacity-50 top-0 left-[200px];
    }
  }
}
</style>
