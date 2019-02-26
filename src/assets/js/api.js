import store from '../../store'

let numbers
let excavated
let marked
let gameCols
let gameRows
let gameSize
let mode

function excavate (index) {
  if (store.state.game.numbers[index] === 0) {
    expandBlock(index)
  } else {
    store.commit('updateExcavatedByIndex', {
      index: index,
      excavated: true
    })
  }
  store.commit('updateUpdated', {
    updated: true
  })
}

function expandBlock (index) {
  numbers = store.state.game.numbers
  excavated = store.state.game.excavated
  marked = store.state.game.marked
  gameCols = store.state.game.gameCols
  gameRows = store.state.game.gameRows
  gameSize = gameRows * gameCols
  mode = store.state.game.mode
  doExpand(index)
  store.commit('updateExcavated', {
    excavated: excavated
  })
}

function doExpand (index) {
  if (mode === 3) { // 蜂巢模式面板
    if (store.getters.getMarked(index) === false && excavated[index] === false) {
      excavated[index] = true
      if (numbers[index] === 0) {
        if (parseInt(index / gameRows) % 2 === 0) { // 奇数列
          if (index % gameRows !== 0) { // 不为第一行
            doExpand(index - 1)
          }
          if (index % gameRows !== 0 && index < gameSize - gameRows) { // 不为第一行且不为最后一列
            doExpand(index + gameRows - 1)
          }
          if (index < gameSize - gameRows) { // 不为最后一列
            doExpand(index + gameRows)
          }
          if ((index + 1) % gameRows !== 0) { // 不为最后一行
            doExpand(index + 1)
          }
          if (index >= gameRows) { // 不为第一列
            doExpand(index - gameRows)
          }
          if (index >= gameRows && index % gameRows !== 0) { // 不为第一行且不为第一列
            doExpand(index - gameRows - 1)
          }
        } else { // 偶数列
          if (index % gameRows !== 0) { // 不为第一行
            doExpand(index - 1)
          }
          doExpand(index + gameRows) // 右上角总是有方块
          if ((index + 1) % gameRows !== 0) { // 不为最后一行
            doExpand(index + gameRows + 1)
            doExpand(index + 1)
            doExpand(index - gameRows + 1)
          }
          doExpand(index - gameRows) // 左上角总是有方块
        }
      }
    }
  } else { // 经典模式面板
    if (marked.indexOf(index + 1) === -1 && excavated[index] === false) { // 当前格子为标记且未打开
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

function createNumbers () { // 生成每个方格到数字
  let numbers = []
  let excavated = []
  let gameCols = store.state.game.gameCols
  let gameRows = store.state.game.gameRows
  let gameSize = gameCols * gameRows
  let mineNumber = store.state.game.mineNumber
  let mines = store.state.game.mines
  let mode = store.state.game.mode
  for (let i = 0; i < gameSize; i++) {
    excavated[i] = false
  }
  for (let i = 0; i < gameSize; i++) {
    numbers[i] = 0
  }
  for (let i = 0; i < mineNumber; i++) {
    numbers[mines[i]] = -1
  }
  if (mode === 3) { // 蜂巢模式面板
    for (let i = 0; i < mineNumber; i++) {
      if (parseInt(mines[i] / gameRows) % 2 === 0) { // 奇数列
        if (mines[i] % gameRows !== 0) { // 不为第一行
          if (numbers[mines[i] - 1] !== -1) { // 不为炸弹
            numbers[mines[i] - 1] += 1
          }
        }
        if (mines[i] % gameRows !== 0 && mines[i] < gameSize - gameRows) { // 不为第一行且不为最后一列
          if (numbers[mines[i] + gameRows - 1] !== -1) {
            numbers[mines[i] + gameRows - 1] += 1
          }
        }
        if (mines[i] < gameSize - gameRows) { // 不为最后一列
          if (numbers[mines[i] + gameRows] !== -1) {
            numbers[mines[i] + gameRows] += 1
          }
        }
        if ((mines[i] + 1) % gameRows !== 0) { // 不为最后一行
          if (numbers[mines[i] + 1] !== -1) {
            numbers[mines[i] + 1] += 1
          }
        }
        if (mines[i] >= gameRows) { // 不为第一列
          if (numbers[mines[i] - gameRows] !== -1) {
            numbers[mines[i] - gameRows] += 1
          }
        }
        if (mines[i] >= gameRows && mines[i] % gameRows !== 0) { // 不为第一行且不为第一列
          if (numbers[mines[i] - gameRows - 1] !== -1) {
            numbers[mines[i] - gameRows - 1] += 1
          }
        }
      } else { // 偶数列
        if (mines[i] % gameRows !== 0) { // 不为第一行
          if (numbers[mines[i] - 1] !== -1) { // 不为炸弹
            numbers[mines[i] - 1] += 1
          }
        }
        if (numbers[mines[i] + gameRows] !== -1) {
          numbers[mines[i] + gameRows] += 1 // 右上角总是有方块
        }
        if ((mines[i] + 1) % gameRows !== 0) { // 不为最后一行
          if (numbers[mines[i] + gameRows + 1] !== -1) {
            numbers[mines[i] + gameRows + 1] += 1
          }
          if (numbers[mines[i] + 1] !== -1) {
            numbers[mines[i] + 1] += 1
          }
          if (numbers[mines[i] - gameRows + 1] !== -1) {
            numbers[mines[i] - gameRows + 1] += 1
          }
        }
        if (numbers[mines[i] - gameRows] !== -1) {
          numbers[mines[i] - gameRows] += 1 // 左上角总是有方块
        }
      }
    }
  } else { // 经典模式面板
    for (let i = 0; i < mineNumber; i++) {
      if ((mines[i] - gameCols - 1) >= 0 && (mines[i]) % gameCols !== 0 && numbers[mines[i] - gameCols - 1] !== -1) {
        // 左上角的方块序号大于等于0且不为炸弹且当前方块不在第一列
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
  excavate
}
