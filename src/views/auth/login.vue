<template>
  <section>
    <div class="color" v-for="i in 3"></div>
    <div class="box">
      <div class="square" style="--i: 0"></div>
      <div class="square" style="--i: 1"></div>
      <div class="square" style="--i: 2"></div>
      <div class="square" style="--i: 3"></div>
      <div class="square" style="--i: 4"></div>
      <div class="form-container">
        <div class="container" :class="{ sigin }">
          <form-login title="用戶登入" :fields="userLoginForm" :model="loginForm" type="login">
            <template #button>
              <div class="flex gap-4 justify-center items-center mt-5">
                <span class="other" @click="router.push({ name: 'home' })">網站首頁</span>
                <span class="text-base">|</span>
                <span class="other" @click="sigin = !sigin">會員註冊</span>
              </div>
            </template>
          </form-login>
        </div>

        <div class="container" :class="{ sigin }">
          <form-login
            title="用戶登入"
            :fields="userRegisterForm"
            :model="RegiserForm"
            type="register">
            <template #button>
              <div class="flex gap-4 justify-center items-center mt-5">
                <span class="other" @click="router.push({ name: 'home' })">網站首頁</span>
                <span class="text-base">|</span>
                <span class="other">找回密碼</span>
                <span class="text-base">|</span>
                <span class="other" @click="sigin = !sigin">帳號登入</span>
              </div>
            </template>
          </form-login>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { ILoginData, IRegisterData } from '../../apis/userApi'
import router from '@/router'
import { userLoginForm, userRegisterForm } from '@/config/form'

const sigin = ref(false) //false->login | true->register

const loginForm = reactive<ILoginData>({
  account: 'a596116',
  password: '123456',
})
const RegiserForm = reactive<IRegisterData>({
  account: '',
  password: '',
  name: '',
  token: '',
})
</script>

<style scoped lang="scss">
section {
  @apply flex justify-center items-center h-screen overflow-hidden;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

  .color {
    position: absolute;
    filter: blur(150px);

    &:nth-child(1) {
      @apply top-[-300px] w-[60%] h-[600px];
      background: #ff359b;
    }

    &:nth-child(2) {
      @apply bottom-[50px] left-[100px] w-[70%] h-[400px];
      background: #fffd87;
    }

    &:nth-child(3) {
      @apply bottom-[200px] right-[200px] w-[50%] h-[300px];
      background: #00d2ff;
    }
  }

  .box {
    position: relative;

    .square {
      position: absolute;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      animation: animate 10s linear infinite;
      animation-delay: calc(-1s * var(--i));

      &:nth-child(1) {
        @apply top-[-50x] right-[-60px] w-[100px] h-[100px];
      }

      &:nth-child(2) {
        @apply top-[150px] left-[-100px] w-[120px] h-[120px] z-[2];
      }

      &:nth-child(3) {
        @apply bottom-[50px] right-[-60px] w-[80px] h-[80px] z-[2];
      }

      &:nth-child(4) {
        @apply top-[450px] left-[80px] w-[50px] h-[50px];
      }

      &:nth-child(5) {
        @apply top-[-80px] left-[140px] w-[60px] h-[60px];
      }
    }

    .form-container {
      perspective: 900px;
      position: relative;

      .container {
        @apply relative w-[400px] min-h-[400px] rounded-[10px] flex justify-center items-center;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1p x solid rgba(255, 255, 255, 0.2);
        transform-style: preserve-3d;
        backface-visibility: hidden;
        visibility: visible;
        transform: rotateY(0deg);
        transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);

        .other {
          @apply text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer;
        }

        &.sigin {
          transform: rotateY(-180deg);
        }

        &:nth-child(2) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          transform: rotateY(180deg);

          &.sigin {
            transform: rotateY(0deg);
          }
        }
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-40px);
  }

  50% {
    transform: translateY(40px);
  }
}
</style>
