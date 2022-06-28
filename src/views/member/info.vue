<template>
  <div>
    <div class="w-[200px]">
      <section class="bg-hd-theme-color" @click="avatarDialog = true">
        <el-image
          :src="user?.avatar ? user?.avatar : '/public/img/haodai.png'"
          fit="cover"
          class="user_avatar">
        </el-image>
      </section>
      <section class="bg-hd-bg-black flex justify-center items-center py-2 text-lg">
        {{ user?.name }}
      </section>
    </div>
    <!-- {{ user }} -->

    <member-editor-avatar v-model="avatarDialog" :userId="((user?.id) as unknown as number)" />
  </div>
</template>

<script setup lang="ts">
import { userStores } from '@/stores/userStore'
const userStore = userStores()
const user = userStore.info

const avatarDialog = ref(false)
</script>

<style scoped lang="scss">
.user_avatar {
  @apply w-full cursor-pointer relative flex justify-center items-center;
  &::after {
    content: '修改';
    @apply absolute text-white w-full h-full text-lg flex justify-center items-center invisible;
    background-color: #6f6f6f70;
  }
  &:hover::after {
    @apply visible;
  }
}
</style>
