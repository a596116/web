<template>
  <div class="animate-list">
    <TransitionGroup :tag="props.tag" appear name="article" @before-enter="beforeEnter" @enter="enter">
      <slot />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import type { RendererElement } from 'vue'

export interface props {
  tag?: string
  duration?: number
  delay?: number
}
const props = withDefaults(defineProps<props>(), {
  tag: undefined,
  duration: 0.5,
  delay: 0.2,
})

const beforeEnter = (el: RendererElement) => {
  gsap.set(el, {
    opacity: 0,
  })
}

const enter = (el: RendererElement) => {
  gsap.to(el, {
    opacity: 1,
    duration: props.duration,
    delay: el.dataset.index * props.delay ?? 0,
  })
}
</script>

<style scoped lang="scss">
.animate-list {
  position: relative;
  .article-leave-active {
    transition: all 1s ease;
    position: absolute;
    width: 100%;
  }
  .article-leave-to {
    opacity: 0;
  }
  .article-move {
    transition: all 1s ease;
  }
}
</style>
