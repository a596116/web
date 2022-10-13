<template>
  <div class="vlog-cover">
    <div class="vlog-cover-action" @click="emit('close')">
      <icon-close class="btn cursor-pointer" theme="outline" size="28" fill="aliceblue" />
    </div>
    <img :src="`${src}.jpg`" class="vlog-cover-img" @click="emit('open')" />
  </div>
</template>

<script setup lang="ts">
const { src } = defineProps<{
  src: string
}>()
const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
}>()
</script>

<style>
.vlog-cover {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  inset: 0px;
}
.vlog-cover-action {
  position: absolute;
  text-align: center;
  top: 10px;
  right: 0;
}
.vlog-cover-img {
}
</style>
