<template>
  <div class="absolute">
    <div class="balloons text-center balloons-rotate-behaviour-one" id="b1">
      <h2 style="color: #f2b300">H</h2>
    </div>
    <div class="balloons text-center balloons-rotate-behaviour-two" id="b2">
      <h2 style="color: #0719d4">B</h2>
    </div>
    <div class="balloons text-center balloons-rotate-behaviour-two" id="b3">
      <h2 style="color: #d14d39">D</h2>
    </div>
    <div class="balloons text-center balloons-rotate-behaviour-one" id="b4">
      <h2 style="color: #8fad00">X</h2>
    </div>
    <div class="balloons text-center balloons-rotate-behaviour-one" id="b5">
      <h2 style="color: #8377e4">O</h2>
    </div>
    <div class="balloons text-center balloons-rotate-behaviour-two" id="b6">
      <h2 style="color: #99c96a">L</h2>
    </div>
    <div class="balloons text-center balloons-rotate-behaviour-one" id="b7">
      <h2 style="color: #20cfb4">A</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const animate = (obj: any, css: any, interval: any, speedFactor: any, func: any) => {
  clearInterval(obj.timer)
  function getCss(obj: any, prop: any) {
    if (obj.currentStyle) return obj.currentStyle[prop] // ie
    else return document.defaultView!.getComputedStyle(obj, null)[prop] // 非ie
  }
  obj.timer = setInterval(function () {
    var flag = true
    for (var prop in css) {
      var cur = 0
      if (prop == 'opacity') cur = Math.round(parseFloat(getCss(obj, prop)) * 100)
      else cur = parseInt(getCss(obj, prop))
      var speed = (css[prop] - cur) * speedFactor
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
      if (cur != css[prop]) flag = false
      if (prop == 'opacity') {
        obj.style.filter = "alpha(opacity : '+(cur + speed)+' )"
        obj.style.opacity = (cur + speed) / 100
      } else obj.style[prop] = cur + speed + 'px'
    }
    if (flag) {
      clearInterval(obj.timer)
      if (func) func()
    }
  }, interval)
}
const loopOne = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b1')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopOne()
  })
}
const loopTwo = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b2')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopTwo()
  })
}
const loopThree = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b3')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopThree()
  })
}
const loopFour = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b4')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopFour()
  })
}
const loopFive = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b5')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopFive()
  })
}

const loopSix = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b6')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopSix()
  })
}
const loopSeven = () => {
  let randleft = 1000 * Math.random()
  let randtop = 500 * Math.random()
  let dom = document.querySelector<HTMLElement>('#b7')!
  animate(dom, { left: randleft, bottom: randtop }, 0, 0.5, function () {
    loopSeven()
  })
}

onMounted(() => {
  setInterval(() => {
    loopOne()
    loopTwo()
    loopThree()
    loopFour()
    loopFive()
    loopSix()
    loopSeven()
  }, 5000)
})
</script>

<style scoped lang="scss">
.balloons {
  position: fixed;
  bottom: -200px;
  opacity: 0.6;
  z-index: 99;
  width: 100px;
  height: 183px;
  background-repeat: no-repeat no-repeat;
  background-size: 100px 183px;
  transition: all 0.5s ease-in-out;
}
.balloons h2 {
  text-transform: uppercase;
  font-family: 'Signika', sans-serif;
  font-size: 50px;
  color: #bf4136;
  text-shadow: 5px 5px 5px #fff;
  display: none;
}
#b1,
#b11 {
  background-image: url('/img/birthday/b1.png');
}
#b2,
#b22 {
  background-image: url('/img/birthday/b2.png');
}
#b3,
#b33 {
  background-image: url('/img/birthday/b3.png');
}
#b4,
#b44 {
  background-image: url('/img/birthday/b4.png');
}
#b5,
#b55 {
  background-image: url('/img/birthday/b5.png');
}
#b6,
#b66 {
  background-image: url('/img/birthday/b6.png');
}
#b7,
#b77 {
  background-image: url('/img/birthday/b7.png');
}
.balloons-rotate-behaviour-one {
  -webkit-animation: balloons_rotate_one linear 10s infinite;
  -webkit-transform: rotate(30deg);
  -moz-animation: balloons_rotate_one linear 10s infinite;
  -moz-transform: rotate(30deg);
  -o-animation: balloons_rotate_one linear 10s infinite;
  -o-transform: rotate(30deg);
  -ms-animation: balloons_rotate_one linear 10s infinite;
  -ms-transform: rotate(30deg);
  animation: balloons_rotate_one linear 10s infinite;
  transform: rotate(30deg);
}
@-webkit-keyframes balloons_rotate_one {
  0% {
    -webkit-transform: rotate(30deg);
  }
  50% {
    -webkit-transform: rotate(-30deg);
  }
  100% {
    -webkit-transform: rotate(30deg);
  }
}
@-moz-keyframes balloons_rotate_one {
  0% {
    -moz-transform: rotate(30deg);
  }
  50% {
    -moz-transform: rotate(-30deg);
  }
  100% {
    -moz-transform: rotate(30deg);
  }
}
@-o-keyframes balloons_rotate_one {
  0% {
    -o-transform: rotate(30deg);
  }
  50% {
    -o-transform: rotate(-30deg);
  }
  100% {
    -o-transform: rotate(30deg);
  }
}
@-ms-keyframes balloons_rotate_one {
  0% {
    -ms-transform: rotate(30deg);
  }
  50% {
    -ms-transform: rotate(-30deg);
  }
  100% {
    -ms-transform: rotate(30deg);
  }
}
@keyframes balloons_rotate_one {
  0% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(30deg);
  }
}
.balloons-rotate-behaviour-two {
  -webkit-animation: balloons_rotate_two linear 10s infinite;
  -webkit-transform: rotate(-20deg);
  -moz-animation: balloons_rotate_two linear 10s infinite;
  -moz-transform: rotate(-20deg);
  -o-animation: balloons_rotate_two linear 10s infinite;
  -o-transform: rotate(-20deg);
  -ms-animation: balloons_rotate_two linear 10s infinite;
  -ms-transform: rotate(-20deg);
  animation: balloons_rotate_two linear 10s infinite;
  transform: rotate(-20deg);
}
@-webkit-keyframes balloons_rotate_two {
  0% {
    -webkit-transform: rotate(-20deg);
  }
  50% {
    -webkit-transform: rotate(20deg);
  }
  100% {
    -webkit-transform: rotate(-20deg);
  }
}
@-moz-keyframes balloons_rotate_two {
  0% {
    -moz-transform: rotate(-20deg);
  }
  50% {
    -moz-transform: rotate(20deg);
  }
  100% {
    -moz-transform: rotate(-20deg);
  }
}
@-o-keyframes balloons_rotate_two {
  0% {
    -o-transform: rotate(-20deg);
  }
  50% {
    -o-transform: rotate(20deg);
  }
  100% {
    -o-transform: rotate(-20deg);
  }
}
@-ms-keyframes balloons_rotate_two {
  0% {
    -ms-transform: rotate(-20deg);
  }
  50% {
    -ms-transform: rotate(20deg);
  }
  100% {
    -ms-transform: rotate(-20deg);
  }
}
@keyframes balloons_rotate_two {
  0% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-20deg);
  }
}
</style>
