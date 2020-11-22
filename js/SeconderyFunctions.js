'use strict'
/*
function onClick(clickedCell, mouse) {
    if (gameOn === false) {
        startTimer()
        gameOn = true
    }
    console.log(mouse.button)
    var elCell = clickedCell
    elCell.classList.add('selected');
    var coord = getCellCoord(elCell.id)
    var coordi = coord.i
    var coordj = coord.j
    if (board[coordi][coordj].isMine === false && board[coordi][coordj].isShown === false) {
        scoreCount++
    }
    board[coordi][coordj].isShown = true
    renderBoard(board)
    checkGameWinCond(gSize, scoreCount)

}

*/

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
function getCellCoord(strCellId) {
    var coord = {};
    var parts = strCellId.split('-');
    coord.i = +parts[1]
    coord.j = +parts[2];
    return coord;
}

function cellClicked(elCell) { // to be used later on for reveling negsMinesCout

    isGameLost(elCell)
    var coord = elCell
    var coordi = coord.i
    var coordj = coord.j
    var print = ''
    if (board[coordi][coordj].isMine === false && board[coordi][coordj].isShown === true) {
        print = board[coordi][coordj].minesAroundCount

    }

    return print

}