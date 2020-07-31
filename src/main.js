import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/** css */
import '@/assets/scss/index.scss'

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.defaults.widthCredentials = true // 允许请求携带cookie

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
