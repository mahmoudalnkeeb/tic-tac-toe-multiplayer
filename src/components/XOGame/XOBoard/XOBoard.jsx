import { useXOStore } from "@/stores/xo.store";
import BoardRow from "./BoardRow/BoardRow";
import s from "./XOBoard.module.scss";

const XOBoard = () => {
  const { board } = useXOStore((state) => state);

  return (
    <div className={s.board}>
      {board.map((row, rowIndex) => (
        <BoardRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

export default XOBoard;
