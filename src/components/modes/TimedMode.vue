<template>
  <div>
    <classical-mode-panel v-if="!isPass && showBoard"></classical-mode-panel>
    <div v-loading="true" v-if="!showBoard" style="margin-top: 200px"></div>
    <el-row v-if="isPass">
      <el-col :span="8" :offset="8" style="text-align: center">
        <el-card class="box-card" style="margin-top: 200px">
          <el-row>
            恭喜你完成了本关的挑战
          </el-row>
          <el-row style="margin-top: 50px">
            <el-col :span="8" :offset="4" style="text-align: center"><el-button @click="startGame(timeRate)">重新挑战</el-button></el-col>
            <el-col :span="8" style="text-align: center"><el-button @click="startGame(timeRate - 5)">下一关</el-button></el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ClassicalModePanel from '../units/ClassicalModePanel'
export default {
  name: 'TimedMode',
  components: {ClassicalModePanel},
  data () {
    return {
      timer: null,
      timeRate: 15,
      isPass: false
    }
  },
  methods: {
    setTimer () {
      this.timer = setInterval(() => {
        if (this.$store.state.clock.seconds === 0) {
          this.$store.commit('updateGameOver', {
            gameOver: true
          })
        } else {
          this.$store.commit('reduceSeconds')
        }
      }, 1000)
    },
    startGame (timeRate) {
      clearInterval(this.timer)
      this.$store.commit('updateGameOver', { // 游戏未结束
        gameOver: false
      })
      this.$store.commit('updateMode', {
        mode: 2
      })
      this.$store.commit('updateShowClock', {
        show: true
      })
      this.$store.commit('updateTimeRate', {
        timeRate: timeRate
      })
      this.$store.commit('resetExcavatedCount')
      this.$store.commit('resetClock')
      this.setTimer()
      this.isPass = false
    }
  },
  computed: {
    gameOver () {
      return this.$store.state.game.gameOver
    },
    isCompleted () {
      return this.$store.getters.isCompleted
    },
    showBoard () {
      return this.$store.getters.getShowBoard
    }
  },
  watch: {
    gameOver: function (val) {
      if (val === true) {
        if (this.isCompleted === true) {
          this.$alert('恭喜你完成了所有的关卡', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.$alert('很遗憾，你没能完成游戏', '游戏失败', {
            confirmButtonText: '确定'
          })
        }
      }
    },
    isCompleted: function (val) {
      if (val === true) {
        if (this.timeRate === 5) {
          this.$store.commit('updateGameOver', {
            gameOver: true
          })
        } else {
          this.isPass = true
        }
      }
    },
    isPass: function (val) {
      if (val === true) {
        clearInterval(this.timer)
      }
    },
    showBoard: function (val) {
      if (val === true) {
        this.timeRate = 15
        this.startGame(this.timeRate)
      }
    }
  },
  mounted () {
    this.startGame(this.timeRate)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>
