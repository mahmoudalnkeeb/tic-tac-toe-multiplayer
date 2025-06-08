import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import s from "./XOSquare.module.scss";

const XOSquare = ({ value, disabled, onClick }) => {
  const playerXClass = value === SYMBOL_X ? s.playerX : "";
  const playerOClass = value === SYMBOL_O ? s.playerO : "";
  const classes = `${s.square} ${playerXClass} ${playerOClass}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default XOSquare;
