<template>
  <div class="musicbg">
    <img src="/img/maplestory_logo.jpg" />
    <div class="music-container" :class="{ play }" id="music-container">
      <div class="music-info">
        <h4 id="title">{{ title.split('/', 2)[1] }}</h4>
        <div class="progress-container" id="progress-container" @click="setProgress">
          <div class="progress" id="progress"></div>
        </div>
        <div class="song-time">
          <span>{{ nowSec }}</span>
          <span>{{ totalSec }}</span>
        </div>
      </div>

      <audio :src="music" id="audio" @timeupdate="updateProgress" @ended="nextSong"></audio>

      <div class="img-container">
        <img src="/img/maplestory.png" alt="music-cover" />
        <button id="play" class="action-btn btn">
          <icon-play-one theme="outline" v-if="!play" @click="playSong" />
          <icon-pause theme="outline" v-else @click="pauseSong" />
        </button>
      </div>

      <div class="navigation">
        <section id="prev" class="action-btn btn" @click="prevSong">
          <icon-go-start theme="outline" />
        </section>

        <button id="next" class="action-btn btn" @click="nextSong">
          <icon-go-end theme="outline" />
        </button>

        <button id="list" class="other-btn list-btn btn" @click="openList = !openList">
          <icon-mindmap-list theme="outline" />
        </button>
        <button id="random" class="other-btn list-btn btn">
          <icon-shuffle-one theme="outline" v-if="random" @click="randomSongs" />
          <icon-play-cycle theme="outline" v-else @click="randomSongs" />
        </button>
      </div>
      <ul class="song-list" :class="{ open: openList }">
        <li
          v-for="(item, index) in songsList"
          :key="item"
          @click="playList(item)"
          class="btn"
          :class="{ play: item == title }">
          {{ index + 1 + ' . ' + item.split('/', 2)[1] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { songs } from '@/views/Music/music'
import _ from 'lodash'
const title = ref('')
const music = ref('')
const play = ref(false)
const openList = ref(false)
const random = ref(false)

const nowSec = ref('00:00')
const totalSec = ref('00:00')

const songIndex = ref(0)

const rdSongs = ref(songs)

// 隨機排序歌曲
const randomSongs = () => {
  if (!random.value) {
    rdSongs.value = _.shuffle(songs)
  } else {
    rdSongs.value = songs
  }
  random.value = !random.value
  songIndex.value = rdSongs.value.indexOf(title.value)
}
const songsList = computed(() => {
  return rdSongs.value
})

// Update song details
const loadSong = (song: string) => {
  title.value = song
  music.value = `https://dl.getdropbox.com/s/${song}.mp3`
}

// Initially load song details into DOM
loadSong(songsList.value[songIndex.value])

// Play song
const playSong = () => {
  ;(document.querySelector('#audio') as HTMLVideoElement).play()
  play.value = true
}
const pauseSong = () => {
  ;(document.querySelector('#audio') as HTMLVideoElement).pause()
  play.value = false
}

const prevSong = () => {
  songIndex.value--
  if (songIndex.value < 0) {
    songIndex.value = songs.length - 1
  }
  loadSong(songsList.value[songIndex.value])
  playSong()
}

const nextSong = () => {
  songIndex.value++
  if (songIndex.value > songs.length - 1) {
    songIndex.value = 0
  }
  loadSong(songsList.value[songIndex.value])
  playSong()
}

const playList = async (song: string) => {
  loadSong(song)
  songIndex.value = rdSongs.value.indexOf(title.value)
  playSong()
}

const updateProgress = (e: any) => {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  let progress = <HTMLDivElement>document.querySelector('#progress')
  progress.style.width = `${progressPercent}%`

  var sec
  var sec_d

  let min = currentTime == null ? 0 : Math.floor(currentTime / 60)
  min = min < 10 ? 0 + min : min

  function get_sec(x: number) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i
          sec = sec < 10 ? '0' + sec : sec
        }
      }
    } else {
      sec = Math.floor(x)
      sec = sec < 10 ? '0' + sec : sec
    }
  }
  get_sec(currentTime)
  nowSec.value = min + ':' + sec

  let min_d = isNaN(duration) === true ? '0' : Math.floor(duration / 60)
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
      sec_d = isNaN(duration) === true ? '0' : Math.floor(x)
      sec_d = sec_d < 10 ? '0' + sec_d : sec_d
    }
  }

  get_sec_d(duration)
  totalSec.value = min_d + ':' + sec_d
}
const setProgress = (e: any) => {
  const width = document.querySelector('#progress-container')?.clientWidth!
  const clickX = e.offsetX
  let audioDiv = <HTMLAudioElement>document.querySelector('#audio')
  const duration = audioDiv.duration
  audioDiv.currentTime = (clickX / width) * duration
}
</script>

