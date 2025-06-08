import {
  hasNoSquaresAvailable,
  updateBoard,
  whoWins,
} from "@/functions/gameUtility";
import { create } from "zustand";

const initialGameStates = () => ({
  hasGameStart: true,
  playerTurn: "X",
  borderSize: "3",
  winner: "",
  board: [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
});

export const useXOStore = create((set, get) => ({
  ...initialGameStates(),
  updateGameState: ({ key, value }) => set({ [key]: value }),
  startGame: () => {
    get().resetGame();
  },
  resetGame: () => set(initialGameStates()),
  fillSquare: ({ rowIndex, columnIndex }) => {
    if (!get().hasGameStart) return;

    const { playerTurn, board, declareWinner } = get();
    const opponent = playerTurn === "X" ? "O" : "X";
    const newBoard = updateBoard({ board, rowIndex, columnIndex, playerTurn });

    set({ board: newBoard, playerTurn: opponent });

    const theWinner = whoWins(newBoard, playerTurn);
    const noSquaresAvailable = hasNoSquaresAvailable(newBoard);

    if (theWinner !== "None" || noSquaresAvailable) {
      declareWinner({ theWinner, noSquaresAvailable });
    }
  },
  declareWinner: ({ theWinner, noSquaresAvailable } = {}) =>
    set({
      winner: noSquaresAvailable ? "Draw!" : theWinner,
      hasGameStart: false,
    }),
}));
