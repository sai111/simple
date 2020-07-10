import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import VueMaterial from 'vue-material'
// import VueMaterialMd from './lib/vue-material-md/index.js'
/** css */
import 'vue-material/dist/vue-material.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import '@/assets/scss/index.scss'

Vue.use(VueMaterial)
// Vue.use(VueMaterialMd)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
