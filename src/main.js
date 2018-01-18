// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

window.CONSTANT = {}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// function buildUrl (domain, apiUrlObj) {
//   if (!(apiUrlObj instanceof Object)) return
//   for (let item in apiUrlObj) {
//     if (apiUrlObj[item] instanceof Object) {
//       buildUrl(domain, apiUrlObj[item])
//     } else {
//       apiUrlObj[item] = domain + apiUrlObj[item]
//     }
//   }
// }
