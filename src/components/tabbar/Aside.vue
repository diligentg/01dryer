<template>
    <transition name="show-aside">
      <div id="tab-bar" >
        <div class="headImg"><img :src="asideImg"><div class="nickName">{{asideName}}</div></div>
        <Tab-Bar-Item path="/home"><div class="tab-bar-item">设备使用</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/user"><div class="tab-bar-item">个人主页</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/bill"><div class="tab-bar-item">我的账单</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/balance"><div class="tab-bar-item">我的钱包</div></Tab-Bar-Item>
        <Tab-Bar-Item path="/fix"><div class="tab-bar-item">设备报修</div></Tab-Bar-Item>
        <slot></slot>
      </div>
    </transition>
</template>

<script>
  import TabBarItem from './TabBarItem'
  import eventBus from '../../eventBus'
  import {getUserMsg} from "../../network/user";

    export default {
      name: "TabBar",
      components: {
        TabBarItem
      },
      data(){
        return{
          asideImg:require('../../assets/img/headimg1.jpg'),
          asideName:'银河'
        }
      },
      created() {
        eventBus.$on('getUrl', (url) => {
          this.asideImg=url;
          console.log(url);
        });
        getUserMsg().then(res=>{
          this.asideImg=require('../../assets/'+res.item[0].pid);
          this.asideName=res.item[0].name;
        })
      },
    }
</script>

<style scoped>
#tab-bar{
  /*background-image: linear-gradient(top, #ffe5df 0%, #cf2f05 100%);*/
  background-image: linear-gradient(to top, rgba(204,101,50,1) 0%, rgba(204,76,51,1) 50%,rgba(204,52,51,.9) 100%);
  position: absolute;
  top: 0;
  width: 78%;
  height: 100%;
  z-index: 99;
  text-align: center;
}
.headImg{
  height: 35%;
  position: relative;
  text-align: center;
}
img{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7em;
  width: 7em;
  border-radius: 50%;
  border: 3px solid #f6f6f6;
}
.nickName{
  position: relative;
  top: 70%;
  font-size: 1.2em;
  color: white;
}
/*侧边栏item垂直居中*/
.tab-bar-item{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
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
