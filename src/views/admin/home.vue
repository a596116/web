<template>
  <div>
    <div class="grid md:grid-cols-4 gap-3">
      <el-card shadow="hover" :body-style="{ padding: '20px' }" v-for="(card, index) in cards" :key="index" class="cursor-pointer">
        <template #header>
          <div class="flex justify-between items-center">
            {{ card.title }}
            <el-tag type="danger" size="small" effect="dark">月</el-tag>
          </div>
        </template>
        <!-- card body -->
        <section class="flex justify-between items-center mt-3">
          <span class="text-3xl">$12345</span>
          <i :class="[card.icon, card.iconColor]" class="text-5xl"></i>
        </section>
        <section class="text-base mt-6 flex justify-between">
          {{ card.totaltle }}
          <span>{{ card.total }}</span>
        </section>
      </el-card>
    </div>

    <div class="mt-5 grid md:grid-cols-2 gap-3">
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header>
          <div>用戶統計</div>
        </template>
        <div id="echart1" class="w-full h-72"></div>
      </el-card>

      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header>
          <div>銷售額</div>
        </template>
        <div id="echart2" class="w-full h-72"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { echart1, echart2 } from './echart'
import * as echarts from 'echarts'

interface ICard {
  title: string
  price: number
  icon: string
  iconColor: string
  totaltle: string
  total: number
}

const cards = ref<ICard[]>([
  { title: '人數', price: 215646, icon: 'fab fa-algolia', totaltle: '總人數', total: 89764561, iconColor: 'text-amber-600' },
  { title: '銷售額', price: 12354, icon: 'fab fa-alipay', totaltle: '總銷售額', total: 214240, iconColor: 'text-green-600' },
  { title: '訂單數', price: 235431, icon: 'fab fa-app-store-ios', totaltle: '總訂單數', total: 8342312, iconColor: 'text-blue-600' },
  { title: '評論數', price: 75123, icon: 'fab fa-avianex', totaltle: '總評論數', total: 1057673, iconColor: 'text-red-600' },
])

nextTick(() => {
  echarts.init(document.getElementById('echart1') as HTMLDivElement).setOption(echart1)
  echarts.init(document.getElementById('echart2') as HTMLDivElement).setOption(echart2)
})
</script>
