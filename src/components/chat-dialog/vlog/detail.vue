<template>
  <div class="vlog-cover-wapper">
    <div class="vlog-action">
      <icon-close theme="outline" size="20" fill="aliceblue" @click="emit('close')" />
    </div>
    <video
      id="vlogPlayer"
      ref="vlogPlayer"
      class="vlog-player"
      autoplay="true"
      playsinline="true"
      webkit-playsinline="true"
      x-webkit-airplay="allow"
      airplay="allow"
      loop="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portrait"
      :src="src"></video>
  </div>
</template>

<script setup lang="ts">
const { src } = defineProps<{
  src?: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const vlogPlayer = ref()
onMounted(() => {
  vlogPlayer.value.play()
})
</script>

<style lang="scss">
.vlog-cover-wapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d46466;
  display: flex;
  justify-items: center;
  align-items: center;
  inset: 0px;
  z-index: 2000;
}
.vlog-player {
  object-fit: fill;
  width: 100%;
  z-index: 0;
  position: fixed;
}
.vlog-action {
  position: absolute;
  top: 10px;
  right: 20px;
  color: white;
  z-index: 9999;
}
</style>
