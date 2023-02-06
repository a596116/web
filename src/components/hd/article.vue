<template>
  <h1 class="text-4xl">個人作品</h1>
  <div class="article">
    <section v-for="item of article" :key="item.title" class="md:w-[40%] w-[100%] m-4">
      <a
        class="relative block h-[170px] overflow-hidden rounded-xl border border-gray-100 p-6 shadow-xl transition-shadow hover:shadow-lg"
        :href="item.url"
        target="_blank">
        <span
          class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div class="mt-4 text-gray-500 sm:pr-8 flex">
          <img :src="item.icon" class="h-12 w-12 sm:h-10 sm:w-10" />

          <section class="px-4">
            <h3 class="text-xl font-bold text-gray-900">{{ item.title }}</h3>

            <p class="mt-2 text-sm">
              {{ item.content }}
            </p>
          </section>
        </div>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
const article = [
  {
    title: '後台管理系統',
    content: '使用Vue3、echarts、Element plus、axios、pinia、firebase串接後台API開發的後台系統。',
    icon: 'https://upload.cc/i1/2023/02/06/qCekmi.png',
    url: 'https://haodai-web.web.app/admin',
  },
  {
    title: '個人博客',
    content: 'VuePress搭建的博客網站，存放學習資料。',
    icon: 'https://upload.cc/i1/2023/02/06/KJ2nI7.png',
    url: 'https://wanghaodai.com/',
  },
  {
    title: '網頁音樂播放器',
    content: '使用JS原生方法製作的楓之谷音樂播放器。',
    icon: 'https://upload.cc/i1/2023/02/06/EscdA3.png',
    url: 'https://haodai-web.web.app/music',
  },
  {
    title: '畢業專題介紹',
    content:
      '靜宜大學-資料科學暨大數據分析與應用學系-深度學習在太陽光電模組的熱影像缺陷自動識別系統的介紹網頁。',
    icon: 'https://upload.cc/i1/2023/02/06/coOYWx.png',
    url: 'https://puds-12564.web.app/home',
  },
  {
    title: 'Nodejs後端',
    content: '使用Nestjs搭配Mongodb資料庫開發RESTful API。',
    icon: 'https://upload.cc/i1/2023/02/06/Yl4WTG.png',
    url: 'https://github.com/a596116/nestjs',
  },
]
</script>

<style scoped lang="scss">
.article {
  width: 80%;
  height: 100% !important;
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
