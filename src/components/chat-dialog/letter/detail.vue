<template>
  <div class="letter-cover-wapper">
    <LetterCover :flap="status === 'opening'" :openTip="openTip"></LetterCover>
  </div>
  <div
    class="letter-cover-wapper"
    style="position: relative; z-index: 2200"
    v-if="status === 'opened'">
    <LetterContent
      @close="emit('close')"
      :title="title"
      :paragraphs="paragraphs"
      :speed="speed"></LetterContent>
  </div>
</template>

<script setup lang="ts">
import LetterCover from './cover.vue'
import LetterContent from './content.vue'
import axios from 'axios'
const { src } = defineProps<{
  src?: any
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const openTip = ref('')
const title = ref('1')
const paragraphs = ref(['1'])
const speed = ref(120)
const status = ref('cover')

onMounted(() => {
  setTimeout(() => {
    status.value = 'opening'
    setTimeout(() => {
      status.value = 'opened'
    }, 2500)
  }, 1000)
  axios.get(src, {}).then((r: any) => {
    openTip.value = r.data.openTip
    paragraphs.value = r.data.paragraphs
    title.value = r.data.title
    speed.value = r.data.speed
  })
})
</script>

<style scoped lang="scss">
.letter-cover-wapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d46466;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0px;
  z-index: 2000;
}
</style>
