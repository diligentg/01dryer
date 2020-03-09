<template>
  <div id= "parent">
    <div class="content">
<!--      <transition name="slide"><img :src="dataList[currentIndex]" alt=""/></transition>-->
          <div class="imgDiv" v-for="(img,index) in dataList" :key="index">
            <transition name="slide"><img :src="img" alt="" v-show="index===currentIndex" ></transition>
          </div>
      <ul class="lfBtn">
        <li @click="gotoPage(prevIndex)" id="left">&lt;</li>
        <li @click="gotoPage(nextIndex)" id="right">&gt;</li>
      </ul>
    </div>
    <div id="bottomItem">
      <ul>
        <li
          v-for="(item,index) in dataList"
          @click="gotoPage(index)"
          :class="{current:currentIndex === index}">{{index+1}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Roll",
      created(){
          // this.runInv();
      },
      beforeDestroy(){
        clearInterval(this.timer)
      },
      data(){
          return{
            dataList:[require('../../assets/img/9.png'),require("../../assets/img/10.png"),require("../../assets/img/11.png")],
            currentIndex: 0,   //默认显示图片
            timer: null    //定时器
          }
      },
      methods:{
        gotoPage(index) {
          this.currentIndex = index;
        },
        runInv() {
          this.timer = setInterval(() => {
            this.gotoPage(this.nextIndex);
            console.log(this.timer)
          }, 5500);
        }
      },
      computed: {
        //上一张
        prevIndex() {
          if(this.currentIndex === 0) {
            return this.dataList.length - 1;
          }else{
            return this.currentIndex - 1;
          }
        },
        //下一张
        nextIndex() {
          if(this.currentIndex === this.dataList.length - 1) {
            return 0;
          }else {
            return this.currentIndex + 1;
          }
        }
      }
    }
</script>

<style scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li{
    /*display: inline;*/
  }
  .content{
    position: relative;
    height: 15em;
    width: 100%;
  }
  .imgDiv{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  img{
    height: 100%;
    width: 100%;
  }
  .lfBtn li{
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    margin-top: -20px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-family: Simsun;
    font-size: 30px;
    border: 1px solid #fff;
    border-radius: 50%;
    opacity: 0.3;
    cursor: pointer;
    color: #fff;
    background: black;
  }
  #left{
    left: 5px;
  }
  #right{
    left: 100%;
    margin-left: -45px;
  }
  #parent{
    position: relative;
  }
  #bottomItem{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  #bottomItem ul{
    display: flex;
    justify-content:center;
    background-color: rgba(0, 0, 0, 0.26);
  }
  #bottomItem li{
    text-align: center;
    height: 20px;
    width: 20px;
    border: 1px solid #c4c4c4;
    border-radius: 50%;
  }
  .current{
    background-color: #cf4317;
    color: white;
  }
  .slide-enter-active{
    transition: all .3s ease-out;
  }
  .slide-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  /*.slide-leave-active{*/
  /*  transition: all .3s ease;*/
  /*  opacity: 0;*/
  /*}*/
  .slide-leave-to{
    transform: translateX(-100%);
  }
</style>
