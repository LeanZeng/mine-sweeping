<template>
  <el-row class="header-content">
    <el-col :span="2" :offset="11" style="text-align: center;" v-if="$store.state.clock.show">
      <span style="font-size: 30px; color: aliceblue">
        {{ $store.state.clock.seconds }}
      </span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HeaderBar'
}
</script>

<style scoped>
  .header-content {
    background-color: dimgrey;
    height: 40px;
  }
</style>
