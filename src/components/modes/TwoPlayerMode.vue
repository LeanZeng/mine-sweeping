<template>
    <h1>Two-Player Mode</h1>
</template>

<script>
export default {
  name: 'TwoPlayerMode',
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
