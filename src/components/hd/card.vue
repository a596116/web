<template>
  <div class="card">
    <div class="about">
      <hd-indroduce />
    </div>

    <input type="radio" name="select" id="slide_1" checked />
    <input type="radio" name="select" id="slide_2" />
    <input type="radio" name="select" id="slide_3" />
    <input type="checkbox" id="slideImg" />

    <div class="slider">
      <label for="slide_1" class="slide slide_1"></label>
      <label for="slide_2" class="slide slide_2"></label>
      <label for="slide_3" class="slide slide_3"></label>
    </div>

    <div class="inner_part">
      <div class="content content_1">
        <div class="title">作品</div>
        <div class="text">
          <a class="btn-draw" href="https://github.com/a596116/web" target="_blank"
            ><span>前端網頁和後台管理系統</span></a
          >
          <a class="btn-draw" href="https://github.com/a596116/server" target="_blank"
            ><span>Node.js搭配eggjs開發後端</span></a
          >
          <a class="btn-draw" href="https://github.com/a596116/nestjs" target="_blank"
            ><span>Node.js搭配nestjs開發後端</span></a
          >
          <a class="btn-draw" href="https://github.com/a596116/ir" target="_blank"
            ><span>大學畢業專題網站</span></a
          >
          <a class="btn-draw" href="https://github.com/a596116/petLove" target="_blank"
            ><span>資料創新應用競賽-寵愛LineBot </span></a
          >
        </div>
      </div>
    </div>

    <div class="inner_part">
      <div class="content content_2">
        <div class="title">競賽</div>
        <div class="text">
          參與成大資通安全研究與教學中心特與國網中心、嘉南藥理大學多媒體與遊戲發展系、中國文化大學推廣教育部、國立虎尾科技大學、國立高雄科技大學智慧商務系、中臺科技大學人工智慧健康管理系、台灣數位安全聯盟、Honeypot台灣分會、OWASP台灣分會、台灣學術網路危機處理中心等單位合作舉辦2021金象盃全國大數據實務能力競賽，決賽獲得全國大專院校組-優勝。
        </div>
      </div>
    </div>

    <div class="inner_part">
      <div class="content content_3">
        <div class="title">技能</div>
        <div class="text">
          <div class="skill">
            <el-tooltip
              effect="dark"
              :content="item.info"
              placement="bottom"
              v-for="item in skills"
              :key="item.name">
              <img :src="item.img" alt="haodai" />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  {
    name: 'HTML',
    img: 'https://cdn-icons-png.flaticon.com/512/732/732212.png',
    info: '熟悉 HTML 各項標籤及功能',
  },
  {
    name: 'JavaScript',
    img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
    info: '熟悉 JavaScript 基礎及 ES6 標準，AJAX / JSON 串接 RESTful API',
  },
  {
    name: 'CSS',
    img: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
    info: '熟悉 網頁版面切版、RWD響應式網頁設計、Sass 預處理器',
  },
  {
    name: 'Typescript',
    img: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
    info: '熟悉 Typescript 基本規範，各類型聲明',
  },
  {
    name: 'Vue.js',
    img: 'https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png',
    info: '熟悉使用 Vue3 ， 自行開發組件 ，配合TS開發網站',
  },
  {
    name: 'Node.js',
    img: 'https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png',
    info: '使用 NestJS 開發後端串接 RestfulAPI',
  },
  {
    name: 'Python',
    img: 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png',
    info: '會使用 YOLO 做機器學習，用 Django 開發 LineBot各類功能',
  },
  {
    name: 'Java',
    img: 'https://cdn-icons-png.flaticon.com/512/5968/5968282.png',
    info: '熟悉使用 Java 基礎語法',
  },
  {
    name: 'Git',
    img: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
    info: '熟悉使用 Git 版控，GitHub Pages 部署靜態網頁',
  },
  {
    name: 'Docker',
    img: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
    info: '熟悉 Docker 基本語法，了解底層原理，製作 Docker image',
  },
  {
    name: 'SQL',
    img: 'https://cdn-icons-png.flaticon.com/512/337/337953.png',
    info: '熟悉 Select、Update、Delete、Insert，資料分析及資料切割，關聯式資料庫查詢',
  },
  {
    name: 'Linux',
    img: 'https://cdn-icons-png.flaticon.com/512/6124/6124995.png',
    info: '熟練使用 Linux 進行開發及部屬網站',
  },
]
</script>

