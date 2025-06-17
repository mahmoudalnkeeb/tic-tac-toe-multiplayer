import { SYMBOL_O, SYMBOL_X } from "./constants";

export const POWER_UPS_BUTTONS = [
  {
    id: "freeze",
    name: "Freeze",
    icon: "❄️",
  },
  {
    id: "bomb",
    name: "Bomb",
    icon: "💣",
  },
  {
    id: "swap",
    name: "Swap",
    icon: "🔄",
  },
];

export const HOW_TO_PLAY_LIST = [
  {
    content: (
      <p>
        <b>Player 1 ({SYMBOL_O})</b> always starts the game by placing their
        symbol first. <b>Player 2 ({SYMBOL_X})</b> follows.
      </p>
    ),
    id: 1,
  },
  {
    content: (
      <div>
        Simply <b>click</b> on any empty cell on the game board to place your
        symbol.
      </div>
    ),
    id: 2,
  },
  {
    content:
      "Get your symbols in a row (horizontal, vertical, or diagonal) to win.",
    id: 3,
  },
  {
    content: (
      <div>
        If all cells are filled with no winner, it's a <b>draw</b>.
      </div>
    ),
    id: 4,
  },
];

export const BOARD_EXAMPLES = {
  winningBoard: [
    [
      { fillWith: SYMBOL_O, type: "winning" },
      { fillWith: SYMBOL_X },
      { fillWith: "" },
      { fillWith: "" },
    ],
    [
      { fillWith: SYMBOL_X },
      { fillWith: SYMBOL_O, type: "winning" },
      { fillWith: "" },
      { fillWith: "" },
    ],
    [
      { fillWith: "" },
      { fillWith: "" },
      { fillWith: SYMBOL_O, type: "winning" },
      { fillWith: "" },
    ],
    [
      { fillWith: "" },
      { fillWith: "" },
      { fillWith: "" },
      { fillWith: SYMBOL_O, type: "winning" },
    ],
  ],
  freezeBoard: [
    [
      { fillWith: SYMBOL_O },
      { fillWith: SYMBOL_X, type: "frozen" },
      { fillWith: SYMBOL_O },
      { fillWith: "" },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_X },
      { fillWith: "" },
      { fillWith: SYMBOL_O },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_X },
      { fillWith: SYMBOL_O },
      { fillWith: SYMBOL_X },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_X },
      { fillWith: "" },
      { fillWith: SYMBOL_X },
    ],
  ],
  bombBoard: [
    [
      { fillWith: SYMBOL_O, type: "targeted" },
      { fillWith: SYMBOL_X, type: "targeted" },
      { fillWith: SYMBOL_O, type: "targeted" },
      { fillWith: "" },
    ],
    [
      { fillWith: "", type: "targeted" },
      { fillWith: SYMBOL_X, type: "targeted" },
      { fillWith: SYMBOL_O, type: "targeted" },
      { fillWith: "" },
    ],
    [
      { fillWith: "", type: "targeted" },
      { fillWith: SYMBOL_X, type: "targeted" },
      { fillWith: SYMBOL_O, type: "targeted" },
      { fillWith: SYMBOL_X },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_O },
      { fillWith: "" },
      { fillWith: SYMBOL_X },
    ],
  ],
  afterBombBoard: [
    [{ fillWith: "" }, { fillWith: "" }, { fillWith: "" }, { fillWith: "" }],
    [{ fillWith: "" }, { fillWith: "" }, { fillWith: "" }, { fillWith: "" }],
    [
      { fillWith: "" },
      { fillWith: "" },
      { fillWith: "" },
      { fillWith: SYMBOL_X },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_O },
      { fillWith: "" },
      { fillWith: SYMBOL_X },
    ],
  ],
  selectSwapBoard: [
    [
      { fillWith: SYMBOL_O },
      { fillWith: SYMBOL_X },
      { fillWith: SYMBOL_O },
      { fillWith: "" },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_X },
      { fillWith: "" },
      { fillWith: SYMBOL_O },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_X },
      { fillWith: SYMBOL_O },
      { fillWith: SYMBOL_X },
    ],
    [
      { fillWith: "" },
      { fillWith: SYMBOL_O, type: "selected" },
      { fillWith: "" },
      { fillWith: SYMBOL_X, type: "selected frozen" },
    ],
  ],
};
