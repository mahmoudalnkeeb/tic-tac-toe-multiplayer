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
  const isPlayerSymbol = fillWith === playerTurn;
  const isFreezeSelected = powerUps.selectedPower === "Freeze";

  const freezeCondition = isFreezeSelected && !(fillWith && !isPlayerSymbol);

  return (
    (!powerUps.whoUsingPower && fillWith) ||
    !hasGameStart ||
    isBombed ||
    freezeCondition
  );
}
