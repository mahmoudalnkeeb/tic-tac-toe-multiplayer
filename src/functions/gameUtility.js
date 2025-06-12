import { SYMBOL_O, SYMBOL_X } from "@/data/constants";

export function hasNoSquaresAvailable(board) {
  return board.every((row) => row.every(({ fillWith }) => fillWith !== ""));
}

export function isUniform(row, player) {
  return (
    row[0]?.fillWith !== "" &&
    row.every((squareData) => {
      const isUniform = squareData?.fillWith === row[0]?.fillWith;
      return (
        isUniform && !squareData.isFreezed && player === squareData?.fillWith
      );
    })
  );
}

export function isWinByLine(board, player) {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    const row = board[i];
    const column = board.map((row) => row[i]);

    if (isUniform(row, player) || isUniform(column, player)) return true;
  }

  return false;
}

export function isWinDiagonally(board, player) {
  const size = board.length;

  const diagonal1 = [];
  const diagonal2 = [];

  for (let i = 0; i < size; i++) {
    diagonal1.push(board[i][i]);
    diagonal2.push(board[i][size - 1 - i]);
  }

  return isUniform(diagonal1, player) || isUniform(diagonal2, player);
}

export function whoWins(board, player) {
  if (isWinByLine(board, player) || isWinDiagonally(board, player)) {
    return player;
  }

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

export function bothPlayersWonWithSwap({
  newBoard,
  theWinner,
  playerTurn,
  usedPowerUp,
}) {
  const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;
  const opponentIsWinner = whoWins(newBoard, opponent);

  return (
    theWinner !== "None" &&
    (opponentIsWinner !== "None") & (usedPowerUp === "swap")
  );
}
