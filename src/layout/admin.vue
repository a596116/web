<template>
    <div>
        <el-container>
            <!-- Menu -->
            <el-scrollbar>
                <admin-menu />
            </el-scrollbar>

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
menus().init()
watch(route, async () => {
    menus().addHistoryMenu(route)
},
    { immediate: true })
</script>

<style scoped lang="scss">
.animate__bounceInRight {
    animation-duration: 0.8s;
}

.animate__bounceOutLeft {
    animation-duration: 0.5s;
}
</style>