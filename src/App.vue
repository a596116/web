
<template>
  <suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div class="w-screen h-screen bg-slate-400 flex justify-center items-center">
        <div class="w-80 h-80 rounded-full border-8 border-white z-10 flex justify-center items-center">
          <img src="/img/logo.png"
            class="w-72 h-72 object-contain rounded-full animate__animated animate__bounce animate__infinite" />
        </div>
      </div>
    </template>
  </suspense>
</template>

<style lang="scss">
@import '@/styles/base.scss';
</style>
