export function updateBoard({
  board,
  rowIndex,
  columnIndex,
  playerTurn,
  powerUp,
  squaresToSwap = [],
}) {
  if (powerUp === "Swap" && squaresToSwap.length === 2) {
    return swapSymbolsOnBoard({ board, squaresToSwap });
  }

  if (powerUp === "Select") {
    return selectSwapSquare({ board, rowIndex, columnIndex });
  }

  if (powerUp === "Bomb") {
    return triggerBombEffect({
      board,
      rowIndex,
      columnIndex,
    });
  }

  if (powerUp === "Delete Bomb") {
    return deleteBombEffect(board);
  }

  return fillOrFreezeSquare({
    board,
    rowIndex,
    columnIndex,
    powerUp,
    playerTurn,
  });
}

export function triggerBombEffect({
  rowIndex,
  columnIndex,
  board,
  radius = 1,
}) {
  const boardSize = board.length;

  for (let dimensionX = -radius; dimensionX <= radius; dimensionX++) {
    for (let dimensionY = -radius; dimensionY <= radius; dimensionY++) {
      const newRow = rowIndex + dimensionX;
      const newCol = columnIndex + dimensionY;

      const isOutOfBounds =
        newRow < 0 || newCol < 0 || newRow >= boardSize || newCol >= boardSize;

      if (isOutOfBounds) continue;

      const targetedSquare = board[newRow][newCol];

      if (targetedSquare.isFreezed) {
        targetedSquare.isFreezed = false;
        continue;
      }

      targetedSquare.isBombed = true;
      targetedSquare.fillWith = "";
    }
  }

  return board;
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

export function deleteBombEffect(board) {
  return board.map((row) =>
    row.map((squareData) => {
      if (squareData.isBombed) {
        squareData.isBombed = false;
      }

      return squareData;
    })
  );
}

export function swapSymbolsOnBoard({ board, squaresToSwap }) {
  const [[row1, col1], [row2, col2]] = squaresToSwap;
  const firstSymbol = board[row1]?.[col1]?.fillWith;
  const secondSymbol = board[row2]?.[col2]?.fillWith;

  return board.map((row, i) =>
    row.map((squareData, j) => {
      squareData.swapSelected = false;

      if (i === row1 && j === col1) {
        return { ...squareData, fillWith: secondSymbol };
      }

      if (i === row2 && j === col2) {
        return { ...squareData, fillWith: firstSymbol };
      }

      return squareData;
    })
  );
}

export function selectSwapSquare({ board, rowIndex, columnIndex }) {
  return board.map((row, i) =>
    row.map((squareData, j) => {
      const isCorrectIndexes = i === rowIndex && j === columnIndex;

      if (isCorrectIndexes) {
        squareData.swapSelected = true;
        return squareData;
      }

      return squareData;
    })
  );
}

export function fillOrFreezeSquare({
  board,
  rowIndex,
  columnIndex,
  powerUp,
  playerTurn,
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
