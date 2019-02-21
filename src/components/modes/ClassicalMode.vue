<template>
  <classical-mode-panel></classical-mode-panel>
</template>

<script>
import ClassicalModePanel from '../units/ClassicalModePanel'
export default {
  name: 'ClassicalMode',
  components: {ClassicalModePanel},
  created () {
    this.$store.commit('updateMode', {
      mode: 1
    })
    this.$store.commit('updateShowClock', {
      show: false
    })
  }
}
</script>

<style scoped>
</style>
