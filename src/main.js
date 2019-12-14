// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import Vue from 'vue'
import axios from 'axios'
import printJS    from 'print-js'
import qs from 'qs'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$printJS=printJS
axios.defaults.baseURL = "http://127.0.0.1:8081/"

Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
