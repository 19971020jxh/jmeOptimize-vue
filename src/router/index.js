import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navbar from '@/components/navbar'
import shuJuWeiHu from '@/yewu/shuJuWeiHu'
import xiaoLvQuXian from '@/yewu/xiaoLvQuXian'
import moXingXunLian from '@/yewu/moXingXunLian'
import GuanLi from '@/yewu/GuanLi'
import gongLvJiSuan from '@/yewu/gongLvJiSuan'
import youHua from '@/yewu/youHua'
Vue.use(Router)

const router= new Router({
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
    {
      path: '/gongLvJiSuan',
      name: 'gongLvJiSuan',
      component: gongLvJiSuan
    },
    {
      path: '/youHua',
      name: 'youHua',
      component: youHua
    },
    {
      path: '/moXingXunLian',
      name: 'moXingXunLian',
      component: moXingXunLian
    },
    {
      path: '/GuanLi',
      name: 'GuanLi',
      component: GuanLi
    },
  ]
})

router.beforeEach((to,from,next)=>{
  console.log(to)
  if(to.name!='login'){
     if(sessionStorage.getItem("login")!="T"){
       next({
         path:'/login'
 })
 } else {
       next();
     }
  } else {
    next();
  }
});
export default router


