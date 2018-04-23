import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
// import Test from '@/test/Test'
// import eltest from '@/test/eltest'
import ellayout2 from '@/test/ElLayout2'
import gridLayoutTest from '@/test/gridLayoutTest'
import tableTest from '@/test/TableTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/Home',
      name: 'Home',
      component: Home
    }, {
      path: '/ellayout2',
      name: 'ellayout2',
      component: ellayout2
    }, {
      path: '/gridLayoutTest',
      name: 'gridLayoutTest',
      component: gridLayoutTest
    }, {
      path: '/tableTest',
      name: 'tableTest',
      component: tableTest
    }
  ]
})
