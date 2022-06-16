<template>
  <div class="">
    <div class="article">
      <el-skeleton class="w-full" :loading="loading" animated :throttle="500">
        <template #template>
          <el-skeleton-item variant="image" class="w-[240px] h-[240px]" />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" class="w-1/2" />
            <div class="flex items-center justify-between mt-4 h-4">
              <el-skeleton-item variant="text" class="mr-4" />
              <el-skeleton-item variant="text" class="w-1/3" />
            </div>
          </div>
        </template>
        <template #default>
          <animate-list tag="ul">
            <li :data-index="index" v-for="(article, index) in articles" :key="article.id">{{ article.title }}</li>
          </animate-list>
        </template>
      </el-skeleton>

    </div>
  </div>
</template>

<script setup lang="ts">
import articleApi from '@/apis/articleApi'
const articles = ref()
const loading = ref(true)
onMounted(async () => {
  articles.value = await articleApi.article().then((res) => {
    return new Promise((r) => {
      setTimeout(() => {
        loading.value = false
        return r(res.result)
      }, 4000)
    })
  })
})
</script>

<style scoped lang="scss">
.article {
  padding: 30px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  // background: #34495e;

  ul {
    position: relative;

    li {
      padding: 10px;
      margin-bottom: 20px;
      background: rgb(86, 204, 222);
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
