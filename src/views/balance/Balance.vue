<template>
    <div id="balance">
      <Header></Header>
      <div class="balanceContent">
        <div class="text">我的余额</div>
        <div class="remainNum">{{remain}}元</div>
        <div class="recharge-shell">
          <div class="recharge-item"
               v-for="(item,index) in amount"
               :class="{active:index===currentIndex}"
               @click="licIndex(index,item)">{{item}}
          </div>
        </div>
        <div class="total">共计{{total}}</div>
        <div class="recharge">立即充值</div>
      </div>
    </div>
</template>

<script>
  import Header from '../../components/header/Header'
  import axios from 'axios'
    export default {
        name: "Balance",
      components:{
        Header
      },
      data(){
          return{
            remain:'10',
            amount:['10','20','50','100','150','200'],
            currentIndex:0,
            total:''
          }
      },
      methods:{
          licIndex(index,item){
            this.currentIndex=index;
            this.total=item;
          }
      },
      created() {
          axios({
            method:'post',
            url:'/api/balances/selectAll'
          }).then((res)=>{
            console.log(res);
            this.remain=res.data.item[0].remain;
          })
      }
    }
</script>

<style scoped>
#balance{
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
}
  .balanceContent{
    height: 25em;
    width: 22em;
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
  .recharge{
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
    top: 10%;
  }
  .recharge-shell{
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
