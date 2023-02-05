<template>
  <div>
    <el-tooltip effect="dark" content="主題" placement="bottom-end">
      <icon-setting-two
        theme="outline"
        size="24"
        class="cursor-pointer text-hd-black2"
        @click="themeSettingDrawer = true" />
    </el-tooltip>
    <el-drawer v-model="themeSettingDrawer" title="Theme Setting" :with-header="false" :size="300">
      <div class="p-8 flex flex-col justify-center text-lg">
        <span class="mb-3 text-hd-theme-color m-auto">主題設定</span>
        <div class="my-5">
          <span class="text-hd-black1 mx-3">主題顏色</span>
          <el-color-picker
            v-model="themeColor"
            :predefine="themeColorList"
            @active-change="changeThemeColor" />
        </div>
        <div class="my-5 hidden md:block">
          <span class="text-hd-black1 mx-3">麵包屑</span>
          <el-switch
            v-model="menuStore.isBreadcrumbCollapse"
            class="ml-2"
            active-color="#6BDBED"
            active-text="開"
            inactive-text="關"
            @change="menuStore.toggleBreadcrumb"
            size="large" />
        </div>
        <div class="my-5 hidden md:block">
          <span class="text-hd-black1 mx-3">歷史紀錄</span>
          <el-switch
            v-model="menuStore.isHistoryCollapse"
            class="ml-2"
            active-color="#6BDBED"
            active-text="開"
            inactive-text="關"
            @change="menuStore.toggleHistoryLink"
            size="large" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { menuStores } from '@/stores/menuStore'
import { store } from '@/utils'
const menuStore = menuStores()
// 主題設定
const themeSettingDrawer = ref<boolean>(false)
const themeColor = ref<string>(store.get('themeColor') || '#fdcb6e')
const themeColorList = ref<string[]>(['#fdcb6e', '#3DCAE0'])
const el: HTMLElement = document.documentElement
const el1: HTMLElement = document.documentElement
getComputedStyle(el).getPropertyValue(`--hd-theme-color`)
el.style.setProperty('--hd-theme-color', themeColor.value)
getComputedStyle(el1).getPropertyValue(`--hd-theme-hover-color`)
el1.style.setProperty('--hd-theme-hover-color', themeColor.value + '80')

const changeThemeColor = (color: string): void => {
  store.set('themeColor', color)
  el.style.setProperty('--hd-theme-color', color)
  el1.style.setProperty('--hd-theme-hover-color', color + '80')
}
</script>
