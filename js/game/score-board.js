
import {score, bestStreak, currentStreak, correctTotal, errorTotal} from './cn-game.js';

// Grab HTML element references.
const scoreBoardHTMLRef = document.getElementById('js-score-board');
const answerTimerHTMLRef = document.getElementById('js-answer-timer');
const totalTimerHTMLRef = document.getElementById('js-total-timer');

export function update() {
    scoreBoardHTMLRef.innerHTML = `
        <p>Current score: ${score}</p>
        <p>Best streak: ${bestStreak}</p>
        <p>Current streak: ${currentStreak}</p>
        <br>
        <p>Correct answers: ${correctTotal}</p>
        <p>Incorrect answers: ${errorTotal}</p>
        <br>
`;
}

export function scoreBoardAnswerTimer(time) {
    answerTimerHTMLRef.innerHTML = `
    <p>${time}</p>
    `;
}

export function scoreBoardTotalTimeRemaining(time) {
    totalTimerHTMLRef.innerHTML = `
    <p>Time remaining: ${time}</p>
    `;
}