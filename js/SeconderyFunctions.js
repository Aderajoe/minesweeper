'use strict'

function onClick(clickedCell) {
    if (gameOn === false) {
        startTimer()
        gameOn = true
    }
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