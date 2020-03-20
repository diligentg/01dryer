<template>
  <div>
    <Header></Header>
    <div class="userItem">
      <span class="userText">头像</span>
      <label for="headChange"><img :src="imgUrl" alt=""></label><input type="file" id="headChange" v-show="false" @change="fileChange">
    </div>
    <div class="userItem"><span class="userText">昵称</span><input dir="auto" class="userMsg" type="text" v-model="nickName"/></div>
    <div class="userItem"><span class="userText">性别</span><input dir="auto" class="userMsg" type="text" v-model="sex"/></div>
    <div class="userItem"><span class="userText">寝室</span><input dir="auto" class="userMsg" type="text" v-model="dorm"/></div>
    <div class="userItem"><span class="userText">电话</span><input dir="auto" class="userMsg" type="text" v-model="phoneNum"/></div>
    <div class="btnBar"><button class="saveBtn" :disabled="isDisable" @click="save">保存</button><button class="backBtn" @click="backHome">返回</button></div>
  </div>
</template>

<script>
  import SaveBtn from '../../components/tabbar/SaveBtn'
  import Header from '../../components/header/Header'
  import eventBus from '../../eventBus'
    export default {
        name: "User",
        components:{
          SaveBtn,
          Header
        },
      data(){
        return{
          imgUrl:require('../../assets/img/resume.jpg'),
          nickName:'银河',
          sex:'男',
          dorm:'清雅居B2',
          phoneNum:'123456789',
          isDisable:true
        }
      },
      methods:{
        fileChange(e) {
          let file = e.target.files[0];
          console.log(file);
          this.imgUrl = window.URL.createObjectURL(e.target.files[0]);
          console.log(window.URL.createObjectURL(e.target.files[0]));
          // eventBus.$emit('getUrl',this.imgUrl)
        },
        save(){
          eventBus.$emit('getUrl',this.imgUrl)
        },
        backHome(){
          this.$router.replace('/home')
        }
      },
      watch:{
          imgUrl(){
            return this.isDisable=false;
          },
          nickName(){
            return this.isDisable=false
          },
          dorm(){
            return this.isDisable=false
          },
          phoneNum(){
            return this.isDisable=false
          }
      }
    }
</script>

<style scoped>
  .userItem{
    position: relative;
    height: 59px;
    border-bottom:1px solid #cecece;
    /*pointer-events: none;*/
  }
  .userText{
    font-size: 1.15em;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(0,-50%);
  }
  img{
    position: absolute;
    height: 3em;
    width: 3em;
    top: 50%;
    left: 82%;
    transform: translate(0,-50%);
    border-radius: 50%;
  }
  .userMsg{
    border:none;
    outline: none;
    font-size: 1em;
    position: relative;
    top: 2em;
    transform: translate(0,-50%);
    width: 3em;
    margin-left: 83%;
  }
  .btnBar{
    margin-top: 20%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .saveBtn,.backBtn{
    border-radius: 28px;
    color: #ffffff;
    font-size: 18px;
    background-image: linear-gradient(to right, #E1491E 0%, #CC3433 100%);
    padding: 12px 30px 12px 30px;
    border: none;
    outline: none;
  }
  .saveBtn:active,.backBtn:active{
    border-radius: 28px;
    color: #ffffff;
    font-size: 18px;
    background: #ffa076;
    padding: 12px 30px 12px 30px;
    border: none;
  }
  .saveBtn:disabled{
    border-radius: 28px;
    color: #ffffff;
    font-size: 18px;
    background: #ffa076;
    padding: 12px 30px 12px 30px;
    border: none;
  }
  .backBtn{
    /*float: right;*/
  }
</style>
