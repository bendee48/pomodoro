let display = document.querySelector('#timer-display');
let startButton = document.querySelector('#play-btn');
let pauseButton = document.querySelector('#pause-btn');
let stopButton = document.querySelector('#stop-btn');
let timerId;

function countDown() {
    let time = display.textContent;
    time--
    display.textContent = time;
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
        display.textContent = 25;
    });
}
stop();

function startTimer() {
    timerId = setInterval(countDown, 1000);
}

