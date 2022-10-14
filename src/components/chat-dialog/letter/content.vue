<template>
  <div class="letter-content animate__animated animate__fadeInUp">
    <div class="letter-title" ref="lettertitle"></div>

    <div class="letter-detail">
      <div
        v-for="({ type, content, loading, ref }, i) in contents"
        :key="i"
        :ref="`letter-detail-item-${i}`">
        <icon-loading v-if="loading" fill="#f44336" type="cube" />
        <div v-show="!loading">
          <p
            v-if="type === 'text'"
            :ref="
              (el) => {
                divs[i] = el
              }
            "></p>
          <div v-else style="text-align: center">
            <span
              :ref="
                (el) => {
                  divs[i] = el
                }
              "
              v-html="content"></span>
          </div>
        </div>
      </div>
      <div
        class="finish-action flex justify-center items-center"
        v-show="finish"
        @click="emit('close')">
        <icon-arrow-left theme="outline" />
        <text>回到聊天页</text>
      </div>
    </div>
    <div class="letter-action">
      <icon-close theme="outline" size="20" fill="aliceblue" @click="emit('close')" />
    </div>
    <a href="#">
      <icon-to-top
        class="duration-300 z-[2000] text-2xl float-right"
        theme="outline"
        fill="#000000" />
    </a>
  </div>
</template>

<script setup lang="ts">
import Typed from 'typed.js'

const { title, paragraphs, speed } = defineProps<{
  title: string
  paragraphs: Array<string>
  speed: number
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

onMounted(() => {
  initContent()
})

const contents = ref<any>([])
const finish = ref(false)

const append = (ele: any, content: any) => {
  return new Promise((resolve) => {
    const typed = new Typed(ele, {
      strings: ['', content],
      typeSpeed: speed,
      backSpeed: speed,
      showCursor: false,
      onComplete: () => {
        typed.stop()
        setTimeout(() => resolve(1), 500)
      },
    })
  })
}

const lettertitle = ref()
const divs = ref<any>([])
const initContent = () => {
  let paragraphChain: Promise<any> = Promise.resolve()
  paragraphChain = paragraphChain.then(() => append(lettertitle.value, title))
  paragraphs?.forEach((paragraph: string, i: number) => {
    paragraphChain = paragraphChain.then(() => {
      return new Promise((resolve) => {
        const isImg = /<img[^>]+>/.test(paragraph)
        if (isImg) {
          const imgContent = {
            type: 'img',
            loading: true,
            content: paragraph,
            ref: `paragraph-img-${i}`,
            dom: '',
          }
          contents.value.push(imgContent)
          setTimeout(() => {
            imgContent.loading = false
            nextTick(() => {
              imgContent.dom = divs.value[i]
              resolve(Promise.resolve())
              autoScroll()
            })
          }, 1200)
        } else {
          const textContent = {
            type: 'text',
            content: paragraph,
            ref: `paragraph-text-${i}`,
            dom: '',
          }
          contents.value.push(textContent)
          nextTick(() => {
            textContent.dom = divs.value[i]
            append(textContent.dom, paragraph).then(() => {
              autoScroll()
              resolve(Promise.resolve())
            })
          })
        }
      })
    })
  })
  paragraphChain.then(() => (finish.value = true))
}

const autoScroll = () => {
  nextTick(() => {
    computeDistance().then((distance: any) => {
      const duration = 250
      const startTime = Date.now()
      // console.log('auto scroll', distance)
      const curScrollTop = document.body.scrollTop + document.documentElement.scrollTop
      requestAnimationFrame(function step() {
        const p = Math.min(1, (Date.now() - startTime) / duration)
        document.body.scrollTop = curScrollTop + distance * p
        document.documentElement.scrollTop = curScrollTop + distance * p
        p < 1 && requestAnimationFrame(step)
      })
    })
  })
}

const computeDistance = () => {
  return new Promise(async (resolve) => {
    const lastContentIndex = contents.value.length - 1
    if (lastContentIndex === paragraphs.length - 1) {
      // 最后一行不滚动
      resolve(0)
      return
    }
    const content = contents.value[lastContentIndex]
    const p = document.querySelectorAll('p')
    let h = 0
    if (content.type === 'img') {
      const imgDom = content.dom.children[0]
      const $img = document.querySelector<HTMLImageElement>('img:last-child')!
      setTimeout(() => {
        resolve($img.naturalHeight)
      }, 100)
    } else {
      resolve(content.dom.offsetHeight)
    }
  })
}
</script>

<style scoped lang="scss">
.letter-title {
  font-size: 1.25rem;
  margin: 15px 0;
  text-align: center;
}
.letter-content {
  width: 100%;
  line-height: 30px;
  margin: 0 auto;
  color: black;
  padding: 15px 32px 29px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.26);
  -moz-border-radius-bottomleft: 20px 500px;
  -moz-border-radius-bottomright: 500px 30px;
  -moz-border-radius-topright: 5px 100px;
  -webkit-border-bottom-left-radius: 20px 500px;
  -webkit-border-bottom-right-radius: 64px 10px;
  -webkit-border-top-right-radius: 5px 100px;
  border-bottom-left-radius: 20px 500px;
  border-bottom-right-radius: 64px 10px;
  border-top-right-radius: 5px 100px;
  -webkit-background-size: 100% 30px;
  -moz-box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 0 #f6ef97;
  position: relative;
  font-family: 'Architects Daughter', cursive !important;
}
.letter-detail {
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
  min-height: 1500vh;
  background: repeating-linear-gradient(to bottom, #f9f9f9, #f9f9f9 31px, #d46466 2px, #f9f9f9);
  background-size: 100% 32px;
}
.letter-ititle {
  font-size: 1.25rem !important;
}
.letter-detail p {
  position: relative;
  line-height: 1.8rem !important;
  text-indent: 2em;
  font-size: 1.2rem !important;
  letter-spacing: 0.8rem;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.letter-detail span {
  display: block;
  margin-block-start: 2rem;
  margin-block-end: 2rem;
}
@media only screen and (max-width: 600px) {
  .letter-content:after {
    left: 24px;
  }
  .letter-content::before {
    right: 24px;
  }
}
.letter-action {
  position: absolute;
  top: 10px;
  right: 20px;
  color: red;
}
.finish-action {
  float: right;
  margin-top: 30px;
  color: red;
  font-size: 1.2rem;
}
</style>
