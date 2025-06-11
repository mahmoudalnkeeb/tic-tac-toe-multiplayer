import {
  FIRST_PLAYER,
  INITIAL_BOARD_SIZE,
  SWAP_SYMBOL_DELAY_MS,
  SYMBOL_O,
  SYMBOL_X,
  WINNER_POPUP_DURATION_MS,
} from "@/data/constants";
import { updateBoard } from "@/functions/boardUpdater";
import {
  createBoardBySize,
  getInitialCoolDown,
  hasNoSquaresAvailable,
  updateCoolDownStatus,
  whoWins,
} from "@/functions/gameUtility";
import { create } from "zustand";

const initialGameStates = ({ boardSize = INITIAL_BOARD_SIZE, stats } = {}) => ({
  hasGameStart: true,
  playerTurn: FIRST_PLAYER,
  boardSize,
  winner: "",
  board: createBoardBySize(boardSize),
  isWinnerPopupVisible: false,
  squaresToSwap: [],
  stats: { ...initialStats(stats) },
  powerUps: {
    player1: { ...initialPowerUps(boardSize) },
    player2: { ...initialPowerUps(boardSize) },
    selectedPower: null,
    whoUsingPower: null,
  },
});

const initialStats = ({ p1Wins = 0, draws = 0, p2Wins = 0 } = {}) => ({
  p1Wins,
  draws,
  p2Wins,
});

