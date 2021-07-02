import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueSuperFlow from '@/view/VueSuperFlow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vue-super-flow',
      name: 'VueSuperFlow',
      component: VueSuperFlow
    }
  ]
})
