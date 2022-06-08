<template>
    <div :class="{ scroll }" class="relative w-full h-screen flex justify-center">
        <ul class="bgList">
            <li v-for="n in total" :key="n" :style="img(n)"
                :class="{ active: bgactive === n - 1 || bgpreactive === n - 1 }"></li>
        </ul>
        <div class="homeTitle">
            <h2>Welcome <br> <span class="typed"></span></h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import Typed from 'typed.js'
const scroll = ref(false)
const total = ref(5)
const animationDuration = 10
const bgactive = ref(0)
const bgpreactive = ref(0)
const bgimg = [
    'https://upload.cc/i1/2022/02/22/GCRmz3.jpg',
    'https://upload.cc/i1/2022/02/22/NMaxRC.jpg',
    'https://upload.cc/i1/2022/02/22/Zr15aJ.jpg',
    'https://upload.cc/i1/2022/02/22/JBuPLx.jpg',
    'https://upload.cc/i1/2022/02/22/31hoZM.jpg'
]

const img = (n: number) => {
    return {
        backgroundImage: `url(${bgimg[n]})`,
        animationDuration: `${animationDuration}s`
    }
}

window.addEventListener('scroll', function () {
    scroll.value = (window.scrollY > 0)
})

setInterval(() => {
    bgpreactive.value = bgactive.value
    bgactive.value = (bgactive.value + 1 + total.value) % total.value
}, animationDuration / 2 * 1000)

nextTick(() => {
    new Typed(".typed", {
        strings: ["Hao Dai", "So Cute"],
        typeSpeed: 200,
        backSpeed: 100,
        loop: true,
    })
})
</script>

<style scoped lang="scss">
.bgList {
    @apply absolute w-full h-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] duration-500 z-10 bg-white;
    list-style: none;

    li {
        @apply opacity-0 absolute w-full h-full;
        background: center no-repeat;
        background-size: 150% auto;

        &.active {
            animation: bgAnimate linear;
        }
    }
}

.scroll .bgList {
    width: 70%;
    height: 300px;
}

@keyframes bgAnimate {
    0% {
        opacity: 0;
        background-size: 150% auto;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
        background-size: 110% auto;
    }
}

.homeTitle {
    @apply absolute bottom-5 flex justify-center flex-col;

    h2 {
        @apply text-7xl font-bold text-center text-gray-500 mb-3 duration-500;
        line-height: 1.4em;
        letter-spacing: 10px;

        span {
            @apply text-6xl text-gray-400 duration-500;
            letter-spacing: 5px;
        }
    }
}
</style>