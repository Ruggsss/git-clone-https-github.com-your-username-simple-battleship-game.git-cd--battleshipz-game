const playerBoard = document.getElementById('player-board');
const aiBoard = document.getElementById('ai-board');
const startGameButton = document.getElementById('start-game');
const gameStatus = document.getElementById('game-status');

let playerShips = [];
let aiShips = [];
let gameActive = false;

// Function to create a grid
function createBoard(board, isPlayer = true) {
  board.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    if (!isPlayer) {
      cell.addEventListener('click', () => handleCellClick(i));
    }
    board.appendChild(cell);
  }
}

// Initialize the boards
createBoard(playerBoard, true);
createBoard(aiBoard, false);

// Randomly place ships
function placeShips(board, isPlayer) {
  let ships = new Set();
  while (ships.size < 5) { // Placing 5 ships
    const randomPos = Math.floor(Math.random() * 100);
    ships.add(randomPos);
    if (isPlayer) {
      playerBoard.children[randomPos].classList.add('ship');
    }
  }
  return Array.from(ships);
}

// Handle player click
function handleCellClick(index) {
  if (!gameActive) return;
  if (aiShips.includes(index)) {
    aiBoard.children[index].classList.add('hit');
    aiShips = aiShips.filter(ship => ship !== index);
    gameStatus.textContent = "Hit! Keep going!";
    if (aiShips.length === 0) {
      gameStatus.textContent = "You Win!";
      gameActive = false;
    }
  } else {
    aiBoard.children[index].classList.add('miss');
    gameStatus.textContent = "Miss! AI's turn.";
    setTimeout(aiTurn, 1000);
  }
}

// AI's turn (random attack but avoids duplicates)
function aiTurn() {
  let attackIndex;
  do {
    attackIndex = Math.floor(Math.random() * 100);
  } while (playerBoard.children[attackIndex].classList.contains('hit') || playerBoard.children[attackIndex].classList.contains('miss'));

  if (playerShips.includes(attackIndex)) {
    playerBoard.children[attackIndex].classList.add('hit');
    playerShips = playerShips.filter(ship => ship !== attackIndex);
    gameStatus.textContent = "AI hit your ship!";
    if (playerShips.length === 0) {
      gameStatus.textContent = "AI Wins!";
      gameActive = false;
    }
  } else {
    playerBoard.children[attackIndex].classList.add('miss');
    gameStatus.textContent = "AI missed! Your turn.";
  }
}

// Start a new game
startGameButton.addEventListener('click', () => {
  playerShips = placeShips(playerBoard, true);
  aiShips = placeShips(aiBoard, false);
  gameActive = true;
  gameStatus.textContent = "Game started! Your turn.";
});
