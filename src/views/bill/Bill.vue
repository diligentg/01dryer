<template>
  <div>
    <Header><BackHomeIcon></BackHomeIcon></Header>
    <div class="info" v-for="(item,index) in billList">
      <div class="infoItem"><span class="le">消费类型</span><span class="ri">{{item.usetype}}</span></div>
      <div class="infoItem"><span class="le">消费状态</span><span class="ri">{{item.consumestatus}}</span></div>
      <div class="infoItem"><span class="le">支付方式</span><span class="ri">{{item.way}}</span></div>
      <div class="infoItem"><span class="le">消费时间</span><span class="ri">{{item.consumetime}}</span></div>
      <div class="infoItem"><span class="le">消费地点</span><span class="ri">{{item.location}}</span></div>
      <div class="infoItem"><span class="le">实际支付</span><span class="ri">{{item.pay}}</span></div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header/Header';
  import BackHomeIcon from '../../components/header/BackHomeIcon'
  import axios from 'axios';
  const qs = require('qs');
    export default {
        name: "Bill",
      components:{
        Header,
        BackHomeIcon
      },
      data(){
        return{
          billList:{}
        }
      },
      created() {
          axios({
            url:'/api/costs/selectAll',
            method:'post',
          }).then((res)=>{
            this.billList=res.data.item;
            console.log(this.billList);
          })
      }
    }
</script>

<style scoped>
  .info{
    width: 20em;
    background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
    top: 15%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;
    position: relative;
    border-radius: 20px;
  }
  .infoItem{
    font-size: 1em;
    position: relative;
    height: 2em;
    color: white;
    line-height: 2em;
  }
  .le{
    margin-left: .5em;
  }
  .ri{
    float: right;
    margin-right: 1em;
    font-size: .9em;
  }
</style>
