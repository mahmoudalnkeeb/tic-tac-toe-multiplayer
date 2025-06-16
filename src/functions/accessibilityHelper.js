export function getSquareAriaLabel(squareData) {
  if (squareData.fillWith === "") return "Empty square, click to make a move";

  if (squareData.swapSelected)
    return "Selected square, click on opponent square to swap";

  if (squareData.isFreezed) return "Frozen square, cannot make a move";

  return `${squareData.fillWith} symbol, occupied square`;
}

export function shouldDisableSquare({
  hasGameStart,
  squareData,
  playerTurn,
  powerUps,
}) {
  const { fillWith, isBombed } = squareData;
  const { selectedPower, whoUsingPower } = powerUps;

  const isPlayerSymbol = fillWith === playerTurn;
  const hasFilled = fillWith !== "";
  const isFreezeSelected = selectedPower === "Freeze";
  const isSwapSelected = selectedPower === "Swap";

  const freezeCondition = isFreezeSelected && !(hasFilled && !isPlayerSymbol);
  const swapCondition = isSwapSelected && !hasFilled;

  return (
    (!whoUsingPower && !hasFilled) ||
    !hasGameStart ||
    isBombed ||
    freezeCondition ||
    swapCondition
  );
}
