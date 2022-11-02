<template>
  <div class="container">
    <div class="presents">
      <div class="present orange" @click="open">
        <div class="lid"></div>
        <div class="box"></div>
        <div class="bow"></div>
        <div class="ribbon"></div>
      </div>
      <div class="present blue" @click="open">
        <div class="lid"></div>
        <div class="box"></div>
        <div class="bow"></div>
        <div class="ribbon"></div>
      </div>
      <div class="present green" @click="open">
        <div class="lid"></div>
        <div class="box"></div>
        <div class="bow"></div>
        <div class="ribbon"></div>
      </div>
      <span class="text">請選擇一個禮物🎁</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/utils'
import { ElMessageBox } from 'element-plus'
import dataApi from '@/apis/dataApi'

const route = useRoute()

let gift = ref()

const getItemByChange = () => {
  const r = Math.random()
  let count = 0
  let item
  for (let i = 0; i < gift.value.length; i++) {
    let _ = gift.value[i]
    if (r >= count && r <= count + _.p) {
      item = _
      break
    } else {
      item = _
      count = count + _.p
    }
  }
  return item
}

const userGift = ref()

const openGift = async () => {
  try {
    return await ElMessageBox.alert(
      `<img src="${userGift.value}" alt="gift">`,
      '恭喜你中獎！ 請截圖至浩呆兌換禮物',
      {
        showCancelButton: false,
        showConfirmButton: false,
        draggable: true,
        center: true,
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
      },
    )
  } catch {}
}
const open = async () => {
  gift.value = await (await dataApi.birthdayList(1, { name: route.params.id })).data.rows[0].gift
  userGift.value = store.get('gift') ? store.get('gift') : getItemByChange()?.img!
  const check = store.get('gift')
  if (check && check.length) {
    await openGift()
  } else {
    await openGift()
    store.set('gift', userGift.value, 10)
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  z-index: 999;
  .text {
    position: absolute;
    text-align: center;
    bottom: 14px;
    padding: 4px 8px;
    color: white;
    background-color: #2c3a4977;
    border-radius: 15px;
    text-shadow: 1px 1px #2c3a49;
    font-size: 1.3em;
    z-index: 10;
  }
}

.presents {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: end;
  align-items: flex-end;
  height: 200px;
}

.green {
  position: relative;
  left: -20px;
  width: 100px;
  height: 100px;
  z-index: 1;
}
.green:hover {
  -webkit-animation: 0.5s green;
  animation: 0.5s green;
}
.green .lid {
  background: #3ddc81;
}
.green .box {
  background-image: radial-gradient(#fff 20%, transparent 20%),
    radial-gradient(#fff 20%, transparent 20%);
  background-color: #3ddc81;
}
.green .ribbon {
  background: #f75d4c;
}
.green .ribbon::before {
  top: 21%;
}
.green .bow {
  background: #f75d4c;
}
.green .bow::before,
.green .bow::after {
  background: #f75d4c;
}
@-webkit-keyframes green {
  0% {
    width: 100px;
    height: 100px;
  }
  30% {
    width: calc(100px + 10px);
    height: calc(100px - 10px);
  }
  60% {
    width: calc(100px - 10px);
    height: calc(100px + 10px);
  }
  100% {
    width: 100px;
    height: 100px;
  }
}
@keyframes green {
  0% {
    width: 100px;
    height: 100px;
  }
  30% {
    width: calc(100px + 10px);
    height: calc(100px - 10px);
  }
  60% {
    width: calc(100px - 10px);
    height: calc(100px + 10px);
  }
  100% {
    width: 100px;
    height: 100px;
  }
}
.orange {
  position: relative;
  left: 20px;
  width: 130px;
  height: 120px;
  z-index: 10;
}
.orange:hover {
  -webkit-animation: 0.5s orange;
  animation: 0.5s orange;
}
.orange .lid {
  background: #ffa726;
}
.orange .box {
  background-image: radial-gradient(#2c3a49 20%, transparent 20%),
    radial-gradient(#2c3a49 20%, transparent 20%);
  background-color: #ffa726;
}
.orange .ribbon {
  background: #f75d4c;
}
.orange .ribbon::before {
  top: 21%;
}
.orange .bow {
  background: #f75d4c;
}
.orange .bow::before,
.orange .bow::after {
  background: #f75d4c;
}
@-webkit-keyframes orange {
  0% {
    width: 130px;
    height: 120px;
  }
  30% {
    width: calc(130px + 10px);
    height: calc(120px - 10px);
  }
  60% {
    width: calc(130px - 10px);
    height: calc(120px + 10px);
  }
  100% {
    width: 130px;
    height: 120px;
  }
}
@keyframes orange {
  0% {
    width: 130px;
    height: 120px;
  }
  30% {
    width: calc(130px + 10px);
    height: calc(120px - 10px);
  }
  60% {
    width: calc(130px - 10px);
    height: calc(120px + 10px);
  }
  100% {
    width: 130px;
    height: 120px;
  }
}
.blue {
  position: relative;
  left: 0;
  width: 120px;
  height: 160px;
  z-index: 0;
}
.blue:hover {
  -webkit-animation: 0.5s blue;
  animation: 0.5s blue;
}
.blue .lid {
  background: #1bb5fe;
}
.blue .box {
  background-image: radial-gradient(transparent 20%, transparent 20%),
    radial-gradient(transparent 20%, transparent 20%);
  background-color: #1bb5fe;
}
.blue .ribbon {
  background: #3ddc81;
}
.blue .ribbon::before {
  top: 21%;
}
.blue .bow {
  background: #3ddc81;
}
.blue .bow::before,
.blue .bow::after {
  background: #3ddc81;
}
@-webkit-keyframes blue {
  0% {
    width: 120px;
    height: 160px;
  }
  30% {
    width: calc(120px + 10px);
    height: calc(160px - 10px);
  }
  60% {
    width: calc(120px - 10px);
    height: calc(160px + 10px);
  }
  100% {
    width: 120px;
    height: 160px;
  }
}
@keyframes blue {
  0% {
    width: 120px;
    height: 160px;
  }
  30% {
    width: calc(120px + 10px);
    height: calc(160px - 10px);
  }
  60% {
    width: calc(120px - 10px);
    height: calc(160px + 10px);
  }
  100% {
    width: 120px;
    height: 160px;
  }
}
.present {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
}
.present .lid {
  height: 20%;
  width: calc(100% + 10px);
  border: 4px solid #2c3a49;
  border-radius: 5px;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5), 5px 0 rgba(0, 0, 0, 0.15);
}
.present .box {
  width: 100%;
  height: 100%;
  background-position: 0 0, 20px 20px;
  background-size: 40px 40px;
  border: 4px solid #2c3a49;
  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: inset -10px 5px rgba(0, 0, 0, 0.3), 5px 0 rgba(0, 0, 0, 0.15);
}
.present .ribbon {
  position: absolute;
  top: -3px;
  width: 30px;
  height: calc(100% - 5px);
  border: 4px solid #2c3a49;
  border-radius: 5px;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5);
}
.present .ribbon::before {
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 5px;
  background: rgba(0, 0, 0, 0.3);
}
.present .bow {
  position: absolute;
  top: -20px;
  width: 20px;
  height: 20px;
  border: 4px solid #2c3a49;
  border-radius: 50%;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5), inset -2px -5px rgba(0, 0, 0, 0.3);
}
.present .bow::before,
.present .bow::after {
  display: block;
  content: '';
  position: absolute;
  top: -10px;
  width: 30px;
  height: 30px;
  border: 4px solid #2c3a49;
  border-radius: 50%;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5), inset -2px -5px rgba(0, 0, 0, 0.3);
  z-index: -1;
}
.present .bow::before {
  left: 15px;
}
.present .bow::after {
  right: 15px;
} /*����ǰ�����Ϊ��ʾ��,���ܶ��ο�����Դ��ֻ������: http://www.bootstrapmb.com/item/9296��(��˵��ֻ����ʾҳ����,�������ص�Դ���)*/
</style>
