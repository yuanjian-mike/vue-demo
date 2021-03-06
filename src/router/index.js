import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueSuperFlow from '@/view/VueSuperFlow'
import Plumb from '@/view/Plumb'
import VueTreeChat from '@/view/VueTreeChat'
import TreeData from '@/view/TreeData'

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
    },
    {
      path: '/plumb',
      name: 'Plumb',
      component: Plumb
    },
    {
      path: '/vue-tree-chart',
      name: 'VueTreeChat',
      component: VueTreeChat
    },
    {
      path: '/tree-data',
      name: 'TreeData',
      component: TreeData
    }
  ]
})
