import {
  BOMB_DELETION_DELAY_MS,
  SWAP_SYMBOL_DELAY_MS,
  SYMBOL_O,
  SYMBOL_X,
  WINNER_POPUP_DURATION_MS,
} from "@/data/constants";
import { unSelectAllSquares, updateBoard } from "@/functions/boardUpdater";
import {
  bothPlayersWonWithSwap,
  hasNoSquaresAvailable,
  updateCoolDownStatus,
  whoWins,
} from "@/functions/gameUtility";
import { create } from "zustand";
import { initialGameStates } from "./states";

export const useXOStore = create((set, get) => ({
  ...initialGameStates(),
  resetGame: () => {
    const { boardSize, stats } = get();
    const { p1Wins, draws, p2Wins } = stats;

    set(initialGameStates({ boardSize, stats: { p1Wins, draws, p2Wins } }));
  },
  fillSquare: ({ rowIndex, columnIndex }) => {
    if (!get().hasGameStart) return;

    const { playerTurn, board, declareWinner, handlePowerUpsCoolDown } = get();
    const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;
    const newBoard = updateBoard({ board, rowIndex, columnIndex, playerTurn });

    const theWinner = whoWins(newBoard, playerTurn);
    const noSquaresAvailable = hasNoSquaresAvailable(newBoard);
    const hasPlayerWin = theWinner !== "None" || noSquaresAvailable;

    set({ board: newBoard, playerTurn: hasPlayerWin ? playerTurn : opponent });
    handlePowerUpsCoolDown();
    declareWinner(newBoard);
  },
  declareWinner: (newBoard, usedPowerUp) => {
    const { playerTurn, updateStatsOnWin, showWinnerPopup } = get();
    const theWinner = whoWins(newBoard);
    const noSquaresAvailable = hasNoSquaresAvailable(newBoard);
    const isDraw = noSquaresAvailable && theWinner === "None";
    const bothPlayersWonBySwap = bothPlayersWonWithSwap({
      newBoard,
      theWinner,
      playerTurn,
      usedPowerUp,
    });

    if (bothPlayersWonBySwap) {
      set({ winner: "Draw!", hasGameStart: false });
      updateStatsOnWin({ theWinner: "None", isDraw: true });
      showWinnerPopup();
      return;
    }

    if (theWinner !== "None" || noSquaresAvailable) {
      set({ winner: isDraw ? "Draw!" : theWinner, hasGameStart: false });
      updateStatsOnWin({ theWinner, isDraw });
      showWinnerPopup();
    }
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
  updateBoardSize: (boardSize) => {
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
    const { board, powerUps, freezeSquare, bombSquares, handleSwapPowerUp } =
      get();
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
      handleSwapPowerUp(requiredData);
      return;
    }

    get().handlePowerUpsCoolDown();
  },
  freezeSquare: (requiredData) => {
    const { rowIndex, columnIndex, squareData } = requiredData;
    const { board, powerUps, playerTurn, unSelectPower, disablePowerUp } =
      get();
    const { whoUsingPower, selectedPower } = powerUps;
    const opponent = playerTurn === SYMBOL_X ? SYMBOL_O : SYMBOL_X;
    const isEmptySquare = squareData.fillWith === "";
    const isFreezedSquare = squareData.isFreezed;
    const isOpponentTargeted = squareData.fillWith === opponent;

    if (isEmptySquare) {
      unSelectPower();
      return "Denied: used on an empty square";
    }

    if (isFreezedSquare) {
      unSelectPower();
      return "Denied: the square is already freezed";
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
    const { board, powerUps, squaresToSwap } = get();
    const isSwapPower = powerUps.selectedPower === "Swap";
    const hasSelectSquare = squaresToSwap.length > 0;

    set({
      powerUps: { ...powerUps, selectedPower: null, whoUsingPower: null },
      board: hasSelectSquare && isSwapPower ? unSelectAllSquares(board) : board,
      squaresToSwap: hasSelectSquare && isSwapPower ? [] : squaresToSwap,
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
  scheduleBombDeletion: ({
    rowIndex,
    columnIndex,
    timeout = BOMB_DELETION_DELAY_MS,
  }) => {
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
      declareWinner,
      handlePowerUpsCoolDown,
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

      unSelectPower();
      disablePowerUp({ whoUsingPower, powerUpKey: "swap" });
      handlePowerUpsCoolDown();
      declareWinner(newBoard, "swap");
      set({ board: newBoard, playerTurn: opponent, squaresToSwap: [] });
    }, SWAP_SYMBOL_DELAY_MS);
  },
  selectSquare: (requiredData) => {
    const { rowIndex, columnIndex, squareData } = requiredData;
    const { board, playerTurn, squaresToSwap } = get();
    const isEmptySquare = squareData.fillWith === "";

    if (isEmptySquare) {
      return "Invalid target: swap must be used on symbol square";
    }

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
  handleSwapPowerUp: (requiredData) => {
    const { board, squaresToSwap, selectSquare, swapSquare } = get();
    const isEmptySquare = requiredData.squareData.fillWith === "";
    const isAlreadySelected = requiredData.squareData.swapSelected;
    const isFirstSelection = squaresToSwap.length === 0;
    const isSecondSelection = squaresToSwap.length === 1;

    if (isEmptySquare) {
      return "Invalid target: swap must be used on symbol square";
    }

    if (isFirstSelection && !isSecondSelection) {
      selectSquare(requiredData);
      return "Selected first square";
    }

    if (isAlreadySelected) {
      const newBoard = unSelectAllSquares(board);
      set({ board: newBoard, squaresToSwap: [] });
      return "Unselect squares";
    }

    if (isSecondSelection) {
      selectSquare(requiredData);
      swapSquare(requiredData);
    }
  },
}));
