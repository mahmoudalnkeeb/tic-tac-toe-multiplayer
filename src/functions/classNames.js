import { SYMBOL_O, SYMBOL_X } from "@/data/constants";

export function getSquareClasses({
  cssModule,
  boardSize,
  fillWith,
  powerUps,
  swapSelected,
  playerTurn,
}) {
  const isOpponent = fillWith !== playerTurn;
  const activeFreezeHover =
    powerUps.selectedPower === "Freeze" && fillWith && isOpponent;

  return [
    cssModule.square,
    boardSize === 4 ? s.x4 : "",
    boardSize === 5 ? s.x5 : "",
    fillWith === SYMBOL_X ? s.playerX : "",
    fillWith === SYMBOL_O ? s.playerO : "",
    activeFreezeHover ? s.freezeHover : "",
    powerUps.selectedPower === "Swap" && fillWith ? s.swapHover : "",
    powerUps.selectedPower === "Bomb" ? s.bombHover : "",
    swapSelected ? s.select : "",
  ].join(" ");
}
