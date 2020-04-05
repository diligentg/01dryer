<template>
  <div style="height: 100% ;width: 100%;">
    <transition name="outer">
      <div class="outer" v-show="isShow"></div>
    </transition>
    <Header></Header>
    <!--    轮播-->
    <Swiper></Swiper>
<!--    <Roll></Roll>-->
    <!--    烘干机连接-->
      <transition name="btnDisappear">
        <Connection id="clickCon" v-show="isShow" @click.native="searchDevices()"></Connection>
      </transition>
      <div class="unCon" v-show="!isShow">
        <div class="ti1">
          未添加设备
        </div>
        <!--      <ul id="list1">-->
        <transition-group id="list1"  tag="ul" name="li1Appear">
          <!--        这里的Id01[index]想了很久，作为难点1，思维一直局限在遍历对象数组在操作数组-->
          <li class="li1" v-for="(item,index) in list01" :key="item" @click="creatConnection(Id01[index],index)"><pre>{{item}}</pre><pre class="pre1">|&nbsp点击连接&nbsp&nbsp</pre></li>
        </transition-group>
        <!--      </ul>-->
      </div>
      <div class="unCon" v-show="!isShow">
        <div class="ti1">
          已添加设备
        </div>
        <!--      <ul id="list2">-->
        <transition-group id="list2"  tag="ul" name="li1Appear">
          <li class="li2" v-for="(item,index) in list02" :key="item" @click="dryerUse(item)"><pre>{{item}}</pre><pre class="pre1">|&nbsp点击使用&nbsp&nbsp</pre></li>
        </transition-group>
        <!--      </ul>-->
      </div>

      <div class="recon">
        <button class="reconBtn" @click="recon" v-show="!isShow">返回</button>
      </div>
  </div>
</template>

<script>
  import Header from '../../components/header/Header'
  import Roll from "../../components/roll/Roll";
  import Swiper from '../../components/swiper/HomeSwiper'
  import Connection from '../../components/clickConnection/ClickConnection'
  export default {
    name: "Home",
    components: {
      Roll,
      Header,
      Connection,
      Swiper
    },
    data() {
      return {
        list01:[],
        list02:[],
        Id01:[],
        Id02:[],
        isShow:true,
        bleStatus:""
      }
    },
    methods: {
      searchDevices() {
        let that=this;
        that.isShow=false;
        let main = plus.android.runtimeMainActivity();

        let BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
        let BAdapter = new BluetoothAdapter.getDefaultAdapter();

        let BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
        let bdevice = new BluetoothDevice();

        let IntentFilter = plus.android.importClass('android.content.IntentFilter');
        let filter = new IntentFilter();

        let vlist1 = document.getElementById('list1'); //注册容器用来显示未配对设备
        vlist1.innerHTML = ''; //清空容器
        let resultDiv = document.getElementById('btn');
        BAdapter.startDiscovery(); //开启搜索
        console.log("开始搜索设备");
        let receiver=plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
          onReceive: function(context, intent) { //实现onReceiver回调函数
            plus.android.importClass(intent);
            console.log(intent.getAction());
            if(intent.getAction() === "android.bluetooth.adapter.action.DISCOVERY_FINISHED"){
              main.unregisterReceiver(receiver);//取消监听
              alert('停止搜索');
              console.log("搜索结束")
            }else{
              let BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
              //判断是否配对
              if (BleDevice.getBondState() === bdevice.BOND_NONE) {
                console.log("未配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                //参数如果跟取得的mac地址一样就配对
                if(BleDevice.getName() != null ){ //判断防止重复添加
                  that.list01.push(BleDevice.getName());
                  that.Id01.push(BleDevice.getAddress());
                }
              }else{
                if(BleDevice.getName() != null){ //根据Id02是否为空两个情况，防止重复添加，难点3
                  if (that.Id02.length === 0){
                    console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                    that.list02.push(BleDevice.getName());
                    that.Id02.push(BleDevice.getAddress());
                  }else {
                    for (let i = 0; i <that.Id02.length ; i++) {
                      if (BleDevice.getAddress()!==that.Id02[i]){
                        console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                        that.list02.push(BleDevice.getName());
                        that.Id02.push(BleDevice.getAddress());
                      }
                    }
                  }
                }
              }
            }
          },
        });
        let Intent = plus.android.importClass('android.content.Intent');

        filter.addAction(BAdapter.ACTION_STATE_CHANGED); //监听蓝牙开关
        filter.addAction(bdevice.ACTION_FOUND);
        filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
        filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
        filter.addAction(BAdapter.ACTION_STATE_CHANGED);
        main.registerReceiver(receiver, filter); //注册监听


        if (!BAdapter.isEnabled()) {
          let con=confirm("是否开启蓝牙？")
          if(con===true){
            BAdapter.enable(); //启动蓝牙
            alert('蓝牙已开启');
          }else{
            alert('蓝牙未开启');
            that.isShow=true;
          }
        }else{
          //    BAdapter.disable();
          // alert('蓝牙关闭');
        }
      },
      //分离出添加设备的操作,难点2
      creatConnection(addr,Index){
        let that = this;
        console.log(addr);
        let main = plus.android.runtimeMainActivity();

        let BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
        let BAdapter = new BluetoothAdapter.getDefaultAdapter();

        let BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
        let bdevice = new BluetoothDevice();

        let IntentFilter = plus.android.importClass('android.content.IntentFilter');
        let filter = new IntentFilter();

        BAdapter.startDiscovery();
        let receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
          onReceive: function(context, intent) { //实现onReceiver回调函数
            plus.android.importClass(intent);
            console.log(intent.getAction());
            if (intent.getAction() === "android.bluetooth.adapter.action.DISCOVERY_FINISHED") {
              main.unregisterReceiver(receiver); //取消监听
              console.log("搜索结束")
            } else {
              let BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
              //判断是否配对
              if (BleDevice.getBondState() === bdevice.BOND_NONE) {
                console.log("未配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                //参数如果跟取得的mac地址一样就配对
                if (addr === BleDevice.getAddress()) {
                  if (BleDevice.getName()==='Dryer-01'){
                    that.list02.push(BleDevice.getName());
                    that.Id02.push(BleDevice.getAddress());
                    //难点，添加后删除未添加的项
                    that.list01.splice(Index,1);
                    alert('添加成功');
                  }else {
                    if (BleDevice.createBond()) {
                      //配对命令.createBond()
                      console.log("配对成功");
                      that.list02.push(BleDevice.getName());
                      that.Id02.push(BleDevice.getAddress());
                      that.list01.splice(Index,1);
                      alert('添加成功');
                    }
                  }
                }
              }
            }
          },
        });

        let Intent = plus.android.importClass('android.content.Intent');

        filter.addAction(BAdapter.ACTION_STATE_CHANGED); //监听蓝牙开关
        filter.addAction(bdevice.ACTION_FOUND);
        filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
        filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
        filter.addAction(BAdapter.ACTION_STATE_CHANGED);
        main.registerReceiver(receiver, filter); //注册监听
      },
      recon(){
        this.isShow=!this.isShow;
      },
      dryerUse(item){
        let that=this;
        if (item==="Dryer-01") {
          // 打开蓝牙模块
            plus.bluetooth.openBluetoothAdapter({
              success:function(e){
                console.log('open success: '+JSON.stringify(e));
                //连接
                plus.bluetooth.createBLEConnection({
                  deviceId:"90:9A:77:2B:85:0B",
                  success:function(e){
                    console.log('create connection success: '+JSON.stringify(e));
                    that.bleStatus=e.code;
                    if (that.bleStatus===0){
                      that.$router.push('/dryerUse');
                    }
                  },
                  fail:function(e){
                    console.log('create connection failed: '+JSON.stringify(e));
                  }
                });
              },
              fail:function(e){
                console.log('open failed: '+JSON.stringify(e));
              }
            });
        }else {
          that.$router.push('/dryerUse');
        }
      }
    }
  }
</script>

<style scoped>
  .outer{
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    height: 100%;
    width: 100%;
    top:0;
    position: absolute;
  }
  ul,li{
    list-style:none;
    padding:0;
    margin:0;
  }
  .unCon,.recon{
    text-align: center;
  }
  .ti1{
    margin-bottom: 15px;
    margin-top: 15px;
    font-size: 1.3em;
  }
  .li1,.li2{
    /*background-image: linear-gradient(to left, #ff9569 0%, #e92758 100%);*/
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    color: white;
    border-radius: 1em;
    height: 2em;
    font-size: 1.2em;
    margin: 0.3em auto 0.6em auto;
    width: 18em;
    line-height: 0.45em;
  }
  .li2{
    background-image: linear-gradient(to right, #FB7C97 0%, #FF9968 100%);
  }
  .reconBtn{
    height: 3em;
    width: 3em;
    border-radius: 50%;
    font-size: 1.2em;
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    border: none;
    color: white;
  }

  .outer-enter-active {
    animation: bounce-in .55s ;
    position: absolute;
  }
  .outer-leave-active {
    animation: bounce-in .55s reverse;
    position: absolute;
  }

  .btnDisappear-enter-active {
    animation: bounce-in .5s;
    position: absolute;
  }
  .btnDisappear-leave-active {
    animation: bounce-in .5s reverse;
    position: absolute;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .li1Appear-enter,.li1Appear-leave-to{
    opacity: 0;
    transform: translateX(80px);
  }

  .li1Appear-enter-active,.li1Appear-leave-active{
    transition: all 0.6s ease;
  }

  /*v-move 和 v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */

  .li1Appear-move{
    transition: transform 0.6s ;
  }
  .li1Appear-leave-active {
    position: absolute;
  }
  pre{
    display: inline-block;
  }
  .pre1{
    float: right;
  }
</style>
