<template>
  <el-row type="flex" justify="center">
    <honeycomp-panel></honeycomp-panel>
  </el-row>
</template>

<script>
import HoneycompPanel from '../units/HoneycompPanel'
import { initGame } from '../../assets/js/api.js'
export default {
  name: 'HoneycombMode',
  components: {HoneycompPanel},
  created: function () {
    this.$store.commit('updateGameOver', { // 游戏未结束
      gameOver: false
    })
    this.$store.commit('updateMode', {
      mode: 3
    })
    this.$store.commit('updateGameSize', {
      gameRows: 10,
      gameCols: 15
    })
    this.$store.commit('updateMineNumber', {
      mineNumber: 20
    })
    this.$store.commit('resetExcavatedCount')
    initGame()
  }
}
</script>

<style scoped>

</style>
