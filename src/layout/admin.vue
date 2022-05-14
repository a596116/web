<template>
    <div>
        <el-container class="relative">
            <!-- Menu -->
            <el-scrollbar>
                <admin-menu />
            </el-scrollbar>
            <div class="bg md:hidden" @click="closeMenu" :class="{ 'close': !menu.isMenuCollapse }"></div>

            <el-container class="grid min-h-screen">
                <div class="content bg-gray-100 grid grid-rows-[auto_1fr]">
                    <div class="">
                        <admin-nav-bar />
                        <admin-history-link class="hidden md:block" />
                    </div>

                    <div class="m-3 relative overflow-y-auto">
                        <router-view #default="{ Component, route }">
                            <Transition appear class="animate__animated"
                                :enter-active-class="route.meta.enterClass ?? 'animate__bounceInRight'"
                                :leave-active-class="route.meta.leaveClass ?? 'animate__bounceOutLeft'">
                                <component :is="Component" class="absolute w-full" />
                            </Transition>
                        </router-view>
                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { menus } from '@/stores/menuStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const menu = menus()
menu.init()
watch(route, async () => {
    menu.addHistoryMenu(route)
},
    { immediate: true })

const closeMenu = () => {
    menu.toggleMenu()
}
</script>

<style scoped lang="scss">
.animate__bounceInRight {
    animation-duration: 0.8s;
}

.animate__bounceOutLeft {
    animation-duration: 0.5s;
}

.bg {
    z-index: 99;
    @apply absolute h-screen w-screen bg-yellow-200 top-0 opacity-20;

    &.close {
        @apply hidden;
    }
}
</style>