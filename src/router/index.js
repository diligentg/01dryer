import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsumeInfo from "../views/home/ConsumeInfo";

const Home = ()=> import('../views/home/Home');
const DryerUse = ()=> import('../views/home/DryerUse');
const Bill = ()=> import('../views/bill/Bill');
const Balance = ()=> import('../views/balance/Balance');
const Fix = ()=> import('../views/fix/Fix');
const Header = ()=> import('../components/header/Header');
const User = ()=> import('../views/user/User');
const Aside = ()=> import('../components/tabbar/Aside');
const Login = ()=> import('../views/login/Login');


Vue.use(VueRouter)

const routes=[
  {
    path:'',
    redirect:'/login',
    name:"login",
    component:Login
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:'首页'
    }
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/dryerUse',
    component:DryerUse,
    meta:{
      title:'烘干机使用'
    }
  },
  {
    path:'/consumeInfo',
    component:ConsumeInfo,
    meta:{
      title:'费用结算'
    }
  },
  {
    path:'/header',
    name:'header',
    component:Header
  },
  {
    path:'/aside',
    name:'aside',
    component:Aside
  },
  {
    path:'/user',
    name:'user',
    component:User,
    meta:{
      title:'个人',
    }
  },
  {
    path:'/bill',
    name:'bill',
    component:Bill,
    meta:{
      title:'账单',
    }
  },
  {
    path:'/balance',
    name:'balance',
    component:Balance,
    meta:{
      title:'钱包',
    }
  },
  {
    path:'/fix',
    name:'fix',
    component:Fix,
    meta:{
      title:'报修',
    }
  }
];

const router = new VueRouter({
  //设置url和组件的映射
  routes,
  //将浏览器的url的哈希模式改为history模式
  // mode:'history'
  mode:'hash'
});


//将router对象传到Vue实例
export default router
