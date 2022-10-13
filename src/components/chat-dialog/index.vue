<template>
  <div id="mobile">
    <div id="mobile-head">
      <div id="mobile-head-title">{{ title }}</div>
    </div>
    <div id="mobile-body">
      <div id="mobile-body-bg"></div>
      <div id="mobile-body-content">
        <div id="mock-msg-row" class="msg-row">
          <div id="mock-msg" class="msg" v-html="latestMsgContent"></div>
        </div>
        <div
          class="msg-row"
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.author === 'author' ? 'msg-author' : 'msg-me'">
          <div
            class="msg"
            :style="
              msg.width &&
              msg.height && { width: msg.width - 26 + 'px', height: msg.height - 18 + 'px' }
            "
            :class="{
              'msg-bounce-in-left': msg.author === 'author',
              'msg-bounce-in-right': msg.author === 'me',
              animate_breathe: index === messages.length - 1 && status === 'componentClose',
            }"
            @click="emit('msg-click', msg)">
            <span v-if="msg.type === 'text'" v-html="msg.content"></span>
            <ChatDialogVlogCover
              v-else-if="msg.type === 'vlog'"
              v-bind="msg.props"
              @open="handleComponentOpen(msg)"
              @close="handleComponentClose" />
            <ChatDialogLetterCover
              v-else-if="msg.type === 'letter'"
              v-bind="msg.props"
              @open="handleComponentOpen(msg)"
              @close="handleComponentClose" />
            <component
              v-else
              :is="msg.type"
              v-bind="msg.props"
              @open="handleComponentOpen(msg)"
              @close="handleComponentClose"></component>
          </div>
        </div>
      </div>
    </div>
    <div id="mobile-foot">
      <el-row :gutter="10" style="height: 100%">
        <el-col :span="20">
          <div id="input-hint" class="say-something">
            <div style="background: white; width: 100%; height: 32px; line-height: 32px">
              <span
                v-show="status === 'systemInput'"
                style="color: black"
                class="system-input-element"></span>
              <el-input
                ref="userMsgInputRef"
                v-show="status === 'userInput'"
                class="animate_breathe"
                :hint="false"
                :line="false"
                v-model="inputMessage"
                @keyup.enter="sendUserMsg" />
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="padding: 0">
          <el-button
            ref="sendMsgBtnRef"
            type="success"
            size="small"
            :disabled="sendBtnDisabled"
            @click="sendUserMsg"
            >发送</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
  <MessageDetail
    v-if="currentOpenComponent"
    :type="currentOpenComponent.type"
    :options="currentOpenComponent.props"
    @close="handleComponentClose">
  </MessageDetail>
</template>

<script setup lang="ts">
import MessageDetail from './MessageDetail.vue'
import Typed from 'typed.js'
import './css/main.scss'
const AUTHOR = {
  AUTHOR: 'author',
  ME: 'me',
}
const TRIGGER_NEXT_ACTION_TYPE = {
  USER_INPUT: 'userInput',
  COMPONENT_CLOSE: 'componentClose',
}
const { title, options } = defineProps<{
  title: string
  options: Array<any>
}>()
const emit = defineEmits<{
  (e: 'msg-click', d: any): void
}>()

//data
// 已经展示的消息
const messages = ref<any>([])
// 消息链条
const msgChain = ref(Promise.resolve())
// 输入消息
const inputMessage = ref<string>('')
// 用户交互触发器
const nextActionTrigger = ref<any>({})
// 当前状态 等待用户交互
const status = ref('systemInput')
// 当前打开的组件
const currentOpenComponent = ref<any>({})
const isTyping = ref(false)
const latestMsgContent = ref(null)

const sendBtnDisabled = computed(() => {
  if (status.value === 'systemInput') {
    return true
  }
  if (inputMessage.value && inputMessage.value.trim().length > 0) {
    return false
  }
  return true
})
onMounted(() => {
  buildMsgChain(options)
})
watch(options, () => {
  buildMsgChain(options)
})
watch(
  status,
  (newVal, oldVal) => {
    if (newVal === TRIGGER_NEXT_ACTION_TYPE.USER_INPUT) {
      setUserInputFoucus()
    }
  },
  { immediate: true },
)

