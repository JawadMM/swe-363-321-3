let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

function makeMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      alert("Player " + board[a] + " wins!");
      resetBoard();
      return;
    }
  }

  if (!board.includes("")) {
    alert("It's a draw!");
    resetBoard();
  }
}

function resetBoard() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.innerText = "";
  }
}
