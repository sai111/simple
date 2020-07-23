import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import VueMaterial from 'vue-material'
import axios from 'axios'
// import VueMaterialMd from './lib/vue-material-md/index.js'
/** css */
import 'material-design-icons/iconfont/material-icons.css'
import 'vue-material/dist/vue-material.min.css'
import '@/assets/scss/index.scss'

Vue.use(VueMaterial)
Vue.prototype.$http = axios
// Vue.use(VueMaterialMd)
Vue.config.productionTip = false
// Vue.defaults.widthCredentials = true // 允许请求携带cookie

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
