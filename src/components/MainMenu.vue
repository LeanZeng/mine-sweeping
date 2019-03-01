<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card class="box-card">
        <div :span="12" :offset="6">
          <div>
            <el-button class="menu-btn" type="success" plain @click="chooseState(1)">经典模式</el-button>
          </div>
          <div>
            <el-button class="menu-btn" type="info" plain @click="chooseState(2)">限时模式</el-button>
          </div>
          <div>
            <el-button class="menu-btn" type="warning" plain @click="chooseState(3)">蜂巢模式</el-button>
          </div>
          <div>
            <el-button class="menu-btn" type="danger" plain @click="chooseState(4)">双人对战</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-dialog
      title="选择游戏难度"
      :visible.sync="state.ifShowStateDialog"
      :before-close="handleStateDialogClose"
      width="30%">
      <el-row style="text-align: center">
        <el-button @click="startGame('simple')">简单</el-button>
        <el-button type="success" @click="startGame('normal')">普通</el-button>
        <el-button type="danger" @click="startGame('hard')">困难</el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
      state: {
        selectedMode: 0,
        selectedState: '',
        ifShowStateDialog: false
      }
    }
  },
  methods: {
    chooseState (mode) {
      this.state.selectedMode = mode
      if (mode === 3) {
        this.startGame()
      } else {
        this.state.ifShowStateDialog = true
      }
    },
    startGame (state) {
      switch (this.state.selectedMode) {
        case 1: this.$router.push({path: '/classicalMode', query: {state: state}})
          break
        case 2: this.$router.push({path: '/timedMode', query: {state: state}})
          break
        case 3: this.$router.push('/honeycombMode')
          break
        case 4: this.$router.push({path: '/twoPlayerMode', query: {state: state}})
      }
    },
    handleStateDialogClose () {
      this.state.selectedMode = 0
      this.state.ifShowStateDialog = false
    }
  },
  created () {
    this.$store.commit('updateMode', {
      mode: 0
    })
    this.$store.commit('updateShowClock', {
      show: false
    })
    this.$store.commit('setLoading', {
      loading: false
    })
  }
}
</script>

<style scoped>
  .box-card{
    text-align: center;
    margin-top: 50px;
  }
  .menu-btn{
    width: 50%;
    margin-top: 40px;
    font-size: 50px;
    font-family: 幼圆;
  }
</style>
