<template>
  <div>
    <WangEditor v-model="content" folder="user" />
  </div>
</template>

<script setup lang="ts">
const content = ref('<p>浩呆</p>')
</script>
