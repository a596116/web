<template>
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="bg-transparent">
        <template #header>
            <div>快速導覽</div>
        </template>
        <div class="flex justify-around items-center flex-wrap">
            <router-link :to="{ name: quick.route }" class="quick-icon" v-for="quick, index in quickList" :key="index">
                <component :is="icons[quick.icon!]" theme="outline" class="icon" :class="[quick.iconColor]"></component>
                <span class="title">{{ quick.title }}</span>
            </router-link>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import * as icons from '@icon-park/vue-next'

const quickList = ref<IQuick[]>([
    { title: '用戶管理', icon: 'User', iconColor: 'text-[#f8c291]', route: 'error/404' },
    { title: '菜單管理', icon: 'ApplicationMenu', iconColor: 'text-[#6a89cc]', route: 'error/404' },
    { title: '庫存數據', icon: 'DataSheet', iconColor: 'text-[#82ccdd]', route: 'error/404' },
    { title: '評論', icon: 'Communication', iconColor: 'text-[#b8e994]', route: 'error/404' },
])
</script>

<style scoped lang="scss">
.quick-icon {
    @apply w-[100px] h-[100px] flex justify-center items-center flex-col m-3 rounded-md duration-300;

    &:hover {
        box-shadow: 10px 15px 35px #bcbcbc,
            -10px -15px 45px #ffffff;
    }

    .icon {
        @apply w-[50px] h-[50px] text-2xl flex justify-center items-center rounded-md;
    }

    .title {
        @apply pt-2;
    }

}
</style>