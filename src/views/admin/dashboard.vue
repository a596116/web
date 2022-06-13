<template>
  <div ref="dashboard">
    <admin-quick-bar />
    <div class="flex flex-col bg-hd-bg-white px-6">
      <div class="flex md:justify-start justify-between flex-wrap md:gap-8">
        <div class="card w-auto h-auto md:w-[170px] md:h-[100px] p-2 md:px-7" v-for="item, index in echartStore.cards"
          :key="index" @click="changeEchart(index)">
          <div class="flex justify-between text-hd-black1">
            <component :is="(icons as any)[item.icon!]" theme="outline" class="text-4xl"></component>
            <span class="mt-3 hidden md:block">{{ item.totaltle }}</span>
          </div>
          <div class="items-end text-hd-white hidden md:flex">
            <span class="mt-3 text-2xl truncate">{{ item.total }}</span>
            <span class="text-sm ml-1">{{ item.unit }}</span>
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
import { echartStores } from '@/stores/echartStore'
import { store } from '@/utils'
import { CacheEnum } from '@/enum/cacheEnum'

const echartStore = echartStores()
const dashboard = ref()
let echart1 = {} as echarts.ECharts

const resize = new ResizeObserver((entries) => {
  entries.forEach(() => {
    echart1.resize()
  })
})

nextTick(() => {
  echart1 = echarts.init(document.getElementById('echart1') as HTMLDivElement)
  echart1.setOption(echartStore.echart1)
  resize.observe(dashboard.value)
})

const changeEchart = (index: number) => {
  echartStore.cardIndex = index
  store.set(CacheEnum.DASHBOARD_CARD_INDEX, index)
  echart1.setOption(echartStore.echart1)
}

</script>


<style lang="scss" scoped>
.card {
  @apply flex flex-col justify-center rounded-[30px] duration-300 my-6 cursor-pointer;
  // box-shadow: 10px 10px 30px #ededed,
  //   -10px -10px 30px #ededed;

  &:hover {
    box-shadow: 10px 10px 30px #c2c2c2,
      -10px -10px 30px #ffffff;

    * {
      color: var(--hd-theme-color);
    }
  }
}
</style>