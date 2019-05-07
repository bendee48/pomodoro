const display = document.querySelector('#timer-display');
const minDisplay = document.querySelector('#mins');
const secDisplay = document.querySelector('#secs');
const startButton = document.querySelector('#play-btn');
const pauseButton = document.querySelector('#pause-btn');
const stopButton = document.querySelector('#stop-btn');
const status = document.querySelector('#status');
const sessionTime = document.querySelector('#session-time');
const sessionUp = document.querySelector('#session-up');
const sessionDown = document.querySelector('#session-down');
const breakDisplay = document.querySelector('#break-time');
const breakIncrease = document.querySelector('#break-up');
const breakDecrease = document.querySelector('#break-down');
const audio = new Audio('beep-08b.mp3');

let breakLength = 60;
let time = 60;
let timerId;
let onBreak = false;
let timeRunning = false;
let currentTime;
let currentBreakTime;

function displayTime() {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    if (mins < 10) mins = convertSingleDigit(mins);
    if (secs < 10) secs = convertSingleDigit(secs);
    minDisplay.textContent = mins;
    secDisplay.textContent = secs;
}
displayTime();

function setUpDisplays() { 
    sessionTime.textContent = Math.floor(time / 60);
    breakDisplay.textContent = Math.floor(breakLength / 60)
}
setUpDisplays();

function increaseSessionTime() {
    sessionUp.addEventListener('click', () => {
        if (timeRunning) return;
        time += 60;
        displayTime();
        sessionTime.textContent = Math.floor(time / 60)
    });
}
increaseSessionTime();

function decreaseSessionTime() {
    sessionDown.addEventListener('click', () => {
        if (timeRunning || time <= 61) return;
        time -= 60;
        displayTime();
        sessionTime.textContent = Math.floor(time / 60)
    });
}
decreaseSessionTime();

function increaseBreakTime() {
    breakIncrease.addEventListener('click', () => {
        if (timeRunning) return;
        breakLength += 60;
        breakDisplay.textContent = Math.floor(breakLength / 60);
    });
}
increaseBreakTime();

function decreaseBreakTime() {
    breakDecrease.addEventListener('click', () => {
        if (timeRunning  || breakLength <= 61) return;
        breakLength -= 60;
        breakDisplay.textContent = Math.floor(breakLength / 60);
    });
}
decreaseBreakTime();

function convertSingleDigit(num) {
    return "0" + num;
}

function countDown() {
    timeRunning = true;
    time--;
    displayTime();
    if (time <= 10) audio.play();
    if (time === 0 && onBreak === false) breakTime();
    if (time === 0 && onBreak === true) {
        time = currentTime;
        onBreak = false;
        statusText();
    }
}

function breakTime() {
    time = currentBreak;
    onBreak = true;
    statusText();
}

function start() {
    startButton.addEventListener('click', () => {
        currentTime = sessionTime.textContent * 60;
        currentBreak = breakDisplay.textContent * 60;
        startTimer();
    });
}
start();

function pause() {
    pauseButton.addEventListener('click', () => {
        clearInterval(timerId);
        timeRunning = false;
    });
}
pause();

function stop() {
    stopButton.addEventListener('click', function() {
        clearInterval(timerId);
        timeRunning = false;
        time = sessionTime.textContent * 60;
        displayTime();
        status.textContent = "Work, Work, Work, Work, Work";
    });
}
stop();

function startTimer() {
    if (timeRunning) return;
    timerId = setInterval(countDown, 1000);
}

function statusText() {
    if (onBreak) {
        status.textContent = "On a break."
    } else {
        status.textContent = "Back at it!"
    }
}