const buildMsgChain = (messages: any) => {
  messages.forEach(({ msgs, msgInputSpeed, author, triggerNextAction }: any) => {
    msgChain.value = msgChain.value.then(() =>
      sendSysMsg(msgs, msgInputSpeed, author, triggerNextAction),
    )
  })
}

const sendSysMsg = (
  messages: any,
  inputSpeed = 150,
  author = AUTHOR.AUTHOR,
  triggerNextAction = null,
) => {
  return new Promise((resolve): void => {
    sendSysMsgInner(messages, inputSpeed, author).then(() => {
      if (triggerNextAction) {
        // 需要行为触发下一个消息活动
        const trigger = () => delay(500).then(() => resolve(1))
        nextActionTrigger.value = {
          inputSpeed,
          triggerNextAction,
          trigger,
        }
        // console.log('set trigger', nextActionTrigger.value)
        const { type, options } = triggerNextAction
        status.value = type
      } else {
        resolve(2)
      }
    })
  })
}

const sendSysMsgInner = (messages: any, inputSpeed: any, author: any) => {
  return new Promise((resolve) => {
    const message = Array.isArray(messages) ? messages[messages.length - 1] : messages
    const messageType = getMsgType(message)
    status.value = 'systemInput'
    if (messageType === 'text') {
      let strings = ['']
      Array.isArray(messages) ? (strings = strings.concat(messages)) : strings.push(messages)
      // pushMsg(message, author || AUTHOR.AUTHOR, messageType)
      // setTimeout(() => {
      //   resolve(1)
      // }, 1500)
      const typed = new Typed('.system-input-element', {
        strings: strings,
        typeSpeed: inputSpeed,
        backSpeed: inputSpeed,
        onComplete: () => {
          typed.destroy()
          pushMsg(message, author || AUTHOR.AUTHOR, messageType)
          delay(500).then(() => resolve(3))
        },
      })
    } else {
      pushMsg(message, AUTHOR.AUTHOR, messageType)
      delay(500).then(() => resolve(4))
    }
  })
}

const sendUserMsg = () => {
  const message = inputMessage.value
  inputMessage.value = ''
  pushMsg(message, AUTHOR.ME, 'text')

  if (!nextActionTrigger.value) {
    return
  }
  const { triggerNextAction, inputSpeed, tryCnt = 0 } = nextActionTrigger.value
  const { type, options } = triggerNextAction
  const { resolveKeyTexts, rejectKeyTexts, rejectHitTexts } = options

  if (type === TRIGGER_NEXT_ACTION_TYPE.USER_INPUT) {
    if (rejectNextMsg(message, resolveKeyTexts, rejectKeyTexts)) {
      const rejectDisabled = tryCnt >= rejectHitTexts.length - 1
      const rejectText = rejectHitTexts[Math.min(tryCnt, rejectHitTexts.length - 1)]
      let rejectSysMsgChain = Promise.resolve()
      if (Array.isArray(rejectText)) {
        // 多条回复
        rejectText.forEach((text) => {
          rejectSysMsgChain = rejectSysMsgChain.then(() => sendSysMsg(text, inputSpeed))
        })
      } else {
        // 单条回复
        rejectSysMsgChain = sendSysMsg(rejectText, inputSpeed)
      }
      rejectSysMsgChain.then(() => {
        if (rejectDisabled) {
          handleTriggerNextAction()
        } else {
          status.value = TRIGGER_NEXT_ACTION_TYPE.USER_INPUT
        }
      })
      nextActionTrigger.value.tryCnt = tryCnt + 1
    } else {
      handleTriggerNextAction()
    }
  }
}

const handleComponentOpen = ({ type, props }: any) => {
  currentOpenComponent.value = { type, props }
  // console.log(type, props)
}

const handleComponentClose = () => {
  currentOpenComponent.value = null
  if (!nextActionTrigger.value) {
    return
  }
  const triggerObj = nextActionTrigger.value
  const { triggerNextAction } = triggerObj
  const { type, options } = triggerNextAction
  if (type === TRIGGER_NEXT_ACTION_TYPE.COMPONENT_CLOSE) {
    handleTriggerNextAction()
  }
}

const handleTriggerNextAction = () => {
  if (!nextActionTrigger.value) {
    return
  }
  const triggerObj = nextActionTrigger.value
  const { trigger } = triggerObj
  trigger()
  nextActionTrigger.value = null
  // console.log('remove trigger', nextActionTrigger.value)
}