<style scoped lang="scss">
.musicbg {
  @apply bg-white h-full flex flex-col items-center justify-start m-0 pt-10;
  .music-container {
    @apply bg-white rounded-2xl flex px-7 py-5 relative mt-32 z-10;
    box-shadow: 0 20px 20px 0 rgba(252, 169, 169, 0.6);

    .music-info {
      @apply bg-[#ffffff80] absolute top-0 left-5 opacity-0 z-0;
      border-radius: 15px 15px 0 0;
      width: calc(100% - 40px);
      padding: 20px 20px 10px 20px;
      transform: translateY(0%);
      transition: transform 0.3s ease-in, opacity 0.3s ease-in;
      h4 {
        @apply m-0 text-base;
      }
      .progress-container {
        @apply bg-slate-200 rounded my-4 h-1 w-full;
        .progress {
          @apply bg-[#fe8daa] rounded h-full w-0;
          transition: width 0.1s linear;
        }
      }
      .song-time {
        @apply flex justify-between;
      }
    }
    &.play .music-info {
      opacity: 1;
      transform: translateY(-100%);
    }

    .img-container {
      @apply absolute flex justify-center items-center bottom-2 left-[20%] w-[110px] z-20;
      img {
        @apply object-cover h-[110px] w-[120px] relative bottom-0 left-0;
        animation: rotate 3s linear infinite;
        animation-play-state: paused;
      }
      #play {
        @apply text-[#c9c1c1] text-4xl p-0 m-0 absolute rounded-md bottom-5 opacity-0 z-[9];
        &:hover {
          @apply text-[#6fbba2] scale-125 opacity-100;
        }
      }
    }
    &.play .img-container img {
      animation-play-state: running;
    }

    .navigation {
      @apply flex justify-center items-center z-10;
      .action-btn {
        @apply bg-transparent border-0 text-hd-black1 rounded-md text-3xl p-2 duration-200;
        &:nth-child(1) {
          margin: 0 100px 0 0;
        }
        &:nth-child(2) {
          margin: 0 0 0 20px;
        }
        &:focus {
          outline: 0;
        }
        &:hover {
          @apply text-[#b8b66c] scale-125;
        }
      }
      .other-btn {
        @apply bg-transparent border-0 text-[#a89d9d] rounded-md text-lg p-2 mx-2 cursor-pointer duration-200;
        &.random-btn {
          @apply w-5 m-0;
        }
        &:hover {
          @apply text-[#7c7b51] scale-125;
        }
      }
    }

    .song-list {
      @apply list-none bg-white absolute top-10 left-2 h-0 px-7 overflow-auto translate-y-14;
      width: calc(100% - 20px);
      border-radius: 0 0 15px 15px;
      transition: height 0.3s ease-in, opacity 0.3s ease-in;
      &.open {
        @apply opacity-100 h-[300px];
      }
      li {
        @apply text-xl px-4 my-2 rounded-lg;
        border-bottom: 1px solid #686868;
        &:hover {
          @apply bg-[#ece9e95b];
        }
      }
      .play {
        background-color: #abaaac98 !important;
      }
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
