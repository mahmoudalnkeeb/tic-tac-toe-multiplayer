export function updateBoard({
  board,
  rowIndex,
  columnIndex,
  playerTurn,
  powerUp,
  squaresToSwap = [],
}) {
  if (powerUp === "Select") {
    return selectSwapSquare({ board, rowIndex, columnIndex });
  }

  if (powerUp === "Swap" && squaresToSwap.length === 2) {
    return swapSymbolsOnBoard({ board, squaresToSwap });
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
