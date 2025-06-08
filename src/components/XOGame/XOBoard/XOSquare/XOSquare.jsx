import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store";
import s from "./XOSquare.module.scss";

const XOSquare = ({ value, disabled, onClick }) => {
  const boardSize = useXOStore((s) => s.boardSize);
  const x4Class = boardSize === 4 ? s.x4 : "";
  const x5Class = boardSize === 5 ? s.x5 : "";
  const playerXClass = value === SYMBOL_X ? s.playerX : "";
  const playerOClass = value === SYMBOL_O ? s.playerO : "";
  const classes = `${s.square} ${playerXClass} ${playerOClass} ${x4Class} ${x5Class}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {value === SYMBOL_O ? <span>{value}</span> : value}
    </button>
  );
};

export default XOSquare;
