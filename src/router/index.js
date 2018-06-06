import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import testRoutes from './testIndex'
import Home from '@/pages/Home'
import Home1 from '@/pages/Home1'
// import Test from '@/test/Test'
// import eltest from '@/test/eltest'
import ellayout2 from '@/test/ElLayout2'
import ellayout21 from '@/test/ElLayout2.1'
import gridLayoutTest from '@/test/gridLayoutTest'
import tableTest from '@/test/TableTest'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/Home',
    name: 'Home',
    component: Home
  }, {
    path: '/Home1',
    name: 'Home1',
    component: Home1
  }, {
    path: '/ellayout2',
    name: 'ellayout2',
    component: ellayout2
  }, {
    path: '/ellayout21',
    name: 'ellayout21',
    component: ellayout21
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

testRoutes.forEach(e => {
  routes.push(e)
})

export default new Router({
  routes: routes
})
