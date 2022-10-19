<template>
  <div class="">
    <ChatDialog :options="chatOptions" :title="title" @msg-click="handleMsgClick" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const title = '浩呆'

const chat = useRoute().params.id || 'chat'
const chatOptions = ref(await axios.get(`/option/chat/${chat}.json`, {}).then((r) => r.data))
function handleMsgClick({ author, content, type }: any) {
  // console.log(author, content, type)
}
</script>
