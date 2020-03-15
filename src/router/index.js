import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('../views/home/Home')
const DryerUse = ()=> import('../views/home/DryerUse')
const Bill = ()=> import('../views/bill/Bill')
const Balance = ()=> import('../views/balance/Balance')
const Fix = ()=> import('../views/fix/Fix')
const Header = ()=> import('../components/header/Header')
const User = ()=> import('../views/user/User')
const Aside = ()=> import('../components/tabbar/Aside')


Vue.use(VueRouter)

const routes=[
  // {
  //   path:'',
  //   redirect:'/user',
  //   name:"user",
  //   component:User
  // },
  {
    path:'',
    redirect:'/home',
    name:"home",
    component:Home
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:'首页'
    }
  },
  {
    path:'/dryerUse',
    component:DryerUse,
    meta:{
      title:'烘干机使用'
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
      title:'余额',
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
