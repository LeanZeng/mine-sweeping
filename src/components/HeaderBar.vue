<template>
  <el-row class="header-content">
    <el-col :span="2" :offset="11" style="text-align: center;" v-if="$store.state.clock.show">
      <span style="font-size: 25px; color: red" v-if="seconds <= 3 && mode === 2">
        {{ seconds }}
      </span>
      <span style="font-size: 25px; color: aliceblue" v-else>
        {{ seconds }}
      </span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HeaderBar',
  computed: {
    seconds () {
      return this.$store.state.clock.seconds
    },
    mode () {
      return this.$store.state.game.mode
    }
  }
}
</script>

<style scoped>
  .header-content {
    background-color: dimgrey;
    height: 40px;
  }
</style>
