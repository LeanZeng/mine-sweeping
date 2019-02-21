<template>
  <div @click="handleClick" @contextmenu.prevent="handleRight" @mouseover="mouseOver" @mouseout="mouseOut">
    <canvas class="block" :id="id" width="40" height="40"></canvas>
  </div>
</template>

<script>
import { excavate } from '../../assets/js/api.js'
export default {
  name: 'SimpleBlock',
  data () {
    return {
      block: null,
      isMouseOver: false
    }
  },
  props: ['index'],
  methods: {
    handleClick () {
      this.isMouseOver = false
      if (!this.marked && !this.excavated) {
        this.$store.commit('resetClock')
        excavate(this.index - 1)
      }
    },
    handleRight () {
      this.isMouseOver = false
      if (!this.excavated) {
        if (!this.marked) {
          this.clearBlock()
          this.drawBackground()
          this.drawFlag()
        } else {
          this.clearBlock()
          this.drawBackground()
        }
        this.$store.commit('updateMarkedByIndex', {
          index: this.index
        })
      }
    },
    excavateBlock () {
      this.clearBlock()
      if (this.number !== 0) {
        if (this.number === -1) {
          this.drawBoom()
        } else {
          this.drawNumber()
        }
      }
    },
    drawFlag () {
      let rc = this.$rough.canvas(this.block)
      rc.polygon([[10, 5], [10, 20], [30, 20]], {fill: 'red', fillStyle: 'solid'})
      rc.line(10, 20, 10, 35, {
        stroke: 'black',
        strokeWidth: 2
      })
    },
    clearBlock () {
      this.block.height = 40
    },
    drawBackground () {
      let rc = this.$rough.canvas(this.block)
      rc.rectangle(0, 0, 40, 40, {fill: 'blue'})
    },
    drawNumber () {
      let ctx = this.block.getContext('2d')
      ctx.strokeStyle = 'fff'
      ctx.textAlign = 'center'
      ctx.font = '30px Dosis'
      ctx.fillText(this.number, 20, 35)
    },
    drawBoom () {
      let rc = this.$rough.canvas(this.block)
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
    },
    mouseOver () {
      if (!this.marked && !this.excavated) {
        let rc = this.$rough.canvas(this.block)
        rc.rectangle(0, 0, 40, 40, {fill: 'blue', fillWeight: 2})
        this.isMouseOver = true
      }
    },
    mouseOut () {
      if (this.isMouseOver) {
        this.clearBlock()
        this.drawBackground()
        this.isMouseOver = false
      }
    }
  },
  computed: {
    number () {
      return this.$store.state.game.numbers[this.index - 1]
    },
    id () {
      return 'block' + this.index
    },
    excavated () {
      return this.$store.getters.getExcavated(this.index - 1)
    },
    marked () {
      return this.$store.getters.getMarked(this.index)
    }
  },
  watch: {
    excavated: function (val) {
      if (val === true) {
        this.excavateBlock()
      }
    }
  },
  mounted: function () {
    this.block = document.getElementById(this.id)
    this.drawBackground()
  }
}
</script>

<style scoped>

</style>
