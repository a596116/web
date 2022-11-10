<template>
  <div class="music-container">
    <audio :src="state.songInfo.url" id="audio"></audio>
    <el-drawer
      v-model="state.openMenu"
      :show-close="false"
      :with-header="false"
      direction="btt"
      custom-class="music-drawer"
      size="94%">
      <div class="main-container">
        <div
          class="w-full text-4xl flex justify-center text-white pt-2 cursor-pointer"
          @click="state.openMenu = false">
          <icon-down theme="outline" />
        </div>
        <MusicPlaying
          v-show="state.openMenu"
          :songList="state.songList"
          :playStatus="state.playStatus"
          :model-value="state.songInfo"
          @PlayThisMusic="PlayThisMusic"></MusicPlaying>
      </div>
    </el-drawer>
    <div class="music-footer" @click="state.openMenu = !state.openMenu">
      <div class="song-cover hidden md:block">
        <img class="audioCover" :src="state.songInfo.cover" alt="" />
      </div>
      <div class="play-icon-container">
        <img class="play-icon" src="/img/music/arrow_01.png" alt="上一曲" @click.stop="prevSong" />
        <img
          v-show="!state.playing"
          @click.stop="playMusic"
          class="play-icon"
          src="/img/music/play_01.png"
          alt="播放" />
        <img
          v-show="state.playing"
          @click.stop="playMusic"
          class="play-icon"
          src="/img/music/play_02.png"
          alt="暂停" />
        <img class="play-icon" src="/img/music/arrow_02.png" alt="下一曲" @click.stop="nextSong" />
      </div>
      <div class="music-speed">
        <div class="name-time">
          <div>{{ state.songInfo.name }}</div>
          <div>{{ state.currentTime }}/{{ state.audioTime }}</div>
        </div>
        <div id="audio-bar">
          <el-slider
            v-model="state.thumbTranslateX"
            @click.stop=""
            :max="state.audioDuration"
            :format-tooltip="formatTime"
            @input="setProgress"></el-slider>
          <!-- <span
            class="mouse_time relative w-[52px] top-[-60px] hidden bg-gray-500 bg-opacity-70 rounded-md p-1"
            >{{ state.mouseTime }}</span -->
          >
        </div>
      </div>
      <div class="action-container">
        <div class="cursor-pointer text-lg mr-3">
          <icon-play-cycle
            theme="outline"
            v-if="state.playType === 1"
            @click.stop="state.playType = 2" />
          <icon-shuffle-one
            theme="outline"
            v-else-if="state.playType === 2"
            @click.stop="state.playType = 1" />
        </div>
        <div class="volume" @click.stop="">
          <el-slider v-model="state.volume"></el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import type { Ref } from 'vue'

const state = reactive({
  backgroundUrl: 'https://peiyinimg.qupeiyin.cn/1629950282884-288.jpg',
  playing: false,
  songList: [
    {
      cover: 'https://p2.music.126.net/pOR45DW9BfLSQ2JDJJeUgQ==/109951165714496390.jpg',
      name: '楓之谷主題曲（舊版）',
      url: 'https://dl.getdropbox.com/s/2wrpshxc2sll0cl/楓之谷主題曲（舊版）.mp3',
    },
  ],
  playType: 1, // 播放类型，单曲循环还是顺序播放
  playIndex: 0, // 当前播放哪一首
  thumbTranslateX: 0,
  currentTime: '0', // 当前播放进度
  songInfo: <any>{},
  audioTime: '00:00',
  audioDuration: 0,
  volume: 100,
  playStatus: false, // 搜索或者历史播放完成后关闭播放状态按钮
  mouseTime: '00:00',
  openMenu: false,
})

let track = ref(null)
const audio: Ref<HTMLAudioElement | null> = ref(null)
onMounted(async () => {
  state.songList = await axios.get(`/songs/songs.json`, {}).then((r) => r.data)
  audio.value = document.querySelector<HTMLAudioElement>('#audio')!
  let bar = document.querySelector<HTMLElement>('#audio-bar')!
  Init() // 初始化
})
const Init = () => {
  if (localStorage.getItem('historyList')) {
    state.songList = JSON.parse(localStorage.getItem('historyList')!)
  }
  GetSongInfo()
}
const GetSongInfo = () => {
  let myList = state.songList
  state.songInfo = myList[0]
  state.backgroundUrl = state.songInfo.cover
  audioInit()
}
const audioInit = () => {
  audio.value?.addEventListener('canplay', () => {
    state.audioTime = TimeToString(audio.value?.duration!)!
    state.audioDuration = audio.value?.duration!
  })
  audio.value?.addEventListener('timeupdate', () => {
    // 当前播放时间
    state.currentTime = TimeToString(audio.value?.currentTime!)!
  })
  audio.value?.addEventListener('ended', () => {
    songMode('next')
    state.songInfo = state.songList[state.playIndex]
    state.backgroundUrl = state.songInfo.cover
    state.playStatus = false
    setTimeout(() => {
      audio.value?.play()
    }, 100)
  })

  let mouseTimeBox = document.querySelector<HTMLElement>('.mouse_time')!
  // document.querySelector('#audio-bar')?.addEventListener(
  //   'mousemove',
  //   (e: any) => {
  //     const duration = audio.value?.duration!
  //     state.mouseTime = TimeToString((e.offsetX / e.clientX) * duration)
  //     mouseTimeBox.style.left = `${e.offsetX}px`
  //     mouseTimeBox.style.display = 'block'
  //     console.log(e.offsetX, e.clientX)
  //   },
  //   false,
  // )
  // document.querySelector('#audio-bar')?.addEventListener('mouseleave', () => {
  //   mouseTimeBox.style.display = 'none'
  // })
}
Init()

