import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex);

//2.创建对象
const store = new Vuex.Store({
  state:{
    dormi:'清雅居B2403',
    minute:'',
    userInfo:[],
  },
  mutations:{
    getUserInfo(state,data){
      state.userInfo=data;
      state.dormi=data.dormi;
    },
    getMinute(state,data){
      state.minute=data;
      console.log(state.minute);
    }
  },
  actions:{

  },
  getters:{

  },
  modules:{

  }
});

//3.导出store对象
export default store
