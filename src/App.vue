<template>
  <div id="app">

    <navbar v-if="$route.path!='/login'" ></navbar>
    <router-view/>
  </div>
</template>

<script>
  import navbar from '@/components/navbar'
  export default {
    name: 'App',
    components:{
    navbar
    },

  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  lor: #2c3e50;
  margin: -8px;
}
</style>
