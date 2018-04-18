// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ApiUrl from './commons/ApiUrl'
import CONSTANT from './commons/constant'
import ResponseCode from './commons/ResponseCode'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import 'font-awesome/css/font-awesome.css'

Vue.use(iView)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$moment = moment

// 添加全局过滤器
Vue.filter('yyyy_MM_dd', function (value) {
   return moment(value).format('YYYY-MM-DD')
})

buildUrl('http://192.168.199.113:8081/readygo/', ApiUrl)
window.CONSTANT = CONSTANT
CONSTANT.API_URL = ApiUrl
CONSTANT.API_URL.ORIGIN = 'http://192.168.199.113:8081/readygo/'
CONSTANT.ResponseCode = ResponseCode
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

function buildUrl (domain, apiUrlObj) {
  if (!(apiUrlObj instanceof Object)) return
  for (let item in apiUrlObj) {
    if (apiUrlObj[item] instanceof Object) {
      buildUrl(domain, apiUrlObj[item])
    } else {
      apiUrlObj[item] = domain + apiUrlObj[item]
    }
  }
}
