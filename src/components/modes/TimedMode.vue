<template>
  <classical-mode-panel></classical-mode-panel>
</template>

<script>
import ClassicalModePanel from '../units/ClassicalModePanel'
export default {
  name: 'TimedMode',
  components: {ClassicalModePanel},
  created () {
    this.$store.commit('updateShowClock', {
      show: true
    })
  }
}
</script>

<style scoped>

</style>
