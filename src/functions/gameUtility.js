export function updateBoard({ board, rowIndex, columnIndex, playerTurn }) {
  return board.map((row, i) =>
    row.map((cell, j) =>
      i === rowIndex && j === columnIndex ? playerTurn : cell
    )
  );
}

export function hasNoSquaresAvailable(board) {
  return board.every((row) => row.every((cell) => cell !== ""));
}

export function checkSingleDiagonal(diagonal) {
  return diagonal[0] !== "" && diagonal.every((item) => item === diagonal[0]);
}

export function isUniform(arr) {
  return arr[0] !== "" && arr.every((cell) => cell === arr[0]);
}

export function isWinByLine(board) {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    const row = board[i];
    const column = board.map((row) => row[i]);

    if (isUniform(row) || isUniform(column)) return true;
  }

  return false;
}

export function isWinDiagonally(board) {
  const size = board.length;

  const diagonal1 = [];
  const diagonal2 = [];

  for (let i = 0; i < size; i++) {
    diagonal1.push(board[i][i]);
    diagonal2.push(board[i][size - 1 - i]);
  }

  return isUniform(diagonal1) || isUniform(diagonal2);
}

export function whoWins(board, player) {
  if (isWinByLine(board) || isWinDiagonally(board)) return player;
  return "None";
}
