const playerBoard = document.getElementById('player-board');
const aiBoard = document.getElementById('ai-board');
const startGameButton = document.getElementById('start-game');

let playerShips = [];
let aiShips = [];

// Function to create a grid
function createBoard(board, isPlayer = true) {
  board.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(i, isPlayer));
    board.appendChild(cell);
  }
}

// Initialize the boards
createBoard(playerBoard, true);
createBoard(aiBoard, false);

// Randomly place ships
function placeShips(board, isPlayer) {
  let ships = [];
  while (ships.length < 5) { // For simplicity, we're placing 5 ships
    const randomPos = Math.floor(Math.random() * 100);
    if (!ships.includes(randomPos)) {
      ships.push(randomPos);
      if (isPlayer) {
        playerBoard.children[randomPos].classList.add('ship');
      } else {
        aiBoard.children[randomPos].classList.add('ship');
      }
    }
  }
  return ships;
}

// Handle player click
function handleCellClick(index, isPlayer) {
  if (isPlayer) return; // Can't click on your own board
  if (aiShips.includes(index)) {
    aiBoard.children[index].classList.add('hit');
    aiShips = aiShips.filter(ship => ship !== index);
    if (aiShips.length === 0) alert('You Win!');
  } else {
    aiBoard.children[index].classList.add('miss');
  }
  aiTurn();
}

// AI's turn (just random attack)
function aiTurn() {
  const randomIndex = Math.floor(Math.random() * 100);
  if (playerShips.includes(randomIndex)) {
    playerBoard.children[randomIndex].classList.add('hit');
    playerShips = playerShips.filter(ship => ship !== randomIndex);
    if (playerShips.length === 0) alert('AI Wins!');
  } else {
    playerBoard.children[randomIndex].classList.add('miss');
  }
}

// Start a new game
startGameButton.addEventListener('click', () => {
  playerShips = placeShips(playerBoard, true);
  aiShips = placeShips(aiBoard, false);
});
