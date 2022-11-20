const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Create an array of all winning combinations
const WIN_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Grab all cells from html
const cellElements = document.querySelectorAll('[data-cell]');

// Grab board from html
const board = document.getElementById('board');
let circleTurn;

// Add kb listener to document
/*
document.addEventListener('keydown', handleTab);

function handleTab(e) {
  if (e.key === 'Tab') {
    console.log('tab key pressed');

    //if tab is pressed, add buttons to all cells
    cellElements.forEach((cell) => {
      let buttonElement = document.createElement('button');
      cell.appendChild(buttonElement);
      buttonElement.classList.add('action-button');
      buttonElement.innerHTML = `Add X or O to this cell`;

      // Add listener to button inside cell
      buttonElement.addEventListener('click', () => {
        console.log('button clicked');
      });
    });

    document.removeEventListener('keydown', handleTab);
  }
}
*/

startGame();

function startGame() {
  circleTurn = false;

  // add click listener to the cells and once only
  cellElements.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  swapTurns();
  setBoardHoverClass();
  console.log('clicked');
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
