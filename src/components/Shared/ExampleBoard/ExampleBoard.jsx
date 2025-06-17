import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import s from "./ExampleBoard.module.scss";

const ExampleBoard = ({ boardData }) => {
  return (
    <div className={s.board}>
      {boardData.map((row, rowIndex) => (
        <div key={rowIndex} className={s.row}>
          {row.map(({ fillWith, type }, columnIndex) => {
            const classes = [
              s.square,
              fillWith === SYMBOL_X ? s.playerX : "",
              fillWith === SYMBOL_O ? s.playerO : "",
              type === "winning" ? s.winning : "",
              type === "frozen" ? s.frozen : "",
              type === "targeted" ? s.targeted : "",
              type === "selected" ? s.selected : "",
            ].join(" ");

            return (
              <button
                type="button"
                disabled={true}
                key={`${rowIndex}-${columnIndex}`}
                className={classes}
              >
                {fillWith}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ExampleBoard;
