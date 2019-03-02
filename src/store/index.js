import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {
      mode: 0, // 当前游戏模式，1：经典模式，2：限时模式，3：双人对战模式，4：蜂巢模式
      mines: [], // 地雷下标数组
      mineNumber: 0, // 地雷总数
      numbers: [], // 格子数据数组，-1代表地雷，0~8代表格子周围地雷数目
      gameRows: 0, // 游戏行数
      gameCols: 0, // 游戏列数
      gameSize: 0, // 游戏总格子数
      excavated: [], // 格子打开状态数组
      marked: [], // 各组标记状态数组
      updated: false, // 游戏数组是否已经更新
      gameOver: false, // 游戏是否已经结束
      excavatedCount: 0, // 打开的格子数
      showBoard: true // 是否显示雷区
    },
    clock: {
      show: false, // 是否显示计时器
      seconds: 0, // 计时器剩余秒数
      timeRate: 0 // 计时器总秒数
    },
    loading: false
  },
  mutations: {
    updateNumbers (state, payload) {
      // 更新游戏数字矩阵
      state.game.numbers = payload.numbers
    },
    updateGameSize (state, payload) {
      // 更新游戏规格
      // gameRows: 游戏行数
      // gameCols: 游戏列数
      // gameSize: 游戏总格子数
      state.game.gameRows = payload.gameRows
      state.game.gameCols = payload.gameCols
      state.game.gameSize = payload.gameRows * payload.gameCols
    },
    updateMines (state, payload) {
      // 更新地雷位置数组
      state.game.mines = payload.mines
    },
    updateMineNumber (state, payload) {
      // 更新地雷总数
      state.game.mineNumber = payload.mineNumber
    },
    updateExcavated (state, payload) {
      // 更新所有格子打开状态
      state.game.excavated = payload.excavated.concat([])
    },
    updateExcavatedByIndex (state, payload) {
      // 根据格子序号更新打开状态
      Vue.set(state.game.excavated, payload.index, payload.excavated)
    },
    updateMarked (state, payload) {
      // 更新格子标记数组
      state.game.marked = payload.marked
    },
    updateMarkedByIndex (state, payload) {
      // 根据格子序号更新标记状态
      if (state.game.marked.indexOf(payload.index) !== -1) {
        // 格子已被标记
        state.game.marked.splice(state.game.marked.indexOf(payload.index), 1)
      } else {
        // 格子未被标记
        if (state.game.mineNumber - state.game.marked.length > 0) {
          state.game.marked.push(payload.index)
        }
      }
    },
    updateShowClock (state, payload) {
      // 更新是否显示计时器
      state.clock.show = payload.show
    },
    updateTimeRate (state, payload) {
      // 更新计时器最大值
      state.clock.timeRate = payload.timeRate
    },
    resetClock (state) {
      // 重置计时器
      state.clock.seconds = state.clock.timeRate
    },
    reduceSeconds (state) {
      // 计时器减少1秒
      state.clock.seconds -= 1
    },
    increaseSenconds (state) {
      // 计时器增加1秒
      state.clock.seconds += 1
    },
    updateMode (state, payload) {
      // 更新当前游戏模式
      state.game.mode = payload.mode
    },
    updateUpdated (state, payload) { // 更新数组更新状态
      state.game.updated = payload.updated
    },
    updateGameOver (state, payload) { // 更新游戏结束状态
      state.game.gameOver = payload.gameOver
    },
    increaseExcavatedCount (state) { // 格子打开数量增加1
      state.game.excavatedCount += 1
    },
    resetExcavatedCount (state) { // 重置格子打开数量
      state.game.excavatedCount = 0
    },
    setLoading (state, payload) {
      state.loading = payload.loading
    },
    setShowBoard (state, payload) {
      state.game.showBoard = payload.showBoard
    }
  },
  getters: {
    getMarked: (state) => (index) => {
      // 根据格子下标获取标记状态
      return state.game.marked.indexOf(index) !== -1
    },
    getExcavated: (state) => (index) => {
      // 根据格子下标获取打开状态
      return state.game.excavated[index]
    },
    getMinesRemaining: (state) => {
      return (state.game.mineNumber - state.game.marked.length)
    },
    isCompleted: (state) => {
      return (state.game.gameSize - state.game.mineNumber) === state.game.excavatedCount
    },
    getShowBoard: (state) => {
      return state.game.showBoard
    }
  }
})