const userMsgInputRef = ref()
const setUserInputFoucus = () => {
  const iosSpecialProcess = () => {
    try {
      const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        userMsgInputRef.value.scrollIntoView(true)
      }
    } catch (ignore) {}
  }
  setTimeout(() => {
    nextTick(() => {
      iosSpecialProcess()
      userMsgInputRef.value.focus()
    })
  }, 1000)
}

const rejectNextMsg = (message: string, resolveKeyTexts = [], rejectKeyTexts = []) => {
  if (rejectKeyTexts.some((rejectText) => message.indexOf(rejectText) > -1)) {
    return true
  }
  if (resolveKeyTexts.some((resolveKey) => message.indexOf(resolveKey) > -1)) {
    return false
  }
  return true
}

const pushMsg = (message: string, author: string, type = 'text') => {
  messages.value.push({
    author: author,
    content: message,
    type,
    props: getProps(message, type),
  })
  onMessageSending()
}

const getProps = (message: string, type: any) => {
  const props: any = {}
  if (type === 'text') {
    return props
  }
  const domParse = new DOMParser()
  const messageDoc = domParse.parseFromString(message, 'text/html')
  const messageDoms = messageDoc.getElementsByTagName(type)
  if (messageDoms.length === 1) {
    const messageDom = messageDoms[0]
    const attrs = messageDom.getAttributeNames()
    attrs.forEach((attrName: string) => (props[attrName] = messageDom.getAttribute(attrName)))
  }
  return props
}

const getMsgType = (message: any) => {
  const isImg = /<img[^>]+>/.test(message)
  const isLetter = /<letter[^>]+>/.test(message)
  const isVlog = /<vlog[^>]+>/.test(message)
  if (isImg) return 'img'
  if (isLetter) return 'letter'
  if (isVlog) return 'vlog'
  return 'text'
}

const markMsgSize = (msg: any, content = null) => {
  latestMsgContent.value = content || msg.content
  return (
    delay(0)
      // .then(() => msg.type === 'img' && onImageLoad($('#mock-msg img')))
      .then(() => msg.type === 'img')
      .then(() => {
        Object.assign(msg, getMockMsgSize())
        messages.value = [...messages.value]
      })
  )
}

/**
 * UI updating when new message is sending
 */
const onMessageSending = () => {
  setTimeout(() => {
    // update scroll position when vue has updated ui
    updateScroll()

    const latestMsg = document.querySelector<HTMLElement>(
      '#mobile-body-content .msg-row:last-child .msg',
    )!
    // add target="_blank" for links
    latestMsg.setAttribute('target', '_blank')

    // update scroll position when images are loaded
    // onImageLoad(latestMsg).then(updateScroll)
  })
}

const updateScroll = () => {
  const $chatbox = document.querySelector<HTMLDivElement>('#mobile-body-content')!
  const distance = $chatbox.scrollHeight - $chatbox.offsetHeight - $chatbox.scrollTop
  const duration = 250
  const startTime = Date.now()

  requestAnimationFrame(function step() {
    const p = Math.min(1, (Date.now() - startTime) / duration)
    $chatbox.scrollBy({ top: $chatbox.scrollTop + distance * p })
    p < 1 && requestAnimationFrame(step)
  })
}

const delay = (amount = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, amount)
  })
}

const getMockMsgSize = () => {
  const $mockMsg = document.querySelector<HTMLElement>('#mock-msg')!
  return {
    width: $mockMsg.style.width,
    height: $mockMsg.style.height,
  }
}

const onImageLoad = ($img: any) => {
  return new Promise((resolve) => {
    $img.addEventListener('load', resolve)
    // $img.one('load', resolve).each((index: any, target: any) => {
    //   // trigger load when the image is cached
    //   target.complete && document.querySelector(target).trigger('load')
    // })
  })
}
</script>

<style>
.animate_breathe {
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-name: breathe;
  -webkit-animation-duration: 1500ms;
  animation-delay: 500ms;
  -webkit-animation-delay: 500ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
}
@-webkit-keyframes breathe {
  0% {
    opacity: 0.4;
    box-shadow: 0 1px 1px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1) inset;
  }

  100% {
    opacity: 1;
    box-shadow: 0 1px 15px #0093df, 0 1px 10px #0093df inset;
  }
}
</style>
