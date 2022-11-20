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

//Grab restart button
const restartButton = document.getElementById('restartButton');

const winMsgElement = document.getElementById('winMsg');
const winMsgTextElement = document.querySelector('[data-win-msg-text]');
let circleTurn;

startGame();

function addButtons(e) {
  if (e.key === 'Tab') {
    console.log('tab key pressed');

    //if tab is pressed, add buttons to all cells
    cellElements.forEach((cell) => {
      let buttonElement = document.createElement('button');
      cell.appendChild(buttonElement);
      buttonElement.classList.add('action-button');
      buttonElement.innerHTML = `${
        circleTurn ? 'Place O Symbol' : 'Place X Symbol'
      }`;
    });
    document.removeEventListener('keydown', addButtons);
  }
}

// Add listener to restart button
restartButton.addEventListener('click', startGame);

function startGame() {
  // Add listener to entire document when tab key is pressed to insert buttons
  document.addEventListener('keydown', addButtons);
  circleTurn = false;

  cellElements.forEach((cell) => {
    // resets before game starts again
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);

    // add click listener to the cells and once only
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winMsgElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winMsgTextElement.innerText = 'Draw!';
  } else {
    winMsgTextElement.innerText = `${circleTurn ? 'O' : 'X'} Wins!`;
  }

  // Removes all innerBtns before showing endgame UI
  let innerBtns = document.querySelectorAll('.action-button');
  for (var i = 0; i < innerBtns.length; i++) {
    innerBtns[i].remove();
  }

  winMsgElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  // remove button element after a symbol is placed using tab
  if (cell.hasChildNodes()) {
    cell.parentNode.classList.add(currentClass);
    cell.remove();
  } else {
    cell.classList.add(currentClass);
  }
}

function swapTurns() {
  circleTurn = !circleTurn;

  let cellBtn = document.getElementsByClassName('action-button');
  for (var i = 0; i < cellBtn.length; i++) {
    cellBtn[i].innerHTML = `${
      circleTurn ? 'Place O Symbol' : 'Place X Symbol'
    }`;
  }
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

function checkWin(currentClass) {
  return WIN_COMBO.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
