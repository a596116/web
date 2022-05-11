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
      <div class="container">
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" class="form">
          <h1>後台管理系統</h1>
          <el-form-item prop="account" class="inputBox">
            <el-input v-model="loginForm.account" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="password" class="inputBox">
            <el-input v-model="loginForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm(loginFormRef)"
              v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="登入中"
              element-loading-background="rgba(100, 100, 100, 0.75)">登入</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { user } from '../../utils'
import type { ILoginData } from '../../apis/userApi'

class InitData {
  loginForm: ILoginData = {
    account: "a596116@gmail.com",
    password: "123456"
  }
  loginFormRef = ref<FormInstance>()
}

const fullscreenLoading = ref(false)

const loginForm = reactive(new InitData().loginForm)
const loginFormRef = new InitData().loginFormRef

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 5, max: 24, message: '帳號長度在 5 到 24 之間', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  await formEl?.validate((valid: boolean) => {
    if (valid) {
      user.login(loginForm)
    }
  })
}
</script>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

  .color {
    position: absolute;
    filter: blur(150px);

    &:nth-child(1) {
      top: -300px;
      width: 60%;
      height: 600px;
      background: #ff359b;
    }

    &:nth-child(2) {
      bottom: 50px;
      left: 100px;
      width: 70%;
      height: 400px;
      background: #fffd87;
    }

    &:nth-child(3) {
      bottom: 200px;
      right: 200px;
      width: 50%;
      height: 300px;
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
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
      }

      &:nth-child(2) {
        top: 150px;
        left: -100px;
        width: 120px;
        height: 120px;
        z-index: 2;
      }

      &:nth-child(3) {
        bottom: 50px;
        right: -60px;
        width: 80px;
        height: 80px;
        z-index: 2;
      }

      &:nth-child(4) {
        top: -80px;
        left: 800px;
        width: 50px;
        height: 50px;
      }

      &:nth-child(5) {
        top: -80px;
        left: 140px;
        width: 60px;
        height: 60px;
      }
    }

    .container {
      position: relative;
      width: 400px;
      min-height: 400px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      .el-form {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 40px;

        h1 {
          position: relative;
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 40px;

          &::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 80px;
            height: 4px;
            background: #fff;
          }
        }

        .el-input {
          width: 100%;
          margin-top: 20px;
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          outline: none;
          padding: 10px 20px;
          border-radius: 35px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 16px;
          letter-spacing: 1px;
          color: #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

          .el-input__wrapper {
            background: none !important;
            background-color: transparent !important;
          }

        }

        .el-button {
          background-color: #ffffff;
          color: #000;
          border-radius: 20px;
          margin-top: 40px;
          padding: 8px 70px;
          border: none;
          font-weight: 900;
          cursor: pointer;
          position: relative;
          text-align: center;
          overflow: hidden;

          &::before,
          &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          &::before {
            content: "";
            background: #ecd2899c;
            width: 120%;
            height: 0;
            padding-bottom: 120%;
            top: -110%;
            left: -10%;
            border-radius: 50%;
            transform: translate3d(0, 68%, 0) scale3d(0, 0, 0);
          }

          &:after {
            content: "";
            background: #ecd2899c;
            transform: translate3d(0, -100%, 0);
            transition: transform 0.4s cubic-bezier(0.1, 0, 0.3, 1);
          }

          span {
            font-size: 1.15rem;
            color: rgb(47, 83, 94);
            display: block;
            position: relative;
            mix-blend-mode: difference;
            z-index: 10;
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
