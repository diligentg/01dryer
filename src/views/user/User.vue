<template>
  <div>
    <Header></Header>
    <div class="userItem">
      <span class="userText">头像</span>
      <label for="headChange"><img :src="list2.pid" alt=""></label><input type="file" id="headChange" v-show="false" @change="fileChange">
    </div>
    <div class="userItem"><span class="userText">昵称</span><input  class="userMsg" type="text" v-model="list2.name"/></div>
    <div class="userItem"><span class="userText">性别</span><input  class="userMsg" type="text" v-model="list2.sex"/></div>
    <div class="userItem"><span class="userText">学校</span><input id="school"  class="userMsg" type="text" v-model="list2.school"/></div>
    <div class="userItem"><span class="userText">班级</span><input id="classmsg"  class="userMsg" type="text" v-model="list2.classmsg"/></div>
    <div class="userItem"><span class="userText">寝室</span><input id="dorm"  class="userMsg" type="text" v-model="list2.dormi"/></div>
    <div class="userItem"><span class="userText">电话</span><input id="phone"  class="userMsg" type="text" v-model="list2.phone"/></div>
    <div class="btnBar"><button class="saveBtn" :disabled="isDisable" @click="save">保存</button><button class="backBtn" @click="backHome">返回</button></div>
  </div>
</template>

<script>
  import SaveBtn from '../../components/tabbar/SaveBtn'
  import Header from '../../components/header/Header'
  import eventBus from '../../eventBus'
  import {getUserMsg} from "../../network/user";
  import axios from 'axios';
  const qs = require('qs');


  export default {
        name: "User",
        components:{
          SaveBtn,
          Header,
        },
      created(){
          getUserMsg().then(res =>{
            this.list=res.item[0];
            console.log(this.list);
            this.list2.name=this.list.name;
            this.list2.sex=this.list.sex;
            this.list2.school=this.list.school;
            this.list2.dormi=this.list.dormi;
            this.list2.classmsg=this.list.classmsg;
            this.list2.phone=this.list.phone;
          });
      },
      data(){
        return{
          isDisable:true,
          list:{},
          value:'',
          field:'',
          list2:{
            pid:require('../../assets/img/headimg.jpg'),
            name:'银河',
            sex:'男',
            school:'四川旅游学院',
            classmsg:'2016级2班',
            dormi:'清雅居B2403',
            phone:'13551128161',
          },
          // imgUrl:require('../../assets/img/headimg.jpg'),
          // nickName:'银河',
          // sex:'男',
          // school:'四川旅游学院',
          // classmsg:'2016级2班',
          // dorm:'清雅居B2403',
          // phoneNum:'13551128161',

        }
      },
      methods:{
        fileChange(e) {
          let file = e.target.files[0];
          console.log(file);
          this.list2.pid = window.URL.createObjectURL(e.target.files[0]);
          console.log(window.URL.createObjectURL(e.target.files[0]));
        },
        save(){
          eventBus.$emit('getUrl',this.list2.pid);
          axios({
            url:'/api/users/update',
            method :'post',
            params:{
              value: this.value,
              id:this.list.id,
              field:this.field,
            },
          }).then(()=>{
            console.log(this.list2.name);
            alert("保存成功")
          });
        },
        backHome(){
          this.$router.replace('/home')
        }
      },
      watch:{
          list2:{
            handler:function () {
              this.isDisable=false;
            },
            deep:true
          },
        'list2.name':{
          handler:function (newData) {
            this.value=newData;
            this.field='name';
          }
        },
        'list2.sex':{
          handler:function (newData) {
            this.value=newData;
            this.field='sex';
          }
        },
        'list2.school':{
          handler:function (newData) {
            this.value=newData;
            this.field='school';
          }
        },
        'list2.classmsg':{
          handler:function (newData) {
            this.value=newData;
            this.field='classmsg';
          }
        },
        'list2.dormi':{
          handler:function (newData) {
            this.value=newData;
            this.field='dormi';
          }
        },
        'list2.phone':{
          handler:function (newData) {
            this.value=newData;
            this.field='phone';
          }
        },
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
    left: 84%;
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
    width: 6em;
    margin-left: 69%;
    text-align: right;
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
  /*#dorm{*/
  /*  width: 4.5em;*/
  /*}*/
  /*#phone{*/
  /*  width: 5.2em;*/
  /*}*/
  /*#school{*/
  /*  width: 5em;*/
  /*}*/
  /*#classmsg{*/
  /*  width: 5em;*/
  /*}*/
</style>
