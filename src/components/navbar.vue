<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" @click="$router.push({ path: '/shuJuWeiHu' })">数据维护</el-menu-item>
    <el-menu-item index="2" @click="$router.push({ path: '/xiaoLvQuXian' })">效率曲线</el-menu-item>
    <el-menu-item index="3" @click="$router.push({ path: '/gongLvJiSuan' })">功率计算</el-menu-item>
    <el-menu-item index="4" @click="$router.push({ path: '/youHua' })">优化</el-menu-item>
    <el-menu-item index="8" @click="$router.push({ path: '/moXingXunLian' })">模型训练</el-menu-item>
    <el-menu-item index="5" @click="$router.push({ path: '/GuanLi' })"  v-if="adminSee"  >管理</el-menu-item>
    <el-menu-item index="6" @click="$router.push({ path: '/bangZhu' })">帮助</el-menu-item>
    <el-menu-item index="9" @click="$router.push({ path: '/guanYu' })">关于</el-menu-item>
    <el-menu-item index="7" style="float: right" @click="out">退出</el-menu-item>
  </el-menu>
</template>

<script>

    export default {
      name: "navbar",
      data(){
        return{
          adminSee:false
        }
      },
     created() {
     this.adminSee=JSON.parse(sessionStorage.getItem('user')).role=='管理员' ;
     console.log(JSON.parse(sessionStorage.getItem('user')))
     },
      methods:{
        out(){
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('login');
          this.$router.push({ path: '/login' })
        }
    }
    }

</script>

<style scoped>

</style>
