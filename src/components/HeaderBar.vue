<template>
  <el-row class="header-content">
    <el-col :span="2" style="margin-top: 4px; padding-left: 5px">
      <el-tooltip class="item" effect="dark" content="返回主菜单" placement="bottom-start">
        <el-button type="success" icon="el-icon-back" size="small" circle @click="backToMenu"></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="10" :offset="5" style="height: 40px">
      <el-col :span="6" :offset="9" style="text-align: center;" v-if="$store.state.clock.show">
        <div v-if="$store.state.game.gameOver">
          <el-button icon="el-icon-refresh" @click="refresh">重新开始</el-button>
        </div>
        <div v-else>
          <span style="font-size: 25px; color: red" v-if="seconds <= 3 && mode === 2">
            {{ seconds }}
          </span>
          <span style="font-size: 25px; color: aliceblue" v-else>
            {{ seconds }}
          </span>
        </div>
      </el-col>
      <el-col :span="3" style="text-align: right">
        <canvas id="bombs" width="40" height="40"></canvas>
      </el-col>
      <el-col :span="6">
        <label style="font-size: 25px;">X {{ $store.getters.getMinesRemaining }}</label>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HeaderBar',
  methods: {
    backToMenu () {
      this.$store.commit('setLoading', {
        loading: true
      })
      this.$router.go(-1)
    },
    refresh () {
      this.$store.commit('setLoading', {
        loading: true
      })
      this.$router.go(0)
    },
    drawBoom () {
      let bomb = document.getElementById('bombs')
      let rc = this.$rough.canvas(bomb)
      rc.circle(20, 20, 25, {
        fill: 'black',
        fillStyle: 'solid'
      })
      rc.line(20, 20, 8, 8, {
        strokeWidth: 2
      })
      rc.line(8, 8, 3, 3, {
        stroke: 'red',
        strokeWidth: 2
      })
      rc.line(8, 8, 6, 3, {
        stroke: 'red',
        strokeWidth: 2
      })
      rc.line(8, 8, 3, 6, {
        stroke: 'red',
        strokeWidth: 2
      })
    }
  },
  computed: {
    seconds () {
      return this.$store.state.clock.seconds
    },
    mode () {
      return this.$store.state.game.mode
    },
    minesRemaining () {
      return this.$store.getters.getMinesRemaining
    }
  },
  mounted: function () {
    this.drawBoom()
  }
}
</script>

<style scoped>
  .header-content {
    background-color: dimgrey;
    height: 40px;
  }
</style>
