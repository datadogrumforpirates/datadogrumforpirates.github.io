let flag = 1; // 1 for X, 0 for O

// Cache all cells and the print element once
const cells = Array.from({ length: 9 }, (_, i) => document.getElementById(`b${i + 1}`));
const printEl = document.getElementById('print');

// Winning combinations by cell indices (0-based)
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns
  [0, 4, 8], [2, 4, 6]                // Diagonals
];

// Function to handle a move in a cell index
function makeMove(index) {
  if (cells[index].value) return; // Ignore if already filled

  cells[index].value = flag === 1 ? 'X' : '0';
  cells[index].disabled = true;
  flag = 1 - flag; // Switch turn
  updateStatus();
}

// Check game status after each move
function updateStatus() {
  const board = cells.map(cell => cell.value.toUpperCase());

  // Check all winning combos
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      printEl.innerHTML = `Player ${board[a]} won`;
      highlightWinner(combo);
      disableAll();
      return;
    }
  }

  // Check for tie
  if (board.every(cell => cell === 'X' || cell === '0')) {
    printEl.innerHTML = "Match Tie";
    return;
  }

  // Otherwise, show next player's turn
  printEl.innerHTML = `Player ${flag === 1 ? 'X' : '0'} Turn`;
}

function highlightWinner(indices) {
  indices.forEach(i => {
    cells[i].style.color = 'red';
  });
}

function disableAll() {
  cells.forEach(cell => cell.disabled = true);
}

// Reset game by reloading page (or reset cells manually if you want)
function resetGame() {
  location.reload();
}

// Attach event listeners dynamically
cells.forEach((cell, index) => {
  cell.onclick = () => {
    makeMove(index);
  };
});
