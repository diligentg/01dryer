<template>
    <div>
      <Header></Header>
      <div class="fixMsg">
        <div class="fixItem"><span class="fixText">姓名</span><input v-model="listFix.fname"  class="fixInput" placeholder="报修人姓名"  type="text" /></div>
        <div class="fixItem"><span class="fixText">报修设备</span><input v-model="listFix.type"  class="fixInput"  type="text" /></div>
        <div class="fixItem"><span class="fixText">寝室</span><input v-model="listFix.dormi" class="fixInput"  type="text" /></div>
        <div class="fixItem"><span class="fixText">电话</span><input v-model="listFix.num" class="fixInput" type="text" /></div>
      </div>
      <div class="fixContent">
        <div class="fixDetail">
          <div class="fixTitle">报修情况</div>
          <textarea v-model="listFix.fixmsg" class="fixArea" placeholder="请输入损坏信息" type="text" />
        </div>
        <div class="fixImg">
          <label for="fixImg"><img :src="listFix.Image" alt=""></label><input type="file" id="fixImg" v-show="false" @change="fileChange">
        </div>
      </div>
      <div class="goFix" @click="goFix">提交报修</div>
    </div>
</template>

<script>
  import Header from '../../components/header/Header'
  import axios from 'axios'
  const qs = require('qs')
    export default {
        name: "Fix",
      components:{
        Header
      },
      data(){
        return{
          listFix:{
            Image:require('../../assets/img/upfix.png'),
            fiximg:'',
            fname:'',
            type:'',
            dormi:'',
            num:'',
            fixmsg:''
          }
        }
      },
      methods:{
        fileChange(e) {
          let file = e.target.files[0];
          console.log(file);
          this.listFix.fiximg=file.name;
          this.listFix.Image = window.URL.createObjectURL(e.target.files[0]);
          console.log(window.URL.createObjectURL(e.target.files[0]));
        },
        goFix(){
          axios({
            url:'/api/fixs/add',
            method:'post',
            params:{
              fix:this.listFix
            },
            paramsSerializer:function (params) {
              console.log(params.fix);
              return qs.stringify(params.fix);
            }
          }).then(()=>{
            alert('提交成功')
          })
        }
      }
    }
</script>

<style scoped>
.fixItem{
  position: relative;
  height: 59px;
  border-bottom:1px solid #cecece7d;
}
  .fixText{
    font-size: 1.1em;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(0,-50%);
  }
  .fixInput{
    border:none;
    outline: none;
    font-size: 1em;
    position: relative;
    top: 2em;
    transform: translate(0,-50%);
    width: 6em;
    margin-left: 69%;
    text-align: right;
  }
  .fixContent{
    position: relative;
    text-align: center;
    top: 2em;
  }
  .fixTitle{
    float: left;
    font-size: 1.1em;
    margin-left: 5%;
    margin-bottom: 5%;
  }
  .fixArea{
    width: 90%;
    height: 7em;
    border: none;
    font-size: 1.2em;
    outline: none;
  }
.fixImg{
  text-align: left;
  margin-bottom: 5%;
}
img{
  position: relative;
  height: 5em;
  width: 5em;
  margin-left: 3%;
}
  .goFix{
    position: relative;
    top:5em;
    text-align: center;
    background-color: #FF5722;
    color: white;
    height: 2em;
    width: 8em;
    line-height: 2em;
    border-radius: 20px;
    margin: auto;
    font-size: 1.2em;
  }
  .goFix:active{
    animation-name: bounce-in ;
    animation-duration: .3s;
  }
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
