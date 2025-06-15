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
    boardSize === 4 ? cssModule.x4 : "",
    boardSize === 5 ? cssModule.x5 : "",
    fillWith === SYMBOL_X ? cssModule.playerX : "",
    fillWith === SYMBOL_O ? cssModule.playerO : "",
    activeFreezeHover ? cssModule.freezeHover : "",
    powerUps.selectedPower === "Swap" && fillWith ? cssModule.swapHover : "",
    powerUps.selectedPower === "Bomb" ? cssModule.bombHover : "",
    swapSelected ? cssModule.select : "",
  ].join(" ");
}
