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
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import 'font-awesome/css/font-awesome.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'

// Vue.use(iView)
Vue.use(ElementUI)
// Vue.use(GridLayout)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$moment = moment

// 添加全局过滤器
Vue.filter('yyyy_MM_dd', function (value) {
   return moment(value).format('YYYY-MM-DD')
})

// axios全局拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  ElementUI.Message.error('操作失败')
  return Promise.reject(error)
})

window.CONSTANT = CONSTANT
CONSTANT.API_URL = ApiUrl
buildUrl(CONSTANT.API_URL.ORIGIN, ApiUrl)
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
