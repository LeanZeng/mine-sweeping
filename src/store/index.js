import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {
      mines: [],
      mineNumber: 0,
      numbers: [],
      gameRows: 0,
      gameCols: 0,
      gameSize: 0,
      excavated: [],
      marked: []
    }
  },
  mutations: {
    updateNumbers (state, payload) {
      state.game.numbers = payload.numbers
    },
    updateGameSize (state, payload) {
      state.game.gameRows = payload.gameRows
      state.game.gameCols = payload.gameCols
      state.game.gameSize = payload.gameRows * payload.gameCols
    },
    updateMines (state, payload) {
      state.game.mines = payload.mines
    },
    updateMineNumber (state, payload) {
      state.game.mineNumber = payload.mineNumber
    },
    updateExcavated (state, payload) {
      state.game.excavated = payload.excavated.concat([])
    },
    updateExcavatedByIndex (state, payload) {
      Vue.set(state.game.excavated, payload.index, payload.excavated)
    },
    updateMarked (state, payload) {
      state.game.marked = payload.marked
    },
    updateMarkedByIndex (state, payload) {
      if (state.game.marked.indexOf(payload.index) !== -1) {
        state.game.marked.splice(state.game.marked.indexOf(payload.index), 1)
      } else {
        state.game.marked.push(payload.index)
      }
    }
  },
  getters: {
    getMarked: (state) => (index) => {
      return state.game.marked.indexOf(index) !== -1
    },
    getExcavated: (state) => (index) => {
      return state.game.excavated[index]
    }
  }
})
