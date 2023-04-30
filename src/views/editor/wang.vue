<template>
  <div>
    <WangEditor v-model="content" folder="user" />
    <el-button type="primary" size="default" @click="show">輸出</el-button>
  </div>
</template>

<script setup lang="ts">
const content = ref('<p>浩呆</p>')
const show = () => {
  console.log(content.value)
}
</script>
