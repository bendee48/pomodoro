let display = document.querySelector('#timer-display');
let minDisplay = document.querySelector('#mins');
let secDisplay = document.querySelector('#secs');
let startButton = document.querySelector('#play-btn');
let pauseButton = document.querySelector('#pause-btn');
let stopButton = document.querySelector('#stop-btn');
let time = 300;
let timerId;

function displayTime() {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    if (mins < 10) mins = convertSingleDigit(mins);
    if (secs < 10) secs = convertSingleDigit(secs);
    minDisplay.textContent = mins;
    secDisplay.textContent = secs;
}
displayTime();

function convertSingleDigit(num) {
    return "0" + num;
}

function countDown() {
    displayTime();
    time--;
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
        time = 300;
        displayTime();
    });
}
stop();

function startTimer() {
    timerId = setInterval(countDown, 1000);
}

