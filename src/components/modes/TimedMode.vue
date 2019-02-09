<template>
  <div>
    <div>
      <canvas id="boom"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimedMode',
  data () {
    return {
      block: null
    }
  },
  methods: {
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
    }
  },
  mounted: function () {
    this.block = document.getElementById('boom')
    this.drawBoom()
  }
}
</script>

<style scoped>

</style>