<style scoped lang="scss">
.card {
  position: relative;
  height: 450px;
  width: 100%;
  max-width: 850px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 10px 0 50px rgba(0, 0, 0, 0.5);
}

.card .inner_part {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 30px;
  height: 450px;
  width: 70%;
  position: absolute;
  left: 30%;
}

#slideImg:checked ~ .inner_part {
  padding: 0;
  transition: 0.1s ease-in;
}

.about {
  position: absolute;
  width: 360px;
  top: -100px;
  left: -100px;
  z-index: 99;
}

.content {
  padding: 0 20px 0 35px;
  width: 530px;
  height: 100%;
  margin-left: 50px;
  opacity: 0;
  transition: 0.6s;
  display: flex;
  flex-direction: column;
}

#slideImg:checked ~ .inner_part .content {
  display: none;
}

#slide_1:checked ~ .inner_part .content_1,
#slide_2:checked ~ .inner_part .content_2,
#slide_3:checked ~ .inner_part .content_3 {
  opacity: 1;
  margin-left: 0;
  z-index: 10;
  transition-delay: 0.3s;
}

.content .title {
  height: 15%;
  font-size: 30px;
  font-weight: 700;
  color: #0d0925;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 5px;
  margin: 0 0 10px 0;
}

.content .text {
  //   width: 100%;
  height: 70%;
  font-size: 19px;
  color: #4e4a67;
  margin: 0 auto 30px auto;
  line-height: 1.5em;
  text-align: justify;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.content .text .skill {
  width: 100%;
  height: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;

  img {
    width: 70px;
    height: 70px;
    cursor: pointer;
  }
}
.slider {
  position: absolute;
  bottom: 25px;
  left: 65%;
  transform: translateX(-50%);
  z-index: 11;
}

#slideImg:checked ~ .slider {
  display: none;
}

.slider .slide {
  position: relative;
  height: 12px;
  width: 50px;
  background: #d9d9d9;
  border-radius: 5px;
  display: inline-flex;
  margin: 0 3px;
  cursor: pointer;
}

.slider .slide:before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  height: 100%;
  width: -100%;
  background: var(--hd-theme-color);
  border-radius: 10px;
  transform: scaleX(0);
  transition: transform 0.6s;
  transform-origin: left;
}

#slide_1:checked ~ .slider .slide_1:before,
#slide_2:checked ~ .slider .slide_2:before,
#slide_3:checked ~ .slider .slide_3:before {
  transform: scaleX(1);
  width: 100%;
}

input {
  display: none;
}

@mixin btn-draw($color, $color-hov, $width: 1px, $padding: 0.2em, $time: 0.2s) {
  position: relative;
  display: inline-block;
  color: $color;
  border-bottom: $width solid $color;
  cursor: pointer;
  overflow: hidden;
  transition: color $time ease-in-out, background-color $time ease-in-out;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    width: $width;
    background: $color;
    transform: translateY(100%);
    transition: transform $time ease-in-out;
    transition-delay: $time * 3;
  }

  > span {
    position: relative;
    display: block;
    padding: $padding;
    color: inherit;
    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background: $color;
      transition: transform $time ease-in-out;
    }

    &:before {
      height: $width;
      width: 100%;
      transform: translateX(100%);
      transition-delay: $time * 2;
    }

    &:after {
      height: 100%;
      width: $width;
      transform: translateY(-100%);
      transition-delay: $time;
    }
  }

  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }

  &:hover:after {
    transition-delay: 0s;
  }

  &:hover > span:before {
    transition-delay: $time;
  }

  &:hover > span:after {
    transition-delay: $time * 2;
  }

  &:hover {
    color: $color-hov;
    background-color: $color;
    transition-delay: $time * 3;
  }
}

.btn-draw {
  @include btn-draw(#2d3d67, #e4e4e2, 2px);
  font-size: 1em;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1em;
}

// response
@media (max-width: 768px) {
  .card {
    width: 95%;
    height: 500px;
    top: 200px;

    .about {
      position: relative;
      width: 90%;
      top: -500px;
      left: 0px;
    }

    .inner_part {
      padding: 0;
      height: 500px;
      width: 100%;
      left: 0;
    }
    .slider {
      left: 50%;
    }
  }

  .btn-draw {
    font-size: 0.7em;
  }

  .content .text .skill img {
    width: 60px;
    height: 60px;
  }
}
</style>
