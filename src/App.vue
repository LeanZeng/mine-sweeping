<template>
  <div id="app" v-loading="loading">
    <HeaderBar v-if="$store.state.game.mode > 0"/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
export default {
  name: 'App',
  components: {HeaderBar},
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>

<style>
</style>
