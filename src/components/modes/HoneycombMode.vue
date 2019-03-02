<template>
  <el-row type="flex" justify="center">
    <honeycomp-panel v-if="showBoard"></honeycomp-panel>
    <div v-loading="true" v-else style="margin-top: 200px"></div>
    <FinishedDialog :show.sync="showFinishedDialog"></FinishedDialog>
  </el-row>
</template>

<script>
import HoneycompPanel from '../units/HoneycompPanel'
import FinishedDialog from '../units/FinishedDialog'
import { initGame } from '../../assets/js/api.js'
export default {
  name: 'HoneycombMode',
  components: {FinishedDialog, HoneycompPanel},
  data () {
    return {
      timer: null,
      showFinishedDialog: false
    }
  },
  methods: {
    setTimer () {
      this.timer = setInterval(() => {
        if (this.gameOver === false && this.$store.getters.isCompleted === false) {
          this.$store.commit('increaseSenconds') // 秒数自增
        }
      }, 1000)
    },
    startGame () {
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
      this.$store.commit('updateShowClock', { // 显示时钟
        show: true
      })
      this.$store.commit('updateTimeRate', { // 时钟原始时间
        timeRate: 0
      })
      this.$store.commit('resetExcavatedCount')
      this.$store.commit('resetClock')
      initGame()
      this.setTimer()
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
          this.showFinishedDialog = true
          console.log('success!')
        } else {
          this.$alert('很遗憾，你没能完成游戏', '游戏失败', {
            confirmButtonText: '确定'
          })
        }
      }
    },
    isCompleted: function (val) {
      if (val === true) {
        this.$store.commit('updateGameOver', {
          gameOver: true
        })
      }
    },
    showBoard: function (val) {
      if (val === true) {
        clearInterval(this.timer)
        this.startGame()
      }
    }
  },
  created: function () {
    this.startGame()
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>
