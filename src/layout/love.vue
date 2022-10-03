<template>
  <div class="love-container">
    <div class="love" v-for="item in 67" :style="{ '--d': item * -1 * 0.3 }">
      <div class="love-hor">
        <div class="love-ver">
          <div class="love-text">Love儒</div>
        </div>
      </div>
    </div>
    <div class="love-loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.love-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, #ff9a9e, #fad0c4);
  overflow: hidden;
  user-select: none;
  .love {
    position: absolute;
    margin: -400px 0 0 -500px;
    .love-hor {
      animation: hor 10s ease-in-out infinite alternate;
      animation-delay: calc(var(--d) * 1s);
      .love-ver {
        animation: ver 20s linear infinite;
        animation-delay: calc(var(--d) * 1s);
        .love-text {
          color: #fff;
          text-shadow: 0 0 10px #ebeb6d;
          letter-spacing: 2px;
          font-size: 22px;
          transform: translateY(-100%) rotateZ(-30deg);
        }
      }
    }
  }

  .love-loading {
    animation: rotate 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite;
    span {
      width: 100px;
      height: 100px;
      display: block;
      position: absolute;
      background-color: #ff8f92;
      border: 1px solid #ff8f92;
      border-radius: 100%;
      &:nth-child(1) {
        transform: translate(-28px, -28px);
        animation: animate1 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite;
      }
      &:nth-child(2) {
        transform: translate(28px, -28px);
        animation: animate2 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite;
      }
      &:nth-child(3) {
        position: relative;
        border-radius: 0;
        transform: scale(0.98) rotate(-45deg);
        animation: animate3 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite;
      }
    }
  }
}

@keyframes hor {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(500px);
  }
}

@keyframes ver {
  0% {
    transform: translateY(180px);
  }
  10% {
    transform: translateY(45px);
  }
  15% {
    transform: translateY(4.5px);
  }
  18% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(4.5px);
  }
  22% {
    transform: translateY(34px);
  }
  24% {
    transform: translateY(64px);
  }
  25% {
    transform: translateY(112.5px);
  }
  26% {
    transform: translateY(64px);
  }
  28% {
    transform: translateY(34px);
  }
  30% {
    transform: translateY(4.5px);
  }
  32% {
    transform: translateY(0px);
  }
  35% {
    transform: translateY(4.5px);
  }
  40% {
    transform: translateY(45px);
  }
  50% {
    transform: translateY(180px);
  }
  71% {
    transform: translateY(428px);
  }
  72% {
    transform: translateY(441px);
  }
  75% {
    transform: translateY(450px);
  }
  77% {
    transform: translateY(441px);
  }
  79% {
    transform: translateY(428px);
  }
  100% {
    transform: translateY(180px);
  }
}

@keyframes animate1 {
  60% {
    transform: scale(0.4);
  }
}
@keyframes animate2 {
  40% {
    transform: scale(0.4);
  }
}
@keyframes animate3 {
  50% {
    border-radius: 100%;
    transform: scale(0.5) rotate(-45deg);
  }
  100% {
    transform: scale(0.98) rotate(-45deg);
  }
}
@keyframes rotate {
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(720deg);
  }
}
</style>
