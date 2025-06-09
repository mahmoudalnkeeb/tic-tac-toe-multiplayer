import {
  FIRST_PLAYER,
  INITIAL_BOARD_SIZE,
  SYMBOL_O,
  SYMBOL_X,
} from "@/data/constants";
import {
  createBoardBySize,
  hasNoSquaresAvailable,
  updateBoard,
  whoWins,
} from "@/functions/gameUtility";
import { create } from "zustand";

const initialGameStates = ({ boardSize = INITIAL_BOARD_SIZE, stats } = {}) => ({
  hasGameStart: true,
  playerTurn: FIRST_PLAYER,
  boardSize,
  winner: "",
  board: createBoardBySize(boardSize),
  stats: { ...initialStats(stats) },
});

const initialStats = ({ p1Wins = 0, draws = 0, p2Wins = 0 } = {}) => ({
  p1Wins,
  draws,
  p2Wins,
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
}));
