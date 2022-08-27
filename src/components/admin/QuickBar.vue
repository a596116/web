<template>
  <el-card shadow="never" :body-style="{ padding: '20px' }" class="bg-transparent">
    <template #header>
      <div class="text-hd-black2">快速導覽</div>
    </template>
    <div class="flex justify-around items-center flex-wrap">
      <router-link
        class="quick-icon"
        v-for="(quick, index) in quickList"
        :key="index"
        v-show="quick.show"
        :to="{ name: quick.show ? quick.route : 'home' }">
        <component
          :is="(icons as any)[quick.icon!]"
          theme="outline"
          class="icon"
          :class="[quick.iconColor]">
        </component>
        <span class="title">{{ quick.title }}</span>
      </router-link>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { userStores } from '@/stores/userStore'
import * as icons from '@icon-park/vue-next'
const userStore = userStores()
const quickList = ref<IQuick[]>([
  {
    title: '用戶管理',
    icon: 'User',
    iconColor: 'text-[#f8c291]',
    route: 'admin/users',
    show: userStore?.info?.permissions.includes('浩呆') as boolean,
  },
  {
    title: 'Blog',
    icon: 'Book',
    iconColor: 'text-[#6a89cc]',
    route: 'admin/blog',
    show: userStore?.info?.permissions.includes('admin') as boolean,
  },
  {
    title: '庫存數據',
    icon: 'DataSheet',
    iconColor: 'text-[#82ccdd]',
    route: 'error/404',
    show: true,
  },
  {
    title: '評論',
    icon: 'Communication',
    iconColor: 'text-[#b8e994]',
    route: 'error/404',
    show: true,
  },
])
</script>

<style scoped lang="scss">
.quick-icon {
  @apply w-[100px] h-[100px] flex justify-center items-center flex-col m-3 rounded-md duration-300;

  &:hover {
    box-shadow: 10px 15px 35px #bcbcbc, -10px -15px 45px #ffffff;
  }

  .icon {
    @apply w-[50px] h-[50px] text-2xl flex justify-center items-center rounded-md;
  }

  .title {
    @apply pt-2 text-hd-black1;
  }
}
</style>
