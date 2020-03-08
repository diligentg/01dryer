<template>
    <transition name="show-aside">
      <div id="tab-bar" >
        <div class="headImg"><img :src="asideImg"><div class="nickName">银河</div></div>
        <Tab-Bar-Item path="/home"><div class="tab-bar-item">设备使用</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/user"><div class="tab-bar-item">个人主页</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/bill"><div class="tab-bar-item">我的账单</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/balance"><div class="tab-bar-item">我的余额</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/fix"><div class="tab-bar-item">设备报修</div></Tab-Bar-Item>
        <slot></slot>
      </div>
    </transition>
</template>

<script>
  import TabBarItem from './TabBarItem'
  import eventBus from '../../eventBus'

    export default {
      name: "TabBar",
      components: {
        TabBarItem
      },
      data(){
        return{
          asideImg:require('../../assets/img/简历.jpg')
        }
      },
      created() {
        let _this=this;
        eventBus.$on('getUrl', (url) => {
          _this.asideImg=url
          console.log(url);
        })
      }
    }
</script>

<style scoped>
#tab-bar{
  /*background-image: linear-gradient(top, #ffffff 0%, #0c64ce 100%);*/
  background-image: linear-gradient(top, #ffe5df 0%, #cf2f05 100%);
  position: absolute;
  top: 0;
  width: 78%;
  height: 100%;
  z-index: 99;
}
.headImg{
  height: 35%;
  position: relative;
}
img{
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 45%;
  width: 40%;
  border-radius: 50%;
  border: 3px solid #f6f6f6;
}
.nickName{
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
}
/*侧边栏item垂直居中*/
.tab-bar-item{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  .show-aside-enter-active{
    transition: all .3s ease-out;
  }
  .show-aside-enter{
    opacity: 0;
    transform: translateX(-100%);
  }
  .show-aside-leave-active{
    transition: all .3s ease;
    opacity: 0;
  }
  .show-aside-leave-to{
    transform: translateX(-100%);
  }
</style>
