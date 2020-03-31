<template>
  <div id="app">
    <transition name="skip">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import {getUserMsg} from "./network/user";

  export default {
  name: 'App',
  created() {
    getUserMsg().then(res =>{
      console.log(res.item[0]);
      this.$store.commit('getUserInfo',res.item[0]);
    });
  }
}
</script>

<style>
  @import "./assets/css/base.css";
  @import "assets/css/font.css";
  #app{
    height: 100%;
    width: 100%;
  }
  .skip-enter-active{
    will-change: transform;
    transition: all .3s ;
  }
  .skip-enter {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
