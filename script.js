const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill("");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.addEventListener('click', handleClick);
    div.textContent = cell;
    board.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "🤝 Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index] === currentPlayer);
  });
}

restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  cells = Array(9).fill("");
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
  createBoard();
});

createBoard();
statusText.textContent = `Vez do jogador ${currentPlayer}`;
