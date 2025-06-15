const { FIRST_PLAYER, INITIAL_BOARD_SIZE } = require("@/data/constants");
const {
  createBoardBySize,
  getInitialCoolDown,
} = require("@/functions/gameUtility");

export const initialGameStates = ({
  boardSize = INITIAL_BOARD_SIZE,
  stats,
} = {}) => ({
  hasGameStart: true,
  playerTurn: FIRST_PLAYER,
  boardSize,
  winner: "",
  board: createBoardBySize(boardSize),
  isWinnerPopupVisible: false,
  squaresToSwap: [],
  stats: initialStats(stats),
  powerUps: {
    player1: initialPlayerPowerUps(boardSize),
    player2: initialPlayerPowerUps(boardSize),
    selectedPower: null,
    whoUsingPower: null,
  },
});

export const initialStats = ({ p1Wins = 0, draws = 0, p2Wins = 0 } = {}) => ({
  p1Wins,
  draws,
  p2Wins,
});

const initialPlayerPowerUps = (boardSize) => ({
  freeze: {
    available: true,
    coolDown: getInitialCoolDown(boardSize),
  },
  bomb: {
    available: true,
    coolDown: getInitialCoolDown(boardSize),
  },
  swap: {
    available: true,
    coolDown: getInitialCoolDown(boardSize),
  },
});
