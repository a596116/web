<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <suspense>
    <router-view></router-view>
  </suspense>
</template>

<style>
@import '@/assets/base.css';
</style>
