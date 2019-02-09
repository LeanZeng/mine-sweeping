import store from '../../store'

let numbers
let excavated
let marked
let gameCols
let gameRows
let gameSize

function expandBlock (index) {
  numbers = store.state.game.numbers
  excavated = store.state.game.excavated
  marked = store.state.game.marked
  gameCols = store.state.game.gameCols
  gameRows = store.state.game.gameRows
  gameSize = gameRows * gameCols
  doExpand(index)
  store.commit('updateExcavated', {
    excavated: excavated
  })
}

function doExpand (index) {
  if (marked.indexOf(index + 1) === -1 && excavated[index] === false) {
    excavated[index] = true
    if (numbers[index] === 0) {
      if ((index - gameCols - 1) >= 0 && (index) % gameCols !== 0) {
        doExpand(index - gameCols - 1)
      }
      if ((index - gameCols) >= 0) {
        doExpand(index - gameCols)
      }
      if ((index - gameCols + 1) >= 0 && (index + 1) % gameCols !== 0) {
        doExpand(index - gameCols + 1)
      }
      if ((index - 1) >= 0 && (index) % gameCols !== 0) {
        doExpand(index - 1)
      }
      if ((index + 1) < gameSize && (index + 1) % gameCols !== 0) {
        doExpand(index + 1)
      }
      if ((index + gameCols - 1) < gameSize && (index) % gameCols !== 0) {
        doExpand(index + gameCols - 1)
      }
      if ((index + gameCols) < gameSize) {
        doExpand(index + gameCols)
      }
      if ((index + gameCols + 1) < gameSize && (index + 1) % gameCols !== 0) {
        doExpand(index + gameCols + 1)
      }
    }
  }
}

function createMines () { // 随机生成地雷位置
  let i = store.state.game.mineNumber
  let index
  let mines = []
  while (i > 0) {
    index = 1 + Math.floor(Math.random() * store.state.game.gameRows * store.state.game.gameCols)
    if (!mines.includes(index)) {
      mines.push(index)
      i--
    }
  }
  mines = mines.sort(function (a, b) {
    return a - b
  })
  store.commit('updateMines', {
    mines: mines
  })
}

function createNumbers () {
  let numbers = []
  let excavated = []
  let gameCols = store.state.game.gameCols
  let gameRows = store.state.game.gameRows
  let gameSize = gameCols * gameRows
  let mineNumber = store.state.game.mineNumber
  let mines = store.state.game.mines
  for (let i = 0; i < gameSize; i++) {
    excavated[i] = false
  }
  for (let i = 0; i < gameSize; i++) {
    numbers[i] = 0
  }
  for (let i = 0; i < mineNumber; i++) {
    numbers[mines[i]] = -1
  }
  for (let i = 0; i < mineNumber; i++) {
    if ((mines[i] - gameCols - 1) >= 0 && (mines[i]) % gameCols !== 0 && numbers[mines[i] - gameCols - 1] !== -1) {
      numbers[mines[i] - gameCols - 1] += 1
    }
    if ((mines[i] - gameCols) >= 0 && numbers[mines[i] - gameCols] !== -1) {
      numbers[mines[i] - gameCols] += 1
    }
    if ((mines[i] - gameCols + 1) >= 0 && (mines[i] + 1) % gameCols !== 0 && numbers[mines[i] - gameCols + 1] !== -1) {
      numbers[mines[i] - gameCols + 1] += 1
    }
    if ((mines[i] - 1) >= 0 && (mines[i]) % gameCols !== 0 && numbers[mines[i] - 1] !== -1) {
      numbers[mines[i] - 1] += 1
    }
    if ((mines[i] + 1) < gameSize && (mines[i] + 1) % gameCols !== 0 && numbers[mines[i] + 1] !== -1) {
      numbers[mines[i] + 1] += 1
    }
    if ((mines[i] + gameCols - 1) < gameSize && (mines[i]) % gameCols !== 0 && numbers[mines[i] + gameCols - 1] !== -1) {
      numbers[mines[i] + gameCols - 1] += 1
    }
    if ((mines[i] + gameCols) < gameSize && numbers[mines[i] + gameCols] !== -1) {
      numbers[mines[i] + gameCols] += 1
    }
    if ((mines[i] + gameCols + 1) < gameSize && (mines[i] + 1) % gameCols !== 0 && numbers[mines[i] + gameCols + 1] !== -1) {
      numbers[mines[i] + gameCols + 1] += 1
    }
  }
  store.commit('updateMarked', {
    marked: []
  })
  store.commit('updateExcavated', {
    excavated: excavated
  })
  store.commit('updateNumbers', {
    numbers: numbers
  })
}

function initGame () {
  createMines()
  createNumbers()
}

export {
  initGame,
  expandBlock
}
