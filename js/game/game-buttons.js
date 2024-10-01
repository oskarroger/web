
// Creates functions and HTML for the game buttons.

// Imports
import {buttonClick} from './cn-game.js';

// Get HTML elements and create variables.
const questionContainerRef = document.getElementById('js-buttons');
const nButtonsNeeded = 12;
let gameButtonsHTML = '';

// Render to screen function.
export function renderGameButtons() {
    createGameButtonsHTML();
    questionContainerRef.innerHTML = gameButtonsHTML;
    addClickyness();
}

// Function to create the combined HTML.
function createGameButtonsHTML() {
    for (let i = 1; i <= nButtonsNeeded; i++) {
        gameButtonsHTML += `
            <div class="game-button" id="game-button-${i}">
                <p class="game-button-text" id="game-button-text-${i}">${i}</p>
            </div>
            `;
    }   
}

// Function to add event listener to each button. The function is imported from cn-game.js.
function addClickyness() {
    for (let i = 1; i <= nButtonsNeeded; i++) {
        document.getElementById(`game-button-${i}`).addEventListener('click', () => {buttonClick(i)});
    }
}
