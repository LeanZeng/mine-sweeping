<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card class="box-card">
        <div :span="12" :offset="6">
          <div>
            <el-button class="menu-btn" type="success" plain @click="chooseState">经典模式</el-button>
          </div>
          <div>
            <el-button class="menu-btn" type="info" plain @click="toTimedMode">限时模式</el-button>
          </div>
          <div>
            <el-button class="menu-btn" type="warning" plain @click="toHoneycombMode">蜂巢模式</el-button>
          </div>
          <div>
            <el-button class="menu-btn" type="danger" plain @click="toTwoPlayerMode">双人对战</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-dialog
      title="选择游戏难度"
      :visible.sync="state.ifShowStateDialog"
      width="30%">
      <el-row style="text-align: center">
        <el-button @click="toClassicalMode('simple')">简单</el-button>
        <el-button type="success" @click="toClassicalMode('normal')">普通</el-button>
        <el-button type="danger" @click="toClassicalMode('hard')">困难</el-button>
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
        ifShowStateDialog: false
      }
    }
  },
  methods: {
    chooseState () {
      this.state.ifShowStateDialog = true
    },
    toClassicalMode (state) {
      this.$router.push({path: '/classicalMode', query: {state: state}})
    },
    toTimedMode () {
      this.$router.push('/timedMode')
    },
    toTwoPlayerMode () {
      this.$router.push('/twoPlayerMode')
    },
    toHoneycombMode () {
      this.$router.push('/honeycombMode')
    }
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
