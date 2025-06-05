import { useXOStore } from "@/stores/xo.store";
import XOSquare from "../XOSquare/XOSquare";
import s from "./BoardRow.module.scss";

const BoardRow = ({ row, rowIndex }) => {
  const { hasGameStart, fillSquare } = useXOStore((state) => state);

  return (
    <div className={s.row}>
      {row.map((item, columnIndex) => (
        <XOSquare
          key={columnIndex}
          value={item}
          disabled={item || !hasGameStart}
          onClick={() => fillSquare({ rowIndex, columnIndex })}
        />
      ))}
    </div>
  );
};

export default BoardRow;
