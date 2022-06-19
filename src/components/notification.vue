<template>
  <div class="notification">
    <el-badge
      :is-dot="isMessage"
      @click.stop="show = !show"
      class="cursor-pointer text-lg text-hd-black2">
      <icon-remind theme="outline" size="24" />
    </el-badge>
    <el-tabs v-model="activeName" class="lists" v-show="show" @click.stop>
      <el-tab-pane label="站內消息" name="message">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { ref } from 'vue'

const isMessage = ref(true)
const activeName = ref('message')
const show = ref(false)
nextTick(() => {
  document.documentElement.addEventListener('click', () => {
    show.value = false
  })
})
</script>

<style scoped lang="scss">
.notification {
  @apply relative;

  .lists {
    @apply absolute bg-white p-5 border rounded-md shadow-md right-[-30px] z-10 w-[300px];

    a {
      @apply truncate overflow-hidden block border-b pb-2 my-2;

      &:hover {
        color: var(--hd-theme-color);
      }
    }
  }
}
</style>
<style lang="scss">
.notification {
  .el-tabs__item.is-active,
  .el-tabs__item:hover {
    color: var(--hd-theme-color);
  }

  .el-tabs__active-bar {
    background-color: var(--hd-theme-color);
  }
}
</style>
