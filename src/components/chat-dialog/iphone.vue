<template>
  <div id="dynamic-island" class="dynamic-island">
    <!-- 来电人信息 -->
    <div class="caller">
      <!-- 头像 -->
      <div class="avatar"></div>

      <!-- 信息 -->
      <div class="info">
        <span>iPhone</span>
        <p>浩呆</p>
      </div>
    </div>

    <!-- 接听和挂断电话按钮 -->
    <div class="actions">
      <!-- 挂断电话 -->
      <div class="refuse">
        <icon-phone-telephone theme="outline" />
      </div>

      <!-- 接听电话 -->
      <div class="answer">
        <icon-phone-telephone theme="outline" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  bindEvent()
})

const bindEvent = () => {
  const oDynamicIsland = document.getElementById('dynamic-island')!
  const oScreenWrapper = document.getElementById('screen-wrapper')!
  // 点击灵动岛时将灵动岛状态变更为展开状态 -- 通过添加一个 .expanded 类名来记录展开状态
  oDynamicIsland.addEventListener('click', (e) => {
    // 阻止事件冒泡到屏幕区域的点击事件监听器中
    // 否则每次点击都会被外层的屏幕元素的点击事件监听器移除 .expanded 类名
    e.stopPropagation()
    oDynamicIsland.classList.add('expanded')
  })

  // 点击屏幕内其他区域时取消灵动岛的展开状态
  oScreenWrapper.addEventListener('click', () => {
    oDynamicIsland.classList.remove('expanded')
  })
}
</script>

<style scoped lang="scss">
/* 灵动岛 */
.dynamic-island {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 85px;
  height: 25px;
  left: 50%;
  top: 10px;
  padding: 0 10px;
  transform: translateX(-50%);
  background: black;
  border-radius: 20px;
  transition: 0.5s ease-in-out;
  cursor: default;
  user-select: none;
}

/* 来电人信息 */
.dynamic-island .caller {
  display: flex;
  align-items: center;
  color: white;
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
}

.dynamic-island .caller .avatar {
  width: 0;
  height: 0;
  background: url('/img/logo.png') no-repeat;
  background-size: 90%;
  background-position-y: -5px;
  border-radius: 50%;
  transition: 0.5s;
}

.dynamic-island .caller .info {
  display: flex;
  flex-direction: column;
  //   gap: 3px;
}
.dynamic-island .caller .info span {
  visibility: hidden;
  opacity: 0;
  line-height: 0;
  color: #666;
  font-size: 8px;
  transition: 0.5s;
}
.dynamic-island .caller .info p {
  font-size: 8px;
  transition: 0.5s;
}

/* 接听和挂断电话按钮 */
.dynamic-island .actions {
  display: flex;
  gap: 12px;
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
  transition-delay: 0.25s;
}

.dynamic-island .actions .refuse {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #ff4438;
  transform: rotate(135deg);
  transition: 0.5s;
}
.dynamic-island .actions .answer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #30d258;
  transition: 0.5s;
}

/* 鼠标悬浮时灵动岛的状态 */
.dynamic-island:hover {
  width: 200px;
}

.dynamic-island:hover .caller {
  visibility: visible;
  opacity: 1;
}

.dynamic-island:hover .actions {
  visibility: visible;
  opacity: 1;
}

/* 灵动岛展开状态 */
.dynamic-island.expanded {
  width: 200px;
  height: 50px;
}

.dynamic-island.expanded .caller {
  visibility: visible;
  opacity: 1;
}
.dynamic-island.expanded .caller .avatar {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}

.dynamic-island.expanded .caller .info span {
  visibility: visible;
  line-height: 8px;
  opacity: 1;
}

.dynamic-island.expanded .actions {
  visibility: visible;
  opacity: 1;
  transition-delay: 0;
}
.dynamic-island.expanded .actions .refuse {
  color: white;
  background-color: #ff4438;
}
.dynamic-island.expanded .actions .answer {
  color: white;
  background-color: #30d258;
}
</style>
