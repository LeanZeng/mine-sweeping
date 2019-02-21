<template>
    <h1>Two-Player Mode</h1>
</template>

<script>
export default {
  name: 'TwoPlayerMode',
  created () {
    this.$store.commit('updateMode', { // 更新游戏模式
      mode: 3
    })
  }
}
</script>

<style scoped>

</style>
