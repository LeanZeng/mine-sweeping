<template>
  <classical-mode-panel></classical-mode-panel>
</template>

<script>
import ClassicalModePanel from '../units/ClassicalModePanel'
import { excavate } from '../../assets/js/api.js'
export default {
  name: 'TimedMode',
  components: {ClassicalModePanel},
  data () {
    return {
      timer: null
    }
  },
  methods: {
    setTimer () {
      this.timer = setInterval(() => {
        if (this.$store.state.clock.seconds === 0) {
          while (1) {
            let index = Math.floor(Math.random() * this.$store.state.game.gameSize)
            if (this.$store.state.game.excavated[index] === false) {
              excavate(index)
              break
            }
          }
          this.$store.commit('resetClock')
        } else {
          this.$store.commit('reduceSeconds')
        }
      }, 1000)
    }
  },
  created () {
    this.$store.commit('updateMode', {
      mode: 2
    })
    this.$store.commit('updateShowClock', {
      show: true
    })
    this.$store.commit('updateTimeRate', {
      timeRate: 10
    })
  },
  mounted () {
    this.$store.commit('resetClock')
    this.setTimer()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>
