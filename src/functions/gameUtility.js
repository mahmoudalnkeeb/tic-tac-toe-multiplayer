export function updateBoard({
  board,
  rowIndex,
  columnIndex,
  playerTurn,
  powerUp,
}) {
  return board.map((row, i) =>
    row.map((squareData, j) => {
      const isCorrectIndexes = i === rowIndex && j === columnIndex;

      if (powerUp === "Freeze" && isCorrectIndexes) {
        squareData.isFreezed = true;
        return squareData;
      }

      const fillWith =
        isCorrectIndexes && !powerUp ? playerTurn : squareData.fillWith;

      return { ...squareData, fillWith };
    })
  );
}

export function hasNoSquaresAvailable(board) {
  return board.every((row) => row.every(({ fillWith }) => fillWith !== ""));
}

export function isUniform(row) {
  return (
    row[0]?.fillWith !== "" &&
    row.every((squareData) => {
      const isUniform = squareData?.fillWith === row[0]?.fillWith;
      return isUniform && !squareData.isFreezed;
    })
  );
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

export function createBoardBySize(size = 3) {
  const InitialSquare = {
    fillWith: "",
    isFreezed: false,
    isBombed: false,
    swapSelected: false,
  };

  const row = Array.from({ length: size }, () => InitialSquare);
  const board = Array.from({ length: size }, () => [...row]);

  return board;
}

export function updateCoolDownStatus(powerUps) {
  for (const key in powerUps) {
    const powerUp = powerUps[key];

    if (!powerUp.available) powerUp.coolDown -= 1;
    if (powerUp.coolDown <= 0) {
      powerUp.available = true;
      powerUp.coolDown = 10;
    }
  }
}
export function getInitialCoolDown(boardSize) {
  if (typeof boardSize !== "number") return 16;
  if (boardSize === 4) return 11;
  if (boardSize === 5) return 16;
  return 16;
}
