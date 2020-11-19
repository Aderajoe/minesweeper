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



function init() {
    buildBoard(gSize)
    board = buildBoard(gSize)
    board[1][2].isMine = true // check
    board[1][3].isMine = false // check
    board[1][3].isShown = false // check
    console.table(board) // check
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
                isShown: true,
                isMine: false,
                isMarked: false

            }
        }
    }
    return board
}

function onClickk(elclick) {
    //var elclick = document.querySelector(button)
    console.log('button works')
        //cell.isShown = true
        //  var click = document.querySelector("button")



}

function setMinesNegsCount(board) {}

function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell
            if (board[i][j].isMine === true && board[i][j].isShown) {
                currCell = Mines
            } else if (board[i][j].isMine === false && board[i][j].isShown) {
                currCell = emptyCell


            } else {
                currCell = notShown
            }
            console.log(board[i][j].isMine)
            var className = 'img' //currCell ? 'occupied' : ''
            strHtml += `<td data-i="${i}" data-j="${j} class="${className}" > <button onclick="playGround(this)"> ${currCell} </button></td>`
                //strHtml += '\t<td>' + board[i][j] + '</td>\n'


            //strHtml += `<td data-i="${i}" data-j="${j} class="${className}">${currCell}${Mines}</td>`

        }

        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml
}