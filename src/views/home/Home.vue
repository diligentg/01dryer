<template>
  <div>
    <Header></Header>
    <!--    轮播-->
    <Roll></Roll>
    <!--    烘干机连接-->
    <Connection id="clickCon" @click.native="searchDevices('c')"></Connection>
    <div>
      未配对蓝牙设备
      <ul id="list1">
        <!--        这里的Id01[index]想了很久，作为难点，思维一直局限在遍历对象数组在操作数组-->
        <li v-for="(item,index) in list01" :key="index" @click="creatConnection(Id01[index])">{{item}}</li>
      </ul>
    </div>
    <div>
      已配对蓝牙设备
      <ul id="list2">
        <li v-for="(item,index) in list02" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  function fff() {
    alert('123')
  }

  import Header from '../../components/header/Header'
  import Roll from "../../components/roll/Roll";
  import Connection from '../../components/clickConnection/ClickConnection'
  export default {
    name: "Home",
    components: {
      Roll,
      Header,
      Connection
    },
    data() {
      return {
        list01:[],
        list02:[],
        Id01:[],
        Id02:[],
      }
    },
    methods: {
      searchDevices(address) {
        let that=this;
        let main = plus.android.runtimeMainActivity();

        let BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
        let BAdapter = new BluetoothAdapter.getDefaultAdapter();

        let BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
        let bdevice = new BluetoothDevice();

        let IntentFilter = plus.android.importClass('android.content.IntentFilter');
        let filter = new IntentFilter();

        var on = null;
        var un = null;
        let vlist1 = document.getElementById('list1'); //注册容器用来显示未配对设备
        vlist1.innerHTML = ''; //清空容器
        // let vlist2 = document.getElementById('list2'); //注册容器用来显示配对设备
        // vlist2.innerHTML = ''; //清空容器
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
                  if(BleDevice.getName() !== on ){ //判断防止重复添加
                    on = BleDevice.getName();
                    that.list01.push(on);
                    that.Id01.push(BleDevice.getAddress());
                  }
              }else{
                if(BleDevice.getName() !== un ){ //判断防止重复添加
                  console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                  un = BleDevice.getName();
                  that.list02.push(un);
                  that.Id02.push(BleDevice.getAddress());
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
          }
        }else{
          //    BAdapter.disable();
          // alert('蓝牙关闭');
        }
      },
      //分离出田添加设备的操作
      creatConnection(addr){
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
                  if (BleDevice.createBond()) { //配对命令.createBond()
                    console.log("配对成功");
                    that.list02.push(BleDevice.getName());
                    that.Id02.push(BleDevice.getAddress());
                    alert('添加成功');
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
      }
    }
  }
</script>

<style scoped>

</style>
