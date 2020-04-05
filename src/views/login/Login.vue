<template>
<div id="login-background">
  <div class="title">DRYER</div>
  <div class="userName inputInfo"><input class="inputMsg" placeholder="Username" type="number" v-model="Username"></div>
  <div class="passWord inputInfo"><input class="inputMsg" placeholder="Password" type="password" v-model="Password"></div>
  <div class="loginBtn" @click="login">登录</div>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "Login",
      data(){
          return{
            Username:'',
            Password:'',
            user:'123',
            pass:'123'
          }
      },
      created(){
        axios({
          url:'/api/users/selectAll',
          method :'post',
        }).then((res)=>{
          this.user=res.data.item[0].user;
          this.pass=res.data.item[0].password;
        })
      },
      methods:{
          login(){
            if (this.Username===this.user&&this.Password===this.pass){
              this.$router.replace('/home')
            }
            else {
              alert('用户名或密码错误')
            }
          }
      }
    }
</script>

<style scoped>
#login-background{
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
}
.title{
  position: relative;
  color: white;
  font-size: 2.6em;
  top: 15%;
  text-align: center;
  font-weight: lighter;
}
  .inputInfo{
    text-align: center;
    position: relative;
    top: 50%;
    margin-bottom: 5%;
  }
  .inputMsg{
    width: 80%;
    border: none;
    height: 2em;
    border-bottom: 1px solid white;
    background-color: transparent;
    outline: none;
    color: white;
    font-size: 1.2em;
  }
  .loginBtn{
    color: white;
    position: relative;
    text-align: center;
    top: 60%;
    margin: auto;
    font-size: 1.3em;
    border: 1px solid white;
    height: 1.7em;
    width: 80%;
    line-height: 1.7em;
    border-radius: 25px;
  }
input::-webkit-input-placeholder{/*Webkit browsers*/
  color: rgba(255,251,240,0.4)
}
.loginBtn:active {
  animation-name: bounce-in ;
  animation-duration: .2s;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
