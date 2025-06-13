export function getSquareAriaLabel(squareData) {
  if (squareData.fillWith === "") return "Empty square, click to make a move";

  if (squareData.swapSelected)
    return "Selected square, click on opponent square to swap";

  if (squareData.isFreezed) return "Frozen square, cannot make a move";

  return `${squareData.fillWith} symbol, occupied square`;
}
