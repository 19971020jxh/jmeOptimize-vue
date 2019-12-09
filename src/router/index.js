import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navbar from '@/components/navbar'
import shuJuWeiHu from '@/yewu/shuJuWeiHu'
import xiaoLvQuXian from '@/yewu/xiaoLvQuXian'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: navbar
    },
    {
      path: '/shuJuWeiHu',
      name: 'shuJuWeiHu',
      component: shuJuWeiHu
    },
    {
      path: '/xiaoLvQuXian',
      name: 'xiaoLvQuXian',
      component: xiaoLvQuXian
    },
  ]
})
