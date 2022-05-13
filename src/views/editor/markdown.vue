<template>
  <div>
    <MarkdownEditor v-model="content" :height="300" placeholder="請輸入markdown內容" />
  </div>
</template>

<script setup lang="ts">
const content = ref('Test')
</script>