/**
 * 模式
 * @date 2022-11-07
 */
const songMode = (mode: string) => {
  switch (state.playType) {
    case 1: // 列表循環
      if (mode === 'next') {
        state.playIndex = state.playIndex + 1 >= state.songList.length ? 0 : state.playIndex + 1
      } else {
        state.playIndex = state.playIndex - 1 < 0 ? state.songList.length - 1 : state.playIndex - 1
      }
      break
    case 2: // 隨機播放
      state.playIndex = Math.floor(Math.random() * state.songList.length)
      break
    case 3: // 單曲循環
      break
  }
}

const PlayThisMusic = (data: any) => {
  state.playStatus = true
  localStorage.setItem('historyList', JSON.stringify(state.songList))
  state.songInfo = data
  audioInit()
  setTimeout(() => {
    state.playing = true
    audio.value?.play()
  }, 100)
}

/**
 * 時間轉換
 * @date 2022-11-07
 */
const TimeToString = (seconds: number) => {
  let min_d = isNaN(seconds) === true ? '0' : Math.floor(seconds / 60)
  let sec_d
  min_d = min_d < 10 ? '0' + min_d : min_d
  function get_sec_d(x: number) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i
          sec_d = sec_d < 10 ? '0' + sec_d : sec_d
        }
      }
    } else {
      sec_d = isNaN(seconds) === true ? '0' : Math.floor(x)
      sec_d = sec_d < 10 ? '0' + sec_d : sec_d
    }
  }
  get_sec_d(seconds)
  return `${min_d}:${sec_d}`
}

const playMusic = () => {
  if (state.playing) {
    // 播放中,点击则为暂停
    state.playing = false
    state.playStatus = true
    audio.value?.pause()
  } else {
    // 暂停中,点击则为播放
    state.playing = true
    state.playStatus = true
    audio.value?.play()
  }
}

/**
 * 下一首
 */
const nextSong = () => {
  songMode('next')
  state.songInfo = state.songList[state.playIndex]
  state.backgroundUrl = state.songInfo.cover
  state.thumbTranslateX = 0
  state.playing = true
  state.playStatus = true
  setTimeout(() => {
    audio.value?.play()
  }, 100)
}

/**
 * 上一首
 */
const prevSong = () => {
  songMode('prev')
  state.songInfo = state.songList[state.playIndex]
  state.backgroundUrl = state.songInfo.cover
  state.thumbTranslateX = 0
  state.playing = true
  state.playStatus = true
  setTimeout(() => {
    audio.value?.play()
  }, 100)
}

const setProgress = (e: any) => {
  let audioDiv = <HTMLAudioElement>document.querySelector('#audio')
  audioDiv.currentTime = (e / state.audioDuration) * state.audioDuration
}

const formatTime = (val: number) => {
  return TimeToString(val)
}

/**
 * 調整音量
 * @date 2022-11-07
 */
watch(
  () => state.volume,
  () => {
    let audioDiv = <HTMLAudioElement>document.querySelector('#audio')
    audioDiv.volume = state.volume / 100
  },
)
// const a = []
// const s = await axios.get(`/songs/songs.json`, {}).then((r) => r.data)
// s.forEach((i, index) => {
//   a.push({
//     id: index,
//     cover: i.cover,
//     name: i.name,
//     url: i.url,
//     artistsName: '楓之谷',
//   })
// })
// console.log(a)
</script>

<style scoped lang="scss">
:deep(.music-drawer) {
  background-color: hsla(0, 0%, 37%, 0.6) !important;
  backdrop-filter: blur(5px);
  border-radius: 20px 20px 0 0;
}
.music-container {
  @apply w-screen absolute bottom-0;

  .main-container {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    transition: all 0.5s ease-in-out;
    &.show {
      width: 1px;
    }
  }

  .music-footer {
    @apply w-full h-[72px] fixed bottom-0 flex justify-between box-border px-0 md:px-[24px];
    background-color: rgba(161, 161, 161, 0.4);
    z-index: 9999;
    box-shadow: -5px 0 20px rgb(83, 80, 80);
    .play-icon-container {
      width: 240px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      .play-icon {
        width: 42px;
        height: 42px;
        display: block;
        cursor: pointer;
      }
    }
    .song-cover {
      width: 80px;
      padding: 9px 16px 9px 10px;
      box-sizing: border-box;
      .audioCover {
        display: block;
        widows: 54px;
        height: 54px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .music-speed {
      @apply absolute md:relative h-6 md:h-full top-[-15px] md:top-0 w-full md:w-[calc(100%-520px)];
      .name-time {
        @apply hidden md:flex;
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: #fff;
        justify-content: space-between;
        font-size: 14px;
      }
      .process-container {
        width: 100%;
        height: 24px;
        margin-top: 12px;
        .process-bar {
          @apply relative;
          z-index: 10;
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 5px;
          cursor: pointer;
          .progress-box {
            height: 100%;
            background: #40ce8f;
            position: relative;
            border-radius: 5px;
            .play-point {
              transition: -webkit-transform 0.2s linear;
              transition: transform 0.2s linear;
              transition: transform 0.2s linear, -webkit-transform 0.2s linear;
              position: absolute;
              width: 18px;
              height: 18px;
              border-radius: 9px;
              top: -4px;
              cursor: pointer;
              user-select: none;
              img {
                user-select: none;
                display: block;
                position: absolute;
                top: -2px;
                width: 18px;
                height: 18px;
                background: #fff;
                border-radius: 9px;
                margin-left: -9px;
              }
            }
          }
        }
      }
    }
    .action-container {
      width: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      padding: 0 20px;
      box-sizing: border-box;
      .el-dropdown-link {
        color: #fff;
      }
      .volume {
        width: 100px;
      }
    }
  }
}
</style>
