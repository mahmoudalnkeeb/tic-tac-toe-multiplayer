import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store";
import s from "./XOSquare.module.scss";

const XOSquare = ({ value, disabled, onClick }) => {
  const boardSize = useXOStore((s) => s.boardSize);

  const classes = [
    s.square,
    boardSize === 4 ? s.x4 : "",
    boardSize === 5 ? s.x5 : "",
    value === SYMBOL_X ? s.playerX : "",
    value === SYMBOL_O ? s.playerO : "",
  ];

  return (
    <button
      type="button"
      className={classes.join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {value === SYMBOL_O ? <span>{value}</span> : value}
    </button>
  );
};

export default XOSquare;
