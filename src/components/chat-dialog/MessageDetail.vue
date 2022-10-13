<template>
  <LetterDetail v-if="type === 'letter'" v-bind="options" @close="emit('close')"></LetterDetail>
  <VlogDetail v-if="type === 'vlog'" v-bind="options" @close="emit('close')"></VlogDetail>
</template>

<script setup lang="ts">
import LetterDetail from './letter/detail.vue'
import VlogDetail from './vlog/detail.vue'
const { type, options } = defineProps<{
  type?: string
  options?: Object
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style></style>
