<template>
  <div class="song-cover-lyric">
    <div class="disc-continer">
      <div class="poster" ref="rotate">
        <el-image :src="props.modelValue.cover" class="w-full h-full" :lazy="true"></el-image>
      </div>
      <div class="song-name">{{ props.modelValue.name }}</div>
      <div class="song-artistsName">{{ props.modelValue.artistsName }}</div>
    </div>

    <div class="list-box">
      <div
        class="list"
        :class="{ play: props.modelValue.id == index && props.playStatus }"
        v-for="(item, index) in props.songList"
        :key="item.id"
        @click="PlayThisMusic(index)">
        <div class="song-index">{{ index + 1 }}</div>
        <div class="song-name">{{ item.name }}</div>
        <el-image class="cover" :src="item.cover" :lazy="true"></el-image>
        <div class="play-icon">
          <el-image
            class="wava"
            v-show="props.modelValue.id == index && props.playStatus"
            src="/img/music/wave.gif"
            :lazy="true"></el-image>
        </div>
        <div class="arties">{{ item.artistsName }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: any
  playStatus: boolean
  songList: any
}>()

const emit = defineEmits<{
  (e: 'PlayThisMusic', d: any): void
}>()

const PlayThisMusic = (index: number) => {
  emit('PlayThisMusic', props.songList[index])
}
</script>

<style lang="scss" scoped>
.song-cover-lyric {
  @apply flex flex-wrap md:flex-nowrap content-start;
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 72px;
  box-sizing: border-box;
  overflow: hidden;
  // background: url('/img/maplestory/maplestory_bg.png');
  background: transparent;

  .disc-continer {
    @apply flex justify-center items-center flex-col h-[30%] md:h-full w-full md:w-[60%];
    position: relative;

    .poster {
      @apply h-full md:h-[280px];
      position: relative;
      max-width: 380px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.3);
      // left: 50%;
      // top: 80px;
      // margin-left: -140px;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);
      animation: animations1 12s linear infinite forwards;
      animation-play-state: paused;
      overflow: hidden;
      // margin-bottom: 120px;
    }

    .song-name {
      @apply text-xl md:text-3xl mt-1 md:mt-6;
      width: 100%;
      height: 40px;
      text-align: center;
      font-weight: 600;
      color: #fff;
      line-height: 40px;
    }

    .song-artistsName {
      @apply text-xl md:text-2xl mt-1 md:mt-6;
      width: 100%;
      height: 40px;
      text-align: center;
      font-weight: 600;
      color: #fff;
      line-height: 40px;
    }

    @keyframes animations1 {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }

  .list-box {
    @apply w-full md:w-[40%] p-5 m-0 md:m-6 h-[calc(70%-72px)] md:h-[calc(100%-80px)];
    overflow: auto;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.423);
    color: rgb(205, 205, 205);
    overflow-y: overlay;

    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }
    &:hover::-webkit-scrollbar {
      width: 12px;
      border-radius: 10px;
    }

    &:hover::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: rgb(133, 129, 129);
    }

    .list {
      width: 100%;
      padding: 4px 0px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      margin-bottom: 2px;
      cursor: pointer;
      &:hover,
      &.play {
        background-color: rgba(155, 154, 154, 0.7);
      }
      .song-index {
        width: 10%;
      }
      .song-name {
        width: calc(90% - 36px);
      }
      .play-icon {
        width: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        .wave {
          width: 32px;
          height: 32px;
          display: block;
        }
      }
      .cover {
        width: 36px;
        height: 36px;
        display: block;
        border-radius: 3px;
      }
      .arties {
        width: 20%;
      }
    }
  }
}
</style>
