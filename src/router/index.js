import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Test from '@/pages/Test'
import eltest from '@/test/eltest'
import ellayout1 from '@/test/ElLayout1'

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
      component: Home,
      children: [{
        path: '/Test',
        name: 'Test',
        component: Test
      }]
    }, {
      path: '/eltest',
      name: 'eltest',
      component: eltest
    }, {
      path: '/ellayout1',
      name: 'ellayout1',
      component: ellayout1
    }
  ]
})
