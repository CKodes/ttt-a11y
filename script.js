const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

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

// add click listener to the cells and once only
cellElements.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

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
