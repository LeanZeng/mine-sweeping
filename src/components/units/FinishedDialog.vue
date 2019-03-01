<template>
  <el-dialog
    title="游戏结束"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose">
    <span>恭喜你完成了游戏，你的成绩为: {{ $store.state.clock.seconds }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'FinishedDialog',
  data () {
    return {
      visible: this.show
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:show', false)
    }
  },
  computed: {
    gameOver () {
      return this.$store.state.game.gameOver
    }
  },
  watch: {
    show: function (val) {
      this.visible = val
    }
  }
}
</script>

<style scoped>

</style>
