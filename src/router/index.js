import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/main/login'
import home from '@/components/main/home'
// 设备管理
import machinelist from '@/components/machine/machinelist'
import machineEdit from '@/components/machine/machineEdit'
import Positions from '@/components/machine/Positions'
import outgoods from '@/components/machine/outgoods'
import huodao from '@/components/machine/huodao'
import sucai from '@/components/machine/sucai'
// 注册设备
import addmachine from '@/components/main/addmachine'
// 经营统计
import statistics from '@/components/statistics/index'
import market from '@/components/statistics/market'
import staOrder from '@/components/statistics/order'
import refund from '@/components/statistics/refund'
import goods from '@/components/statistics/goods'
import store from '@/components/statistics/store'
import machine from '@/components/statistics/machine'
import refundDoor from '@/components/statistics/refundDoor'
import refundMachine from '@/components/statistics/refundMachine'
import refundStore from '@/components/statistics/refundStore'
// 订单管理
import order from '@/components/main/order'
// 门店管理
import Store from '@/components/main/store'
// 仓库管理
import entrepot from '@/components/entrepot/index'
import entrepotMachine from '@/components/entrepot/machine'
import entrepotPerson from '@/components/entrepot/person'
import entrepotPool from '@/components/entrepot/POOL'
import entrepotStore from '@/components/entrepot/store'
import entrepotName from '@/components/entrepot/editname'
import entrepotCheck from '@/components/entrepot/check'
// 商品管理
import goodsList from '@/components/main/goodsList'
// 用户管理
import user from '@/components/user/user'
import Manager from '@/components/user/Manager'
import goodsman from '@/components/user/goodsMan'
import userMachine from '@/components/user/machine'
import kuguan from '@/components/user/kuguan'
import another from '@/components/user/another'
import adduser from '@/components/user/adduser'
// 补货管理
import addgoods from '@/components/addgoods/index'
import photos from '@/components/addgoods/photos'
import everymachine from '@/components/addgoods/everymachine'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/home', component: home },
    { path: '/machinelist', component: machinelist },
    { path: '/machineEdit', component: machineEdit },
    { path: '/addmachine', component: addmachine },
    { path: '/Positions', component: Positions},
    { path: '/outgoods', component: outgoods },
    { path: '/statistics', component: statistics, redirect:'/statistics/market',
      children:[
        { path:'/statistics/market', component: market },
        { path:'/statistics/order', component: staOrder },
        { path:'/statistics/refund', component: refund },
        { path:'/statistics/goods', component: goods },
    ]},
    { path: '/market/store', component: store },
    { path: '/market/machine', component: machine },
    { path: '/refundDoor', component: refundDoor },
    { path: '/refundMachine', component: refundMachine },
    { path: '/refundStore', component: refundStore },
    { path: '/order', component: order },
    { path: '/store', component: Store },
    { path: '/entrepot', component: entrepot, redirect:'/entrepot/pool',
      children:[
        { path:'/entrepot/pool', component: entrepotPool },
        { path:'/entrepot/store', component: entrepotStore },
        { path:'/entrepot/machine', component: entrepotMachine },
        { path:'/entrepot/person', component: entrepotPerson },
    ]},
    { path: '/entrepot/editname', component: entrepotName },
    { path: '/entrepot/check', component: entrepotCheck },
    { path: '/goodsList', component: goodsList },
    { path: '/user',  component: user },
    { path: '/user/manager', component: Manager },
    { path: "/user/goodsman", component: goodsman },
    { path: '/user/machine', component: userMachine },
    { path: '/user/kuguan', component: kuguan },
    { path: '/user/another', component: another },
    { path: '/addgoods', component: addgoods },
    { path: '/addgoods/photos', component: photos },
    { path: '/adduser', component: adduser },
    { path: '/huodao', component: huodao },
    { path: '/everymachine', component: everymachine},
    { path: '/sucai', component: sucai}
  ]
})
export default router
