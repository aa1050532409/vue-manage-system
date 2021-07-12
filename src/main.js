import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import elementUI from "./elementUI"

// 全局样式表
import  './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

Vue.prototype.$axios = axios

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
