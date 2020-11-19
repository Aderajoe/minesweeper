'use strict'
var gStartTime = null
var gIntervalId = null
var gTimer = 0

function startTimer() {
    if (!gStartTime) gStartTime = Date.now()
    gIntervalId = setInterval(updateTime, 80)
}

function stopTimer() {
    var strHtml = gTimer
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = strHtml
    clearInterval(gIntervalId)
    gIntervalId = null
    gStartTime = null
}

function updateTime() {
    var diff = Date.now() - gStartTime
    var seconds = diff / 1000
    seconds = Math.round(seconds)
    gTimer = seconds
    if (gameOn === false) {
        stopTimer()
    }
    var strHtml = seconds
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = strHtml
}