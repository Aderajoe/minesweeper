'use strict'

var gBoard = {
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
var minesCount = 2
var gameOn = false
var cord = { i: 0, j: 0 }
var gBoard;
var gSelectedCell = null;

function init() {
    stopTimer()
    scoreCount = 0
    board = buildBoard(gSize)
    board[1][2].isMine = true // check
    board[1][3].isMine = true // check
    board[1][3].isShown = false // check
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
            if (row[j].isShown === false) {
                var className = "notShown"
            } else if (row[j].isShown === true && row[j].isMine === false) {
                var className = "shown"
            } else {
                var className = "mineExp"
            }
            cell.i = i
            cell.j = j
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" onclick="onClick(this)" 
                class="${className}">${cellClicked(cell)} </td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
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
    if (((gSize * gSize) - minesCount) === scoreCount) {
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