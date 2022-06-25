<template>
  <div class="text-black text-3xl">
    <form @submit.prevent="postData">
      <input type="text" v-model="fruitname" />
      <button>添加</button>
    </form>
    <ul>
      <li v-for="(item, index) of data" :key="index">
        {{ item }}<button @click="del(index)">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { http } from '@/plugins/axios'
const data = ref([])
const fruitname = ref('')

nextTick(() => {
  getData()
})
const getData = () => {
  http
    .request({
      url: 'fruits',
      method: 'get',
    })
    .then((res) => {
      data.value = res
    })
}
const postData = () => {
  http
    .request({
      url: 'fruits',
      method: 'post',
      data: {
        fruit: fruitname.value,
      },
    })
    .then(() => {
      getData()
    })
}
const del = (index) => {
  http
    .request({
      url: `fruits/${index}`,
      method: 'delete',
    })
    .then(() => {
      getData()
    })
}
</script>

<style scoped></style>
