<template>
  <div class="bg">
    <div class="stars"></div>
    <BirthdayCake />
    <div class="name" style="z-index: 100">{{ user || '浩呆' }}</div>
    <div class="happy" style="z-index: 100">
      <img src="/img/birthday/HappyBirthday.png" />
    </div>
    <BirthdayBallons />
    <BirthdayBox class="birthday-box" />
  </div>
</template>

<script setup lang="ts">
const user = useRoute().params.id

const ok = () => {
  const name = document.querySelector<HTMLElement>('.name')!
  const happy = document.querySelector<HTMLElement>('.happy')!
  const box = document.querySelector<HTMLElement>('.birthday-box')!
  name.classList.toggle('on')
  happy.classList.toggle('on')
  box.classList.toggle('on')
}
const starBg = () => {
  const stars = 800 /*星星的密集程度，数字越大越多*/
  const $stars = document.querySelector<HTMLElement>('.stars')!
  const r = 800 /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
  for (var i = 0; i < stars; i++) {
    var str = document.createElement('div')
    str.setAttribute('class', 'star')
    $stars.appendChild(str)
  }
  document.querySelectorAll<HTMLElement>('.star')!.forEach((d) => {
    const s = 0.2 + Math.random() * 1
    const curR = r + Math.random() * 300
    d.style.transformOrigin = `0 0 ${curR}px`
    d.style.transform = `translate3d(0,0,-${curR}px) rotateY(${Math.random() * 360}deg) rotateX(${
      Math.random() * -50
    }deg) scale(${s},${s})`
    d.style.width = '2px'
    d.style.height = '2px'
    d.style.backgroundColor = '#F7F7B6'
    d.style.position = 'absolute'
    d.style.top = '0'
    d.style.left = '0'
    d.style.backfaceVisibility = 'hidden'
    d.style.zIndex = '99999999'
  })
}
let timer: NodeJS.Timeout
onMounted(() => {
  timer = setTimeout(() => {
    ok()
  }, 6000)
  // clearTimeout(timer)
  starBg()
})
</script>

<style scoped lang="scss">
.bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(to bottom right, #e9b9bf 0%, #e2939d 100%);
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
}

.name {
  font-weight: bold;
  position: absolute;
  text-align: center;
  overflow: hidden;
  font-family: 'Great Vibes', cursive;
  width: 100%;
  opacity: 0;
  font-size: 36px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  &.on {
    top: 25%;
    opacity: 1;
  }
}
.happy {
  position: absolute;
  opacity: 0;
  overflow: hidden;
  left: 50%;
  top: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  transition: all 0.3s ease-in-out;
  animation-delay: 0s;
  img {
    width: 350px;
  }
  &.on {
    top: 10%;
    opacity: 1;
  }
}
.birthday-box {
  bottom: -400px;
  opacity: 0;
  transition: all 0.4s ease-in-out;
  &.on {
    bottom: 10%;
    opacity: 1;
  }
}

// star
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
}
</style>
