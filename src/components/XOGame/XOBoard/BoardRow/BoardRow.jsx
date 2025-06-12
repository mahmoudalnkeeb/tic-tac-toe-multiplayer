import { useXOStore } from "@/stores/xo.store/xo.store";
import XOSquare from "../XOSquare/XOSquare";
import s from "./BoardRow.module.scss";

const BoardRow = ({ row, rowIndex }) => {
  const { hasGameStart, fillSquare, powerUps, usePowerUp } = useXOStore(
    (state) => state
  );
  const { whoUsingPower } = powerUps;

  function handleClick({ rowIndex, columnIndex }) {
    if (!whoUsingPower) {
      fillSquare({ rowIndex, columnIndex });
      return;
    }

    usePowerUp({ rowIndex, columnIndex });
  }

  return (
    <div className={s.row}>
      {row.map((squareData, columnIndex) => (
        <XOSquare
          key={columnIndex}
          squareData={squareData}
          disabled={(!whoUsingPower && squareData.fillWith) || !hasGameStart}
          onClick={() => handleClick({ rowIndex, columnIndex })}
        />
      ))}
    </div>
  );
};

export default BoardRow;
