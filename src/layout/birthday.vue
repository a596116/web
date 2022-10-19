<template>
  <div class="bg">
    <BirthdayCake />
    <div class="name" style="z-index: 100">{{ user || '浩呆' }}</div>
    <div class="happy" style="z-index: 100">
      <img src="/img/birthday/HappyBirthday.png" />
    </div>
    <BirthdayBallons />
  </div>
</template>

<script setup lang="ts">
const user = useRoute().params.id

const ok = () => {
  const name = document.querySelector<HTMLElement>('.name')!
  const happy = document.querySelector<HTMLElement>('.happy')!
  name.classList.toggle('on')
  happy.classList.add('on')
}
onMounted(() => {
  setTimeout(() => {
    ok()
  }, 6000)
})
</script>

<style scoped lang="scss">
.bg {
  //   @apply flex justify-center items-center;
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #e9b9bf 0%, #e2939d 100%);
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
</style>
