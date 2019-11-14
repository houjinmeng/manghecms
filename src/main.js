// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入全局样式控制文件
import './assets/css/index.css'
import './assets/js/flexable.js'
// 引入vant-ui
import Vant from 'vant'
import 'vant/lib/index.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'

Vue.use(Vant)
Vue.use(Element)
// axios请求根地址
axios.defaults.baseURL = 'http://192.168.1.144:9999/api/'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
