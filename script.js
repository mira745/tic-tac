document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById('game-board');
  const statusDisplay = document.getElementById('status');
  const resetButton = document.getElementById('reset');

  let board = Array(9).fill('');
  let currentPlayer = 'X';
  let gameActive = true;

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Update game status text
  const updateStatus = (message) => {
    statusDisplay.textContent = message;
  };

  // Check for a win or draw
  const checkGameResult = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameActive = false;
        updateStatus(`Player ${currentPlayer} wins!`);
        return;
      }
    }

    if (!board.includes('')) {
      gameActive = false;
      updateStatus("It's a draw!");
    }
  };

  // Handle cell click
  const handleCellClick = (e) => {
    const cellIndex = e.target.dataset.index;

    if (board[cellIndex] || !gameActive) return;

    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkGameResult();
    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus(`It's ${currentPlayer}'s turn`);
    }
  };

  // Reset game
  const resetGame = () => {
    board = Array(9).fill('');
    gameActive = true;
    currentPlayer = 'X';
    gameBoard.innerHTML = '';
    initializeGameBoard();
    updateStatus(`It's ${currentPlayer}'s turn`);
  };

  // Initialize game board
  const initializeGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      gameBoard.appendChild(cell);
    }
    updateStatus(`It's ${currentPlayer}'s turn`);
  };

  resetButton.addEventListener('click', resetGame);
  initializeGameBoard();
});
