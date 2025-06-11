import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store";
import s from "./XOSquare.module.scss";

const XOSquare = ({ squareData, disabled, onClick }) => {
  const { boardSize, powerUps } = useXOStore((s) => s);
  const { fillWith, isFreezed, isBombed } = squareData;
  const { selectedPower } = powerUps;

  const classes = [
    s.square,
    boardSize === 4 ? s.x4 : "",
    boardSize === 5 ? s.x5 : "",
    fillWith === SYMBOL_X ? s.playerX : "",
    fillWith === SYMBOL_O ? s.playerO : "",
    selectedPower === "Freeze" && fillWith !== "" ? s.freezeHover : "",
  ];

  return (
    <button
      type="button"
      className={classes.join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {fillWith === SYMBOL_O ? (
        <span className={s.symbol}>{fillWith}</span>
      ) : (
        fillWith
      )}
      {isFreezed && <span className={s.freeze} />}
      {isBombed && <span className={s.bomb} />}
    </button>
  );
};

export default XOSquare;
