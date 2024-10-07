// Imports
import * as cnData from './cn-data.js';
import * as gameButtons from './game-buttons.js';
import * as timers from './timers.js';
import * as scoreBoard from './score-board.js';

// Get HTML elements and create reference variables
const questionContainerRef = document.getElementById('js-question');
const timeBarContainerRef = document.getElementById('js-time-bar');
const gameButtonsRef = document.getElementById('js-buttons');
const rightPanelRef = document.getElementById('js-right');

// Variable declarations
let questionHTML = '';
let questionNerve = '';
let oldQuestionNerve = null;
export let correctTotal = 0;
export let currentStreak = 0;
export let bestStreak = 0;
export let errorTotal = 0;
export let score = 0;

export const gameTimeLimit = 5;
export const answerTimeLimit = 10;
const baseScore = 50;

// Initialize!
export function initGame() {
    startGame();
    timeBarContainerRef.classList.toggle("hidden");
    gameButtonsRef.classList.toggle("hidden");
    rightPanelRef.classList.toggle("hidden");
}

// Start the Game!
function startGame() {
    askQuestion();
    timeBarContainerRef.classList.toggle("hidden");
    gameButtons.renderGameButtons();
    gameButtonsRef.classList.toggle("hidden");
    rightPanelRef.classList.toggle("hidden");
    scoreBoard.update();
    timers.gameTimer();
    console.log(timeBarContainerRef);
}

// Function that takes the randomCn from cnData and processes it into a new question.
// It then puts the question into a variable in HTML format and runs the HTML updater function.
function askQuestion() {
    // Check if there was a previous question asked. (Thruthy value)
    if (oldQuestionNerve) {
    // If there was a previous question, get a new, if it's the same number, restart function.
    questionNerve = cnData.randomCn();
        if (questionNerve[0] === oldQuestionNerve[0]) {
            askQuestion();
        }
        // If not same number, proceed.
        else {
            oldQuestionNerve = questionNerve;
            questionHTML = `<p>What is the number of the...<br>${questionNerve[1]} nerve?</p>`;
            updateQuestionHTML();
            timers.answerTimer();
        }
    }
    // If there was no previous question asked (new game), ask question.
    else {
    questionNerve = cnData.randomCn();
    oldQuestionNerve = questionNerve;
    questionHTML = `<p>What is the number of the...<br>${questionNerve[1]} nerve?</p>`;
    updateQuestionHTML();
    timers.answerTimer();
    }
}

// Function that updates the question HTML.
function updateQuestionHTML() {
    questionContainerRef.innerHTML = questionHTML;
}

// Function that triggers when button is clicked.
// Determines if the answer is correct or not.
export function buttonClick(number) {
    if (number === questionNerve[0]) {
        correctAnswer();
    } else {
        wrongAnswer();
    }
}

// Handles correct answers.
function correctAnswer() {
    correctTotal++;
    currentStreak++;
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
    }
    scoreCounter();
    clearInterval(timers.answerTimerID);
    timers.startTimeChanger(0);
    askQuestion();
}

// Score keeping function.
function scoreCounter() {
    // First game time 1 second full score grace period.
    if (timers.countDownTimer > 9) {
        score = score + (baseScore * 10);
        // Planned future on screen speed encouragement.
        console.log('Speedy!');
    } else {
    // Score based on time remaing on timers.countDownTimer.
    score = Math.round(score + Math.max(baseScore, (baseScore * timers.countDownTimer)));
    }
    scoreBoard.update();
}

// Handles wrong answers.
function wrongAnswer() {
    errorTotal++;
    currentStreak = 0;
    scoreBoard.update();
}