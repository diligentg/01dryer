<template>
    <div id="balance">
      <Header></Header>
      <div class="balanceContent">
        <div class="text">我的余额</div>
        <div class="remainNum">{{remain}}元</div>
        <div class="amount-shell">
          <div class="recharge-item"
               v-for="(item,index) in amount"
               :class="{active:index===currentIndex}"
               @click="licIndex(index,item)">{{item}}
          </div>
        </div>
        <div class="total">共计{{total}}</div>
        <div class="recharge-shell">
          <a :href="payString">
            <button class="recharge" @click="recharge" :disabled="isDisabled">立即充值</button>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '../../components/header/Header'
  import axios from 'axios'
  import {request} from "../../network/request"
    export default {
        name: "Balance",
      components:{
        Header
      },
      data(){
          return{
            remain:'10',
            amount:['10','20','50','100','150','200'],
            currentIndex:'',
            total:null,
            orderString:'',
            payString:'',
            isDisabled:true,
          }
      },
      methods:{
          licIndex(index,item){
            this.currentIndex=index;
            this.total=item;
            this.isDisabled=false;
            //难点
            request({
              method:'post',
              url:'/balances/alipay',
              params:{
                count:this.total,
              }
            }).then((res)=>{
              console.log(res);
              this.payString=res;
              // this.orderString=res.data;
            })
          },
        recharge(){
          request({
            method:'post',
            url:'/balances/recharge',
            params:{
              value:this.total,
              id:'1',
              field:'remain',
            }
          }).then(()=>{
            console.log('充值成功');
          });
        }
      },
      created() {
          request({
            url:'/balances/selectAll',
            method:'post',
          }).then((res)=>{
            console.log(res);
            this.remain=res.item[0].remain;
          })
      }
    }
</script>

<style scoped>
  a{
    -webkit-tap-highlight-color: transparent; outline: none;
    text-decoration:none;
    display: contents;
  }
#balance{
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
}
  .balanceContent{
    height: 50%;
    width: 94%;
    background-color: white;
    top: 8%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    border-radius: 20px;
  }
  .text{
    line-height: 2em;
    margin-left: 5%;
    font-size: 1.1em;
  }
  .remainNum{
    margin-left: 5%;
    font-size: 2em;
  }
  .total{
    text-align: center;
    position: relative;
    top: 5%;
    font-size: 1.1em;
  }
  .recharge-shell{
    text-align: center;
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
  .recharge{
    outline: none;
    border: none;
    margin: auto;
    position: relative;
    background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
    color: white;
    font-size: 1.2em;
    height: 2em;
    width: 30%;
    line-height: 2em;
    text-align: center;
    border-radius: 20px;
    top: 2.5em;
  }
  .recharge:active{
    animation-name: bounce-in ;
    animation-duration: .3s;
  }
  .amount-shell{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10%;
  }
  .recharge-item{
    height: 2em;
    border: 1px solid #757474;
    font-size: 1.3em;
    line-height: 2em;
    width: 4em;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 5%;
  }
  .active{
    border-color: #cf2f05;
  }
</style>
