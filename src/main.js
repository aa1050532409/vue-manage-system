import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import elementUI from "./elementUI"

// 全局样式表
import  './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

//axios.defaults.baseURL = "http://47.115.124.102:8888/api/private/v1/"
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
