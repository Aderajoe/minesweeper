'use strict'

var gBoard = {
    isFlag: false,
    minesAroundCount: 0,
    isShown: true,
    isMine: false,
    isMarked: false

}
var gSize = 4
var board
var Mines = 'Mine'
var emptyCell = 'empty'
var notShown = 'notshown'
var scoreCount
var flagCount
var boardMinesCount = 2
var gameOn = false
var cord = { i: 0, j: 0 }
var gBoard;
var gSelectedCell = null;

function init() {
    stopTimer()
    flagCount=0
    scoreCount = 0
    board = buildBoard(gSize)
    board[1][2].isMine = true 
    board[1][3].isMine = true 
    board[1][3].isShown = false 
    board = setMinesCount(board)
    setMinesNegsCount(board, 3, 3)
    renderBoard(board)
}


function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        var row = []
        board.push(row)
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                isFlag:false,
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            if (row[j].isShown === false && row[j].isFlag === false) {
                var className = "notShown"
            } else if (row[j].isShown === true && row[j].isMine === false) {
                var className = "shown"

            }
            else if (row[j].isFlag === true) {
                var className = "flag"
            }
            else {
                var className = "mineExp"
            }
            cell.i = i
            cell.j = j
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" onMouseDown="onClick(this, event)" 
                class="${className}">${cellClicked(cell)} </td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}


function onClick(clickedCell, mouse) {
    if (gameOn === false) {
        startTimer()
        gameOn = true
    }
    var elCell = clickedCell
    var coord = getCellCoord(elCell.id)
    var i = coord.i
    var j = coord.j
    if (mouse.button === 2 && board[i][j].isShown === false) {
        if (board[i][j].isFlag === false) {
            board[i][j].isFlag = true
            flagCount++
        } else if (board[i][j].isFlag === true) {
            board[i][j].isFlag = false
            flagCount--

        }
        console.log(mouse.button)
    } else if (mouse.button === 0) {
        elCell.classList.add('selected');
        if (board[i][j].isMine === false && board[i][j].isShown === false&&board[i][j].isFlag===false) {
            scoreCount++
            board[i][j].isShown = true
        }else if(board[i][j].isFlag===false){
            board[i][j].isShown=true
        }
    }
    renderBoard(board)
    checkGameWinCond(gSize, scoreCount)
    isGameLost(board[i][j])

}

function setMinesCount(board) {
    for (var i = 0; i <= 3; i++) {
        for (var j = 0; j <= 3; j++) {
            var minesNegsCount = setMinesNegsCount(board, i, j)
            board[i][j].minesAroundCount = minesNegsCount
        }
    }
    return board
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesNegsCount = 0
    for (var i = (rowIdx - 1);
        (rowIdx + 1) >= i; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = (colIdx - 1); j <= (colIdx + 1); j++) {
            if (j < 0 || j >= board[0].length || ((colIdx === j) && (rowIdx === i))) continue
            if (board[i][j].isMine === true) {
                minesNegsCount++
            }
        }
    }
    return minesNegsCount
}

function checkGameWinCond(gSize, scoreCount) {
    if (((gSize * gSize) - boardMinesCount) === scoreCount&&flagCount===boardMinesCount) {
        alert('you won the game')
        gameOn = false
        init()
    }
}


function isGameLost(elCell) {
    if (elCell.isMine === true && elCell.isShown === true) {
        alert('game over')
        gameOn = false
        init()
    }
}