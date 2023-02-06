<template>
  <div class="introduce" data-state="#about">
    <div class="introduce-header">
      <div
        class="introduce-cover"
        style="background-image: url('https://upload.cc/i1/2022/09/22/i0q7uW.jpg')"></div>
      <el-image
        class="introduce-avatar"
        src="https://upload.cc/i1/2022/09/22/SAVIGt.jpeg"
        :lazy="true"></el-image>

      <h1 class="introduce-fullname">Wang HaoDai</h1>
    </div>
    <div class="introduce-main">
      <div class="introduce-section is-active" id="about">
        <div class="introduce-content">
          <div class="introduce-subtitle">ABOUT</div>
          <p class="introduce-desc">
            畢業於靜宜大學 資料科學暨大數據分析與應用學系。
            擅長於前端技術並熟悉使用Vue.js框架、Git版控開發網站。
            在後端方面也會使用Nodjs搭配egg串接RestfulAPI，也使用過Django開發LineBot
          </p>
        </div>
        <div class="introduce-social">
          <a href="https://line.me/ti/p/YXi16BOO8V" target="_blank" class="btn">
            <img src="/img/link/LINE.png" alt="haodai" />
          </a>
          <a href="https://github.com/a596116" target="_blank" class="btn">
            <img src="/img/link/GitHub.png" alt="haodai" />
          </a>
        </div>
      </div>
      <div class="introduce-section" id="experience">
        <div class="introduce-content">
          <div class="introduce-subtitle">學歷</div>
          <div class="introduce-timeline">
            <div class="introduce-item" data-year="2023">
              <div class="introduce-item-title">求職中</div>
              <div class="introduce-item-desc">尋找工作...</div>
            </div>
            <div class="introduce-item" data-year="2018">
              <div class="introduce-item-title">靜宜大學</div>
              <div class="introduce-item-desc">資料科學暨大數據分析與應用學系</div>
            </div>
            <div class="introduce-item" data-year="2014">
              <div class="introduce-item-title">永豐高中</div>
              <div class="introduce-item-desc">普通班</div>
            </div>
            <div class="introduce-item" data-year="2011">
              <div class="introduce-item-title">永豐國中</div>
              <div class="introduce-item-desc">普通班</div>
            </div>
          </div>
        </div>
      </div>
      <div class="introduce-section" id="contact">
        <div class="introduce-content">
          <div class="introduce-subtitle">聯絡資訊</div>
          <div class="introduce-contact-wrapper">
            <div class="introduce-contact btn">
              <img src="/img/link/PHONE.png" alt="haodai" />
              <a href="tel:0988640301" target="_blank">0988640301 </a>
            </div>
            <div class="introduce-contact"></div>
            <div class="introduce-contact btn">
              <img src="/img/link/MAIL.png" alt="haodai" />
              <a href="mailto:a596116@gmail.com" target="_blank"> a596116@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      <div class="introduce-buttons">
        <button data-section="#about" class="is-active" @click="handleButtonClick">簡介</button>
        <button data-section="#experience" @click="handleButtonClick">學歷</button>
        <button data-section="#contact" @click="handleButtonClick">聯絡資訊</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleButtonClick = (e: any) => {
  let buttons = document.querySelectorAll<HTMLElement>('.introduce-buttons button')
  let sections = document.querySelectorAll<HTMLElement>('.introduce-section')
  let introduce = document.querySelector<HTMLElement>('.introduce')
  let targetSection = e.target.getAttribute('data-section')
  let section = document.querySelector<HTMLElement>(targetSection)
  targetSection !== '#about'
    ? introduce?.classList.add('is-active')
    : introduce?.classList.remove('is-active')
  introduce?.setAttribute('data-state', targetSection)
  sections.forEach((s) => s.classList.remove('is-active'))
  buttons.forEach((b) => b.classList.remove('is-active'))
  e.target.classList.add('is-active')
  section?.classList.add('is-active')
}
</script>

<style scoped lang="scss">
.introduce {
  // width: 360px;
  height: 500px !important;
  margin: auto;
  overflow-y: hidden;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  transition: 0.3s;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 10px 0 50px rgba(0, 0, 0, 0.5);
}

.introduce.is-active {
  .introduce-header {
    height: 80px;
  }

  .introduce-cover {
    height: 100px;
    top: -50px;
  }

  .introduce-avatar {
    transform: none;
    left: 20px;
    width: 50px;
    height: 50px;
    bottom: 10px;
  }

  .introduce-fullname,
  .introduce-jobtitle {
    left: 86px;
    transform: none;
  }

  .introduce-fullname {
    bottom: 18px;
    font-size: 19px;
  }

  .introduce-jobtitle {
    bottom: 16px;
    letter-spacing: 1px;
    font-size: 10px;
  }
}

