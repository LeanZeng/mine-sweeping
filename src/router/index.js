import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import ClassicalMode from '@/components/modes/ClassicalMode'
import HoneycombMode from '@/components/modes/HoneycombMode'
import TimedMode from '@/components/modes/TimedMode'
import TwoPlayerMode from '@/components/modes/TwoPlayerMode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/classicalMode',
      name: 'ClassicalMode',
      component: ClassicalMode
    },
    {
      path: '/honeycombMode',
      name: 'HoneycombMode',
      component: HoneycombMode
    },
    {
      path: '/timedMode',
      name: 'TimedMode',
      component: TimedMode
    },
    {
      path: '/twoPlayerMode',
      name: 'TwoPlayerMode',
      component: TwoPlayerMode
    }
  ]
})
