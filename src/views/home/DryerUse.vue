<template>
  <div id="dryerUse">
    <Header></Header>
    <div class="inUse">
      <div class="inUseMsg">{{inUseMsg}}</div>
      <input class="minute" type="text" v-model="minute" maxlength="2" max="59" min="0">
      <input class="mimi" type="text" value=":">
      <input class="second" type="text" v-model="second" maxlength="2" max="59" min="0">
      <div class="useTypeShell">
        <div
          v-for="(item,index) in useType"
          class="typeItem"
          :class="{active:index===currentIndex}"
          @click="chooseType(item,index)" >{{item}}</div>
      </div>
    </div>
    <div class="fire-center">
      <button  class="fire" :disabled="isOnce" @click="timeBegin">开始</button>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header/Header';
  import eventBus from '../../eventBus'
  export default {
    name: "DryerUse",
    components:{
      Header
    },
    data(){
      return{
        useType:['烘干','杀菌'],
        inUseMsg:'选择服务和时间',
        currentType:'烘干',
        currentIndex:0,
        minute:'00',
        second:'00',
        zero:0,
        isOnce:false,
      }
    },
    methods:{
      chooseType(item,index){
        this.currentType=item;
        this.currentIndex=index;
      },
      timeBegin(){
        // eventBus.$emit('getType',this.currentType);
        this.$store.commit('getType',this.currentType);
        this.$store.commit('getMinute',this.minute);
        //设置区间
        if (this.minute<0||this.minute>59||this.second<0||this.second>59){
          alert('区间为0-59');
        }else if (this.minute==0&&this.second==0) {
          alert('请选择时间');
        }
        else {
          this.isOnce=!this.isOnce;
          this.inUseMsg='正在'+this.currentType+'中';
          //倒计时
          let timer=setInterval(() => {
            if (this.second<0.999){
              this.second=60;
              this.minute--;
            }
            this.second--;
            //单数时第一位为0
            this.zero1;
            this.zero2;
            //计时完成停止
            if (this.minute<0){
              this.second= '00';
              this.minute='00';
              clearInterval(timer);
              console.log('结束');
              plus.bluetooth.closeBLEConnection({
                deviceId:"90:9A:77:2B:85:0B",
                success:function(e){
                  console.log('close success: '+JSON.stringify(e));
                  plus.bluetooth.closeBluetoothAdapter({
                    success:function(e){
                      console.log('close success: '+JSON.stringify(e));
                    },
                    fail:function(e){
                      console.log('close failed: '+JSON.stringify(e));
                    }
                  });
                },
                fail:function(e){
                  console.log('close failed: '+JSON.stringify(e));
                }
              });
              this.$router.push('/consumeInfo');
            }
          }, 1000);
        }
      }
    },
    computed:{
      zero2:function () {
        if (this.second>=0&&this.second<10) {
          return this.second='0'+this.second;
        }
      },
      zero1:function () {
        if (this.minute>=0&&this.minute<10) {
          this.minute='0'+this.minute;
        }
      },
    }
  }
</script>

<style scoped>
  #dryerUse{
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
  }
  .inUse{
    background-color: white;
    position: relative;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    height: 20em;
    width: 20em;
    border-radius: 50%;
    text-align: center;
    vertical-align: center;
  }
  .inUseMsg{
    top: 20%;
    position: relative;
    font-size: 2em;
    /*font-family: "YouYuan",serif;*/
  }
  .minute,.second,.mimi{
    border: none;
    outline: none;
    position: absolute;
    width: 1.1em;
    font-size: 2.5em;
  }
  .second{
    top: 50%;
    left: 50%;
    transform: translate(75%, -50%);
  }
  .minute{
    top: 50%;
    left: 25%;
    transform: translate(0%, -50%);
  }
  .mimi{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    width: .2em;
  }
  .useTypeShell{
    display: flex;
    justify-content: space-evenly;
    position: relative;
    width: 55%;
    top: 60%;
    margin: auto;
  }
  .typeItem{
    border: 1px solid #757474;
    height: 2em;
    line-height: 2em;
    width: 35%;
    border-radius: 20px;
  }
  .active{
    background-color: #cf2f05;
    color: white;
  }
  .fire-center{
    position: relative;
    text-align: center;
    top: 15em;
  }
  .fire{
    position: relative;
    font-size: 1.5em;
    border-radius: 1em;
    width: 10em;
    height: 1.5em;
    text-align: center;
    border: 1.5px solid white;
    outline: none;
    color: white;
    line-height: 1.3em;
    font-family: inherit;
    background-image: linear-gradient(to left, #CC6533 0%, #CC4C33 50%,#CC3433 100%);
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
  .fire:active {
    animation-name: bounce-in ;
    animation-duration: .3s;
  }
</style>
