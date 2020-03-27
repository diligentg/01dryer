<template>
  <swiper>
    <swiper-item v-for="(item, index) in dataList" :key="index">
      <img :src="item" alt="" >
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../swiper/index'
    export default {
        name: "HomeSwiper",
      components:{
        Swiper,
        SwiperItem,
      },
      data(){
        return{
          dataList:[require('../../assets/img/1.jpg'),require("../../assets/img/2.jpg"),require("../../assets/img/3.jpg")],
          isLoad: false,
        }
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){
            this.$emit('swiperImageLoad')
            this.isLoad = true

          }
        }
      }
    }
</script>

<style scoped>

</style>
