import { SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store/xo.store";
import BoardRow from "./BoardRow/BoardRow";
import WinnerPopUp from "./WinnerPopUp/WinnerPopUp";
import s from "./XOBoard.module.scss";

const XOBoard = () => {
  const { board, playerTurn } = useXOStore((state) => state);
  const playerTurnClass = playerTurn === SYMBOL_X ? s.xTurn : s.oTurn;

  return (
    <div className={`${s.board} ${playerTurnClass}`}>
      {board.map((row, rowIndex) => (
        <BoardRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}

      <WinnerPopUp />
    </div>
  );
};

export default XOBoard;
