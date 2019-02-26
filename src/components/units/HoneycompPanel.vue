<template>
  <div @click="handleClick" @contextmenu.prevent="handleRight" style="width: 700px; height: 560px;">
    <canvas id="panel" width="700" height="560"></canvas>
  </div>
</template>

<script>
import { excavate } from '../../assets/js/api.js'
export default {
  name: 'HoneycompPanel',
  data () {
    return {
      panel: null,
      ctx: null
    }
  },
  methods: {
    handleClick (e) {
      // 左击事件
      let index = this.getIndex(e.offsetX, e.offsetY)
      if (this.$store.getters.getMarked(index) === false && this.$store.getters.getExcavated(index) === false) {
        excavate(index)
      }
    },
    handleRight (e) {
      // 右击事件
      let index = this.getIndex(e.offsetX, e.offsetY)
      this.$store.commit('updateMarkedByIndex', {
        index: index
      })
      this.repaint()
    },
    getIndex (x, y) { // 获取单元的序号，x, y 为鼠标点击的位置
      x = x - 5
      y = y - 7
      if (x > 0 && y > 0 && x < 690 && y < 520) {
        let index = parseInt(x / 45) * this.gameRows + parseInt(y / 52)
        let ix = x % 45
        let iy = y % 52
        if (parseInt(index / this.gameRows) % 2 === 0) { // 位置处于奇数列
          if (iy < (390 - 26 * ix) / 15) {
            index = index - this.gameRows - 1
            if (x <= 15 || y <= 26) {
              index = -1
            }
          } else if (iy > (390 + 26 * ix) / 15) {
            index = index - this.gameRows
            if (x <= 15) {
              index = -1
            }
          }
        } else { // 位置处于偶数列
          if (iy < (780 - 26 * ix) / 15 && iy > (26 / 15) * ix) {
            // 位置处于六边形外
            index = index - this.gameRows
          } else {
            if (iy < 26) {
              // 位置处于上半个六边形内且上半个六边形存在
              index -= 1
            }
            if (y <= 26 || x >= 675) {
              index = -1
            }
          }
        }
        return index
      } else if (y >= 520 && y < 546 && x > 45 && x < 690) {
        let index = parseInt(x / 45) * this.gameRows + parseInt(y / 52)
        let ix = x % 45
        let iy = y % 52
        if (parseInt(index / this.gameRows) % 2 === 0) { // 位置处于偶数列
          if (iy > (26 / 15) * ix) { // 位置处于六边形外
            index = -1
          } else {
            index = index - 1
          }
        } else { // 位置处于奇数列
          if (iy < (390 - 26 * ix)) { // 位置处于六边形内
            index = index - this.gameRows - 1
          } else {
            index = -1
          }
        }
        return index
      } else {
        return -1
      }
    },
    repaint () { // 重绘游戏界面
      this.panel.height = 560
      for (let i = 0; i < this.$store.state.game.gameSize; i++) {
        if (this.$store.getters.getMarked(i) === true) {
          this.drawBlock(i, 2)
        } else if (this.$store.getters.getExcavated(i) === false) {
          this.drawBlock(i, 1)
        } else if (this.$store.state.game.numbers[i] === -1) {
          this.drawBlock(i, 4)
        } else {
          this.drawBlock(i, 3)
        }
      }
    },
    drawBlock (index, state) { // 绘制原始格子, state表示格子状态，1为原始状态，2为标记状态，3为打开数字状态，4为炸弹
      let x, y
      if (parseInt(index / this.gameRows) % 2 === 0) {
        // 单数列
        x = parseInt(index / (this.gameRows * 2)) * 90
        y = index % this.gameRows * 52 + 26
      } else {
        // 双数列
        x = parseInt(index / (this.gameRows * 2)) * 90 + 45
        y = (index % this.gameRows + 1) * 52
      }
      x += 5
      y += 7
      if (state === 1) {
        this.ctx.polygon([[x, y], [x + 15, y - 26], [x + 45, y - 26], [x + 60, y], [x + 45, y + 26], [x + 15, y + 26]], {fill: 'blue', fillStyle: 'solid'})
      } else if (state === 2) {
        this.ctx.polygon([[x, y], [x + 15, y - 26], [x + 45, y - 26], [x + 60, y], [x + 45, y + 26], [x + 15, y + 26]], {fill: 'blue', fillStyle: 'solid'})
        this.drawFlag(x, y)
      } else if (state === 3) {
        this.ctx.polygon([[x, y], [x + 15, y - 26], [x + 45, y - 26], [x + 60, y], [x + 45, y + 26], [x + 15, y + 26]])
        this.drawNumber(x, y, this.$store.state.game.numbers[index])
      } else if (state === 4) {
        this.ctx.polygon([[x, y], [x + 15, y - 26], [x + 45, y - 26], [x + 60, y], [x + 45, y + 26], [x + 15, y + 26]])
        this.drawBoom(x, y)
      }
    },
    drawFlag (x, y) { // 绘制标记旗, x, y为六边形起始绘制点坐标
      this.ctx.polygon([[x + 20, y], [x + 40, y], [x + 20, y - 20]], {fill: 'red', fillStyle: 'solid'})
      this.ctx.line(x + 20, y, x + 20, y + 15, {
        stroke: 'black',
        strokeWidth: 2
      })
    },
    drawBoom (x, y) { // 绘制炸弹, x, y为六边形起始绘制点坐标
      this.ctx.circle(x + 30, y, 25, {
        fill: 'black',
        fillStyle: 'solid'
      })
      this.ctx.line(x + 30, y, x + 18, y - 14, {
        strokeWidth: 2
      })
      this.ctx.line(x + 18, y - 14, x + 13, y - 19, {
        stroke: 'red',
        strokeWidth: 2
      })
      this.ctx.line(x + 18, y - 14, x + 16, y - 19, {
        stroke: 'red',
        strokeWidth: 2
      })
      this.ctx.line(x + 18, y - 14, x + 13, y - 17, {
        stroke: 'red',
        strokeWidth: 2
      })
    },
    drawNumber (x, y, number) { // 绘制数字，x, y为六边形起始绘制点，当数字为0的时候不绘制
      if (number > 0) {
        let ctx = this.panel.getContext('2d')
        ctx.strokeStyle = 'fff'
        ctx.textAlign = 'center'
        ctx.font = '30px Dosis'
        ctx.fillText(number, x + 30, y + 10)
      }
    }
  },
  computed: {
    gameRows () {
      return this.$store.state.game.gameRows
    },
    gameCols () {
      return this.$store.state.game.gameCols
    },
    updated () {
      return this.$store.state.game.updated
    }
  },
  mounted: function () {
    this.panel = document.getElementById('panel')
    this.ctx = this.$rough.canvas(this.panel)
    this.repaint()
  },
  watch: {
    updated: function (val) {
      if (val === true) {
        this.repaint()
        this.$store.commit('updateUpdated', {
          updated: false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