.introduce-header {
  position: relative;
  display: flex;
  height: 200px;
  flex-shrink: 0;
  width: 100%;
  transition: 0.3s;

  * {
    transition: 0.3s;
  }
}

.introduce-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  height: 160px;
  top: -20%;
  left: 0;
  will-change: top;
  background-size: cover;
  background-position: center;
  filter: blur(12px);
  transform: scale(1.2);
  transition: 0.5s;
}

.introduce-avatar {
  width: 100px;
  height: 100px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-64px);
}

.introduce-fullname {
  position: absolute;
  bottom: 0;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  transform: translateY(-10px) translateX(-50%);
  left: 50%;
}

.introduce-jobtitle {
  position: absolute;
  bottom: 0;
  font-size: 11px;
  white-space: nowrap;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-7px);
}

.introduce-main {
  position: relative;
  flex: 1;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
}

.introduce-subtitle {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
}

.introduce-content {
  padding: 20px;
}

.introduce-desc {
  line-height: 1.6;
  color: #636b6f;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
}

.introduce-social {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px;
  img {
    filter: invert(61%) sepia(10%) saturate(468%) hue-rotate(160deg) brightness(96%) contrast(87%);
    width: 16px;
    display: block;
    transition: 0.3s;
  }
  a {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    background-color: #5d85c10d;
    border-radius: 50%;
    margin-right: 10px;

    &:hover img {
      filter: invert(64%) sepia(5%) saturate(5978%) hue-rotate(185deg) brightness(80%) contrast(86%);
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.introduce-buttons {
  display: flex;
  background-color: #fff;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  left: 0;

  button {
    flex: 1 1 auto;
    user-select: none;
    background: 0;
    font-size: 13px;
    border: 0;
    padding: 15px 5px;
    cursor: pointer;
    color: #5c5c6d;
    transition: 0.3s;
    font-weight: 500;
    outline: 0;
    border-bottom: 3px solid transparent;

    &.is-active,
    &:hover {
      color: #2b2c48;
      border-bottom: 3px solid #fdcb6e;
      background: linear-gradient(
        to bottom,
        rgba(127, 199, 231, 0) 0%,
        rgba(207, 204, 255, 0.1) 44%,
        hsla(39, 97%, 71%, 0.2) 100%
      );
    }
  }
}

.introduce-section {
  display: none;
  &.is-active {
    display: block;
    animation: fadeIn 0.6s both;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translatey(40px);
  }
  100% {
    opacity: 1;
  }
}

.introduce-timeline {
  margin-top: 30px;
  position: relative;
  &:after {
    background: linear-gradient(to top, rgba(134, 214, 243, 0) 0%, #fdcb6e 100%);
    content: '';
    left: 42px;
    width: 2px;
    top: 0;
    height: 100%;
    position: absolute;
    content: '';
  }
}

.introduce-item {
  position: relative;
  padding-left: 60px;
  padding-right: 20px;
  padding-bottom: 30px;
  z-index: 1;
  &:last-child {
    padding-bottom: 5px;
  }

  &:after {
    content: attr(data-year);
    width: 10px;
    position: absolute;
    top: 0;
    left: 37px;
    width: 8px;
    height: 8px;
    line-height: 0.6;
    border: 2px solid #fff;
    font-size: 11px;
    text-indent: -35px;
    border-radius: 50%;
    color: rgba(#868686, 0.7);
    background: linear-gradient(to bottom, lighten(#fdcb6e, 20%) 0%, #fdcb6e 100%);
  }
}

.introduce-item-title {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
}

.introduce-item-desc {
  font-size: 13px;
  color: #6f6f7b;
  line-height: 1.5;
}

.introduce-contact-wrapper {
  margin-top: 40px;
}

.introduce-contact {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #6f6f7b;
  line-height: 1.6;
  border-radius: 6px;
  padding: 2px 4px;
  cursor: pointer;

  & + & {
    margin-top: 16px;
  }

  img {
    flex-shrink: 0;
    // width: 30px;
    height: 24px;
    margin-right: 12px;
    transition: 0.3s;
    padding-right: 12px;
    border-right: 1px solid #dfe2ec;
  }
}

@media (max-width: 768px) {
  .introduce {
    height: 400px !important;
    overflow-y: auto;
  }
}
</style>