const initialPowerUps = (boardSize) => ({
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

export const useXOStore = create((set, get) => ({
  ...initialGameStates(),
  updateGameState: ({ key, value }) => set({ [key]: value }),
  resetGame: ({ boardSize } = {}) => {
    const { p1Wins, draws, p2Wins } = get().stats;
    set(initialGameStates({ boardSize, stats: { p1Wins, draws, p2Wins } }));
  },
  fillSquare: ({ rowIndex, columnIndex }) => {
    if (!get().hasGameStart) return;

    const { playerTurn, board, declareWinner } = get();
    const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;
    const newBoard = updateBoard({ board, rowIndex, columnIndex, playerTurn });

    set({ board: newBoard, playerTurn: opponent });
    get().handlePowerUpsCoolDown();

    const theWinner = whoWins(newBoard, playerTurn);
    const noSquaresAvailable = hasNoSquaresAvailable(newBoard);

    if (theWinner !== "None" || noSquaresAvailable) {
      declareWinner({ theWinner, noSquaresAvailable });
    }
  },
  declareWinner: ({ theWinner, noSquaresAvailable } = {}) => {
    const isDraw = noSquaresAvailable && theWinner === "None";

    set({
      winner: isDraw ? "Draw!" : theWinner,
      hasGameStart: false,
    });
    get().updateStatsOnWin({ theWinner, isDraw });
    get().showWinnerPopup();
  },
  updateStatsOnWin: ({ theWinner, isDraw }) => {
    const { p1Wins, draws, p2Wins } = get().stats;
    const updatedStats = {
      p1Wins: theWinner === SYMBOL_O ? p1Wins + 1 : p1Wins,
      draws: isDraw ? draws + 1 : draws,
      p2Wins: theWinner === SYMBOL_X ? p2Wins + 1 : p2Wins,
    };

    set({ stats: updatedStats });
    return updatedStats;
  },
  updateBoardSize: ({ boardSize } = {}) => {
    set({ boardSize });
    get().resetGame({ boardSize });
  },
  showWinnerPopup: () => {
    set({ isWinnerPopupVisible: true });

    setTimeout(() => {
      set({ isWinnerPopupVisible: false });
    }, WINNER_POPUP_DURATION_MS);
  },
  usePowerUp: ({ rowIndex, columnIndex }) => {
    const {
      board,
      powerUps,
      freezeSquare,
      bombSquares,
      swapSquare,
      squaresToSwap,
      selectSquare,
    } = get();
    const squareData = board[rowIndex][columnIndex];
    const requiredData = { rowIndex, columnIndex, squareData };
    const { selectedPower } = powerUps;

    if (selectedPower === "Freeze") {
      freezeSquare(requiredData);
    }

    if (selectedPower === "Bomb") {
      bombSquares(requiredData);
    }

    if (selectedPower === "Swap") {
      if (squaresToSwap.length === 0) {
        selectSquare(requiredData);
        return;
      }

      if (squaresToSwap.length === 1) {
        selectSquare(requiredData);
        swapSquare(requiredData);
      }
    }

    get().handlePowerUpsCoolDown();
  },
  freezeSquare: (requiredData) => {
    const { rowIndex, columnIndex, squareData } = requiredData;
    const { board, powerUps, playerTurn, unSelectPower, disablePowerUp } =
      get();
    const { whoUsingPower, selectedPower } = powerUps;
    const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;
    const isOpponentTargeted = squareData.fillWith === opponent;

    if (squareData.fillWith === "") {
      unSelectPower();
      return "Denied: used on an empty square";
    }

    if (!isOpponentTargeted) {
      unSelectPower();
      return "Invalid target: power-up must be used on opponent's square";
    }

    const newBoard = updateBoard({
      board,
      rowIndex,
      columnIndex,
      playerTurn,
      powerUp: selectedPower,
    });

    set({ board: newBoard, playerTurn: opponent });
    unSelectPower();
    disablePowerUp({ whoUsingPower, powerUpKey: "freeze" });
  },
  bombSquares: (requiredData) => {
    const {
      board,
      powerUps,
      playerTurn,
      unSelectPower,
      disablePowerUp,
      scheduleBombDeletion,
    } = get();
    const { rowIndex, columnIndex } = requiredData;
    const { whoUsingPower, selectedPower } = powerUps;
    const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;

    const newBoard = updateBoard({
      board,
      rowIndex,
      columnIndex,
      playerTurn,
      powerUp: selectedPower,
    });

    set({ board: newBoard, playerTurn: opponent });
    unSelectPower();
    disablePowerUp({ whoUsingPower, powerUpKey: "bomb" });
    scheduleBombDeletion({ rowIndex, columnIndex });
  },
  selectPowerUp: ({ selectedPower, whoUsingPower }) => {
    set({ powerUps: { ...get().powerUps, selectedPower, whoUsingPower } });
  },
  unSelectPower: () => {
    set({
      powerUps: { ...get().powerUps, selectedPower: null, whoUsingPower: null },
    });
  },
  handlePowerUpsCoolDown: () => {
    updateCoolDownStatus(get().powerUps.player1);
    updateCoolDownStatus(get().powerUps.player2);
  },
  disablePowerUp: ({ whoUsingPower, powerUpKey }) => {
    const powerUpsCopy = { ...get().powerUps };
    powerUpsCopy[whoUsingPower][powerUpKey].available = false;
    set({ powerUps: powerUpsCopy });
  },
  scheduleBombDeletion: ({ rowIndex, columnIndex, timeout = 1000 }) => {
    const { board, playerTurn } = get();

    setTimeout(() => {
      const newBoard = updateBoard({
        board,
        rowIndex,
        columnIndex,
        playerTurn,
        powerUp: "Delete Bomb",
      });

      set({ board: newBoard });
    }, timeout);
  },
  swapSquare: (requiredData) => {
    const { rowIndex, columnIndex } = requiredData;
    const {
      board,
      powerUps,
      playerTurn,
      unSelectPower,
      squaresToSwap,
      disablePowerUp,
    } = get();
    const { whoUsingPower, selectedPower } = powerUps;
    const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;

    setTimeout(() => {
      const newBoard = updateBoard({
        board,
        rowIndex,
        columnIndex,
        playerTurn,
        powerUp: selectedPower,
        squaresToSwap,
      });

      set({ board: newBoard, playerTurn: opponent, squaresToSwap: [] });
      unSelectPower();
      disablePowerUp({ whoUsingPower, powerUpKey: "swap" });
    }, SWAP_SYMBOL_DELAY_MS);
  },
  selectSquare: (requiredData) => {
    const { rowIndex, columnIndex } = requiredData;
    const { board, playerTurn, squaresToSwap } = get();

    const newBoard = updateBoard({
      board,
      rowIndex,
      columnIndex,
      playerTurn,
      powerUp: "Select",
    });
    const squaresToSwapCopy = [...squaresToSwap, [rowIndex, columnIndex]];

    set({ board: newBoard, squaresToSwap: squaresToSwapCopy });
  },
}));
