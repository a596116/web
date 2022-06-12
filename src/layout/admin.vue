<template>
    <div>
        <el-container class="relative">
            <!-- Menu -->
            <el-scrollbar>
                <admin-menu />
            </el-scrollbar>
            <div class="mask md:hidden" @click="closeMenu" :class="{ 'close': !menuStore.isMenuCollapse }"></div>

            <el-container class="grid min-h-screen">
                <div class="content bg-hd-bg-white grid grid-rows-[auto_1fr]">
                    <div class="">
                        <admin-nav-bar />
                        <admin-history-link class="hidden md:block"
                            :class="{ 'md:hidden': !menuStore.isHistoryCollapse }" />
                    </div>

                    <div class="main m-3 relative overflow-y-auto">
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
import { menuStores } from '@/stores/menuStore'
const route = useRoute()
const menuStore = menuStores()

menuStore.init()
watch(route, async () => {
    menuStore.addHistoryMenu(route)
},
    { immediate: true })

const closeMenu = () => {
    menuStore.toggleMenu()
}
</script>

<style scoped lang="scss">
.animate__bounceInRight {
    animation-duration: 0.8s;
}

.animate__bounceOutLeft {
    animation-duration: 0.5s;
}

.mask {
    z-index: 99;
    @apply absolute h-screen w-screen bg-yellow-200 top-0 opacity-20;

    &.close {
        @apply hidden;
    }
}

.main::-webkit-scrollbar {
    display: none;
}
</style>