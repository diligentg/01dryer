<template>
  <div>
    <div class="header">
      <div class="header-name" >{{title}}</div>
      <div class="header-btn"><img src="../../assets/img/san.png" @click="asideBar" alt=""/></div>
    </div>
    <Aside v-show="isAside"><img class="backImg" src="../../assets/img/back.png" alt="" @click="asideBar"></Aside>
  </div>
</template>

<script>
  import Aside from '../../components/tabbar/Aside'

    export default {
        name: "Header",
      data(){
          return{
            title:this.$route.meta.title,
            isAside:false
          }
      },
      components:{
          Aside
      },
      methods:{
          asideBar(){
            // this.$router.replace('/aside');
            this.isAside=!this.isAside;
            console.log(this.$route.name);
          }
      },
      // watch: {
      //   '$route' (to, from){
      //
      //   }
      // }
    }
</script>

<style scoped>
  .header{
    position: relative;
    display: flex;
    /*background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);*/
    background-image: linear-gradient(to right, #E1491E 0%, #CC3433 100%);
    height: 49px;
    font-size: 24px;
    align-items: center;

  }
  img{
    height: 30px;
  }
  .header-btn{
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
  }
  .header-name{
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
  .backImg{
    width: 4.5em;
    height: 4.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%,30%);
    border-radius: 50%;
    position: relative;
  }
</style>
