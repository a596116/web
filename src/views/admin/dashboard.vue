<template>
  <div ref="dashboard">
    <admin-quick-bar />
    <div class="flex flex-col bg-[#f1f2f6] px-6">
      <div class="flex md:justify-start justify-center flex-wrap gap-8">
        <div class="card" v-for="item, index in echart.cards" :key="index" @click="changeEchart(index)">
          <component :is="icons[item.icon!]" theme="outline" class="text-4xl"></component>
          <span class="mt-3 text-[#8395a7]">{{ item.totaltle }}</span>
          <div class="flex items-end">
            <span class="mt-3 text-2xl truncate">{{ item.total }}</span>
            <span class="text-sm ml-1 text-[#8395a7]">{{ item.unit }}</span>
          </div>
        </div>
      </div>
      <div id="echart1" class="w-full h-96"></div>
    </div>



  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import * as icons from '@icon-park/vue-next'
import { echartStore } from '@/stores/echartStore'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'

const echart = echartStore()
const dashboard = ref()
let echart1 = {} as echarts.ECharts

const resize = new ResizeObserver((entries) => {
  entries.forEach(() => {
    echart1.resize()
  })
})

nextTick(() => {
  echart1 = echarts.init(document.getElementById('echart1') as HTMLDivElement)
  echart1.setOption(echart.echart1)
  resize.observe(dashboard.value)
})

const changeEchart = (index: number) => {
  echart.cardIndex = index
  store.set(CacheEnum.DASHBOARD_CARD_INDEX, index)
  echart1.setOption(echart.echart1)
}


</script>


<style lang="scss" scoped>
.card {
  @apply w-[170px] h-[170px] flex flex-col rounded-[30px] duration-300 my-8 bg-gray-100 p-7 text-gray-500 cursor-pointer;
  box-shadow: 10px 10px 30px #ededed,
    -10px -10px 30px #ededed;

  &:hover {
    box-shadow: 10px 10px 30px #c2c2c2,
      -10px -10px 30px #ffffff;
  }
}
</style>