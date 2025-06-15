import { SYMBOL_O } from "@/data/constants";
import { getSquareAriaLabel } from "@/functions/accessibilityHelper";
import { getSquareClasses } from "@/functions/classNames";
import { useXOStore } from "@/stores/xo.store/xo.store";
import s from "./XOSquare.module.scss";

const XOSquare = ({ squareData, disabled, onClick }) => {
  const { boardSize, powerUps, squaresToSwap, playerTurn } = useXOStore(
    (s) => s
  );
  const { fillWith, isFreezed, isBombed, swapSelected } = squareData;
  const shouldSwap = squaresToSwap.length >= 2 && squareData.swapSelected;

  const classes = getSquareClasses({
    cssModule: s,
    boardSize,
    fillWith,
    powerUps,
    swapSelected,
    playerTurn,
  });

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={getSquareAriaLabel(squareData)}
    >
      {fillWith === SYMBOL_O && <span className={s.symbol}>{fillWith}</span>}
      {fillWith !== SYMBOL_O && fillWith}
      {isFreezed && <span className={s.freeze} />}
      {isBombed && <span className={s.bomb} />}
      {shouldSwap && <span className={s.swap} />}
    </button>
  );
};

export default XOSquare;
