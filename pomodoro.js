let display = document.querySelector('#timer-display');
let minDisplay = document.querySelector('#mins');
let secDisplay = document.querySelector('#secs');
let startButton = document.querySelector('#play-btn');
let pauseButton = document.querySelector('#pause-btn');
let stopButton = document.querySelector('#stop-btn');
let status = document.querySelector('#status');
let time = 15;
let timerId;
let onBreak = false;

function displayTime() {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    if (mins < 10) mins = convertSingleDigit(mins);
    if (secs < 10) secs = convertSingleDigit(secs);
    minDisplay.textContent = mins;
    secDisplay.textContent = secs;
}


function convertSingleDigit(num) {
    return "0" + num;
}

function countDown() {
    time--;
    displayTime();
    if (time === 0 && onBreak === false) breakTime();
    if (time === 0 && onBreak === true) {
        time = 15;
        onBreak = false;
        statusText();
    }
}

function breakTime() {
    time = 5;
    onBreak = true;
    statusText();
}

function start() {
    startButton.addEventListener('click', startTimer);
}
start();

function pause() {
    pauseButton.addEventListener('click', () => clearInterval(timerId));
}
pause();

function stop() {
    stopButton.addEventListener('click', function() {
        clearInterval(timerId);
        time = 15;
        displayTime();
        status.textContent = "Work, Work, Work, Work, Work";
    });
}
stop();

function startTimer() {
    timerId = setInterval(countDown, 1000);
}

function statusText() {
    if (onBreak) {
        status.textContent = "On a break."
    } else {
        status.textContent = "On it!"
    }
}

