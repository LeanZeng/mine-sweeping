<template>
  <div id="app">
    <HeaderBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
export default {
  name: 'App',
  components: {HeaderBar}
}
</script>

<style>
</style>
