<template>
    <h1>Two-Player Mode</h1>
</template>

<script>
import { excavate } from '../../assets/js/api.js'
export default {
  name: 'TwoPlayerMode',
  methods: {
    setTimer () {
      this.timer = setInterval(() => {
        if (this.$store.state.clock.seconds === 0) {
          while (1) {
            let index = Math.floor(Math.random() * this.$store.state.game.gameSize)
            if (this.$store.state.game.excavated[index] === false && this.$store.getters.getMarked(index + 1) === false) {
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
    this.$store.commit('updateGameOver', { // 游戏未结束
      gameOver: false
    })
    this.$store.commit('updateMode', { // 更新游戏模式
      mode: 4
    })
    this.$store.commit('resetExcavatedCount')
  }
}
</script>

<style scoped>

</style>
