<template>
  <div id="consumeInfo">
    <Header></Header>
    <div class="info">
      <div class="infoItem"><span class="le">消费类型</span><span class="ri">{{list.usetype}}</span></div>
      <div class="infoItem"><span class="le">消费状态</span><span class="ri">{{list.consumestatus}}</span></div>
      <div class="infoItem"><span class="le">支付方式</span><span class="ri">{{list.way}}</span></div>
      <div class="infoItem"><span class="le">消费时间</span><span class="ri">{{list.consumetime}}</span></div>
      <div class="infoItem"><span class="le">消费地点</span><span class="ri" v-model="list.location">{{list.location}}</span></div>
      <div class="infoItem"><span class="le">实际支付</span><span class="ri">{{list.pay}}</span></div>
    </div>
    <div class="backHome">
      <button class="backHomeBtn" @click="backHome">返回</button>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header/Header';
  import eventBus from '../../eventBus'
  import axios from 'axios';
  const qs = require('qs');
    export default {
        name: "ConsumeInfo",
      components:{
          Header
      },
      data(){
          return{
            list:{
              usetype:'烘干',
              consumestatus:'交易成功',
              way:'余额',
              consumetime:'123',
              location:'',
              pay:'1 元',
            }
          }
      },
      methods:{
        getTime(){
         this.list.consumetime= new Date().toLocaleString('chinese',{hour12:false});
        },
        backHome(){
          this.$router.replace('/home')
        }
      },
      created() {
          this.getTime();
          this.list.usetype=this.$store.state.type;
          this.list.pay= this.$store.state.minute*0.1+" 元";
          this.list.location=this.$store.state.dormi;
          // let info=JSON.stringify(this.list);
        axios({
          url:'/api/costs/add',
          method :'post',
          params:{
            cost:this.list,
          },
          paramsSerializer:function (cost) {
            console.log(cost.cost);
            return qs.stringify(cost.cost);
          }
        }).then(()=>{
          console.log('添加成功');
        })
      },
    }
</script>

<style scoped>
#consumeInfo{
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
}
  .info{
    width: 22em;
    background-color: white;
    top: 15%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    border-radius: 20px;
  }
  .infoItem{
    /*font-size: 1.15em;*/
    position: relative;
    border-bottom: 1px solid #9e9e9e45;
    height: 3em;
    line-height: 3em;
  }
  .le{
    margin-left: .5em;
  }
  .ri{
    float: right;
    margin-right: 1em;
    font-size: .9em;
  }
.backHome{
  text-align: center;
  position: relative;
  top:15em;
}
  .backHomeBtn{
    height: 3em;
    width: 3em;
    border-radius: 50%;
    font-size: 1.2em;
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    border: 2px solid white;
    outline: none;
    color: white;
  }
</style>
