// Imports
import {gameTimeLimit, answerTimeLimit} from './cn-game.js';
import {scoreBoardTotalTimeRemaining, scoreBoardAnswerTimer} from './score-board.js';

// HTML element references
const timeBarInner = document.getElementById('js-time-bar-inner');

// Game timer variables
let gameTime = 0;
let gameTimeStart = 0;
let totalGameTime = 0;
let gameTimerId = '';
let timeRemaining = 0;

// Answer timer variables
let startTime = 0;
let timeElapsed = 0;
let timerSeconds = 0;
let answerTimerID = 0;
export let countDownTimer = 0;

// Function to change startTime variable from outside if neccessary.
export function startTimeChanger(newValue) {
    startTime = newValue;
}

// Game timer function.
export function gameTimer() {
    if (!gameTime) {
        gameTimeStart = Date.now();
        gameTimerId = setInterval( () => {gameTimer()}, 100);
        gameTime = 1;
        timeRemaining = gameTimeLimit;
    } else if (timeRemaining > 0) {
        totalGameTime = (Date.now() - gameTimeStart) / 1000;
        timeRemaining = Math.max(0, (gameTimeLimit - totalGameTime)).toFixed(1);
        scoreBoardTotalTimeRemaining(timeRemaining);
        // console.log(timeRemaining);
    } else {
        console.log('game over')
        clearInterval(gameTimerId);
    }
}

// Answer timer function.
export function answerTimer() {
    // Get a new starting time if startTime is falsy and start the timer.
    if (!startTime) {
        startTime = Date.now();
        answerTimerID = setInterval( () => {answerTimer()}, 100);
    }
    // Calculated elapsed time.
    timeElapsed = Date.now() - startTime;
    // Stop the timer if desired time has passed.
    if (timeElapsed >= (answerTimeLimit * 1000)) {
        clearInterval(answerTimerID);
    }
    // Convert to seconds.
    timerSeconds = (timeElapsed / 1000);
    // Created countdown timer variable. Set to 1 decimal. Ensure it's never < 0.
    countDownTimer = Math.max(0, (answerTimeLimit - timerSeconds)).toFixed(1);
    // Render to score board area.
    scoreBoardAnswerTimer(countDownTimer);
    // Handle Answer Timer stress bar
    timeBarInner.style.width = 10 * countDownTimer + "%";
}