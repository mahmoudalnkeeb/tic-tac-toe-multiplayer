import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { getSquareAriaLabel } from "@/functions/accessibilityHelper";
import { useXOStore } from "@/stores/xo.store/xo.store";
import s from "./XOSquare.module.scss";

const XOSquare = ({ squareData, disabled, onClick }) => {
  const { boardSize, powerUps } = useXOStore((s) => s);
  const { fillWith, isFreezed, isBombed, swapSelected } = squareData;
  const { selectedPower } = powerUps;

  const classes = [
    s.square,
    boardSize === 4 ? s.x4 : "",
    boardSize === 5 ? s.x5 : "",
    fillWith === SYMBOL_X ? s.playerX : "",
    fillWith === SYMBOL_O ? s.playerO : "",
    selectedPower === "Freeze" && fillWith !== "" ? s.freezeHover : "",
    selectedPower === "Swap" && fillWith !== "" ? s.swapHover : "",
    selectedPower === "Bomb" ? s.bombHover : "",
    swapSelected ? s.select : "",
  ].join(" ");

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
    </button>
  );
};

export default XOSquare;
