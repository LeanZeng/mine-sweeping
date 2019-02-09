<template>
  <el-row type="flex" justify="center">
    <el-row type="flex" justify="center" :style="containerStyle">
      <canvas id="ground" :width="gameCols * 40 + 20" :height="gameRows * 40 + 20"></canvas>
      <div style="position: absolute; z-index: 1; left: 10px; top: 10px;">
        <div v-for="i in gameRows" :key="i" style="height: 40px; z-index: 0;">
          <div v-for="j in gameCols" class="mine-block" :key="j" style="z-index: 0;">
            <simple-block :index="(i-1)*gameCols+j" v-on:expand="onExpand"></simple-block>
          </div>
        </div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import SimpleBlock from '../units/SimpleBlock'
import { initGame, expandBlock } from '../../assets/js/api.js'
export default {
  name: 'ClassicalMode',
  components: {SimpleBlock},
  methods: {
    drawBackground () {
      // 绘制背景
      let ground = document.getElementById('ground')
      ground.innerHTML = ''
      let rc = this.$rough.canvas(ground)
      rc.rectangle(10, 10, this.gameCols * 40, this.gameRows * 40, {
        fill: '#FFF8DC',
        hachureAngle: 75, // angle of hachure,
        hachureGap: 5,
        fillWeight: 3
      })
      for (let i = 50; i < this.gameCols * 40; i += 40) {
        rc.line(i, 10, i, this.gameRows * 40 + 10, {
          roughness: 0.2
        })
      }
      for (let i = 50; i < this.gameRows * 40; i += 40) {
        rc.line(10, i, this.gameCols * 40 + 10, i, {
          roughness: 0.2
        })
      }
    },
    onExpand (index) {
      expandBlock(index)
    }
  },
  created: function () {
    let state = this.$route.query.state
    if (state === 'hard') {
      // 困难难度
      this.$store.commit('updateGameSize', {
        gameRows: 16,
        gameCols: 30
      })
      this.$store.commit('updateMineNumber', {
        mineNumber: 99
      })
    } else if (state === 'normal') {
      // 普通难度
      this.$store.commit('updateGameSize', {
        gameRows: 16,
        gameCols: 16
      })
      this.$store.commit('updateMineNumber', {
        mineNumber: 40
      })
    } else if (state === 'simple') {
      // 简单难度
      this.$store.commit('updateGameSize', {
        gameRows: 9,
        gameCols: 9
      })
      this.$store.commit('updateMineNumber', {
        mineNumber: 10
      })
    }
    initGame()
  },
  mounted: function () {
    this.drawBackground()
  },
  computed: {
    containerStyle () {
      return {
        width: this.gameCols * 40 + 20 + 'px',
        height: this.gameRows * 40 + 20 + 'px'
      }
    },
    gameRows () {
      return this.$store.state.game.gameRows
    },
    gameCols () {
      return this.$store.state.game.gameCols
    }
  }
}
</script>

<style scoped>
  .mine-block {
    width: 40px;
    height: 40px;
    display: inline-block;
  }
  #ground {
    position: absolute;
    z-index: -2;
    left: 0;
  }
</style>
