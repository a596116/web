<template>
  <div class="">
    <div class="article">
      <animate-list tag="ul">
        <li :data-index="index" v-for="(article, index) in articles" :key="article.id">{{ article.title }}</li>
      </animate-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import articleApi from '@/apis/articleApi'
const articles = ref()
articleApi.article().then((res) => {
  articles.value = res.result
})
</script>

<style scoped lang="scss">
.article {
  padding: 30px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  background: #34495e;

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
