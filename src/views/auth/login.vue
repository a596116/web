<template>
  <section>
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <div class="square" style="--i: 0"></div>
      <div class="square" style="--i: 1"></div>
      <div class="square" style="--i: 2"></div>
      <div class="square" style="--i: 3"></div>
      <div class="square" style="--i: 4"></div>
      <div class="form-container">
        <div class="container" :class="{ sigin }">
          <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" class="form">
            <h1>登入後台系統</h1>
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" autocomplete="off" clearable placeholder="帳號：" class="mt-[20px]" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" autocomplete="off" clearable placeholder="密碼："
                class="mt-[20px]" />
            </el-form-item>
            <div class="flex gap-4 justify-center items-center mt-5">
              <span class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
                @click="router.push({ name: 'home' })">網站首頁</span>
              <span class="text-base">|</span>
              <span class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
                @click="sigin = !sigin">會員註冊</span>
            </div>
            <el-form-item>
              <el-button class="btn" type="primary" @click="submitForm(loginFormRef)">登入</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="container" :class="{ sigin }">
          <el-form ref="RegisterFormRef" :model="RegiserForm" status-icon :rules="rules" class="form">
            <h1>註冊帳號</h1>
            <el-form-item prop="name">
              <el-input v-model="RegiserForm.name" autocomplete="off" clearable placeholder="名稱：" />
            </el-form-item>
            <el-form-item prop="account">
              <el-input v-model="RegiserForm.account" autocomplete="off" clearable placeholder="電子郵箱："
                class="mt-[15px]" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="RegiserForm.password" type="password" autocomplete="off" clearable placeholder="密碼："
                class="mt-[15px]" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="RegiserForm.token" autocomplete="off" clearable placeholder="邀請碼" class="mt-[15px]" />
            </el-form-item>
            <div class="flex gap-4 justify-center items-center mt-5">
              <span class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
                @click="router.push({ name: 'home' })">網站首頁</span>
              <span class="text-base">|</span>
              <span class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer">找回密碼</span>
              <span class="text-base">|</span>
              <span class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
                @click="sigin = !sigin">帳號登入</span>
            </div>
            <el-form-item>
              <el-button class="btn" type="primary" @click="submitRegisterForm(RegisterFormRef)">註冊</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { ILoginData, IRegisterData } from '../../apis/userApi'
import { userStores } from '@/stores/userStore'
import router from '@/router'
import userApi from '../../apis/userApi'

class InitData {
  loginForm: ILoginData = {
    account: "a596116@gmail.com",
    password: "a0988640301"
  }
  RegiserForm: IRegisterData = {
    account: "",
    password: "",
    name: "",
    token: ""
  }
  loginFormRef = ref<FormInstance>()
  RegisterFormRef = ref<FormInstance>()
}

const sigin = ref(false)
const loginForm = reactive(new InitData().loginForm)
const RegiserForm = reactive(new InitData().RegiserForm)
const loginFormRef = new InitData().loginFormRef
const RegisterFormRef = new InitData().RegisterFormRef

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '請輸入電子信箱', trigger: 'blur' },
    { min: 5, max: 24, message: '帳號長度在 5 到 24 之間', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blur' },
    { min: 1, max: 10, message: '名稱在1到10個字', trigger: 'blur' }
  ]
})


const userStore = userStores()
const submitForm = async (formEl: FormInstance | undefined) => {
  await formEl?.validate((valid: boolean) => {
    if (valid) {
      userStore.login(loginForm)
    }
  })
}
const submitRegisterForm = async (formEl: FormInstance | undefined) => {
  await formEl?.validate((valid: boolean) => {

    if (valid) {
      if (RegiserForm.token == "890621") {
        userStore.createUser(RegiserForm)
      } else {
        ElMessage.error('認證碼錯誤')
      }
    }
  })
}

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
        @apply top-[-80px] left-[800px] w-[50px] h-[50px];
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
        transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);

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

        .el-form {
          @apply relative w-full h-full p-[40px];

          h1 {
            @apply relative text-hd-black1 text-[24px] font-semibold mb-[40px];
            letter-spacing: 1px;

            &::before {
              @apply content-[''] absolute left-0 bottom-[-10px] w-[80px] h-[4px] bg-hd-black1;
            }
          }

          .el-input {
            @apply w-full border-0 outline-none px-[20px] py-[10px] rounded-[35px] text-base;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            letter-spacing: 1px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

            ::placeholder {
              color: var(--hd-black1) !important;
            }
          }

          .el-button {
            @apply bg-white text-black rounded-[20px] mt-[40px] px-[50px] py-[8px] border-0 font-black cursor-pointer relative text-center overflow-hidden;
            letter-spacing: 8px;



            &::before,
            &::after {
              @apply absolute top-0 left-0 w-full h-full;
            }

            &::before {
              @apply content-[''] w-[120%] h-0 pb-[120%] top-[-110%] left-[-10%] rounded-[50%];
              background: #90d0ec86;
              transform: translate3d(0, 68%, 0) scale3d(0, 0, 0);
            }

            &:after {
              content: "";
              background: #90d0ec86;
              transform: translate3d(0, -100%, 0);
              transition: transform 0.4s cubic-bezier(0.1, 0, 0.3, 1);
            }


            &:hover span {
              animation: MoveScaleUpInitial 0.3s forwards, MoveScaleUpEnd 0.3s forwards 0.3s;
            }

            &:hover::before {
              transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
              transition: transform 0.4s cubic-bezier(0.1, 0, 0.3, 1);
            }

            &:hover::after {
              transform: translate3d(0, 0, 0);
              transition-duration: 0.05s;
              transition-delay: 0.4s;
              transition-timing-function: linear;
            }
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

@keyframes MoveScaleUpInitial {
  to {
    transform: translate3d(0, -105%, 0) scale3d(1, 2, 1);
    opacity: 0;
  }
}

@keyframes MoveScaleUpEnd {
  from {
    transform: translate3d(0, 100%, 0) scale3d(1, 2, 1);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>
