<template>
    <div>
        <el-tooltip effect="dark" content="全螢幕" placement="bottom-end">
            <div @click="fullScreen" class="text-lg cursor-pointer hidden md:block text-hd-black2">
                <icon-full-screen theme="outline" size="24" v-if="!isFullScreen" />
                <icon-off-screen theme="outline" size="24" v-else />
            </div>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
const isFullScreen = ref<boolean>(false)
const fullScreen = () => {
    isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    isFullScreen.value = !isFullScreen.value
}
</script>
