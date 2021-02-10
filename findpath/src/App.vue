<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2020-08-04 11:02:17
 * @LastEditTime 2020-08-04 11:03:47
 * @Email Lengchars@gmail.com
--> 
<template>
  <div id="app">
    <find-path msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import FindPath from './components/FindPath.vue'

export default {
  name: 'App',
  components: {
    FindPath
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
