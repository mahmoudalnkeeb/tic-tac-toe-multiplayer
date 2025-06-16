import { shouldDisableSquare } from "@/functions/accessibilityHelper";
import { useXOStore } from "@/stores/xo.store/xo.store";
import XOSquare from "../XOSquare/XOSquare";
import s from "./BoardRow.module.scss";

const BoardRow = ({ row, rowIndex }) => {
  const { hasGameStart, fillSquare, powerUps, usePowerUp, playerTurn } =
    useXOStore((s) => s);
  const { whoUsingPower } = powerUps;

  function handleSquareClick(rowIndex, columnIndex) {
    if (!whoUsingPower) {
      fillSquare(rowIndex, columnIndex);
      return;
    }

    usePowerUp(rowIndex, columnIndex);
  }

  return (
    <div className={s.row}>
      {row.map((squareData, columnIndex) => {
        const disable = shouldDisableSquare({
          hasGameStart,
          squareData,
          playerTurn,
          powerUps,
        });

        return (
          <XOSquare
            key={columnIndex}
            squareData={squareData}
            disabled={disable}
            onClick={() => handleSquareClick(rowIndex, columnIndex)}
          />
        );
      })}
    </div>
  );
};

export default BoardRow;
