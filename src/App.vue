<template>
  <div id="app">
    <transition name="skip">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>

<style>
  @import "./assets/css/base.css";
  .skip-enter-active{
    will-change: transform;
    transition: all .3s ;
  }
  .skip-enter {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
