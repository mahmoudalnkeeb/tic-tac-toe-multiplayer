import { useXOStore } from "@/stores/xo.store";
import s from "./GameMessages.module.scss";

const GameMessages = () => {
  const { playerTurn, winner } = useXOStore((s) => s);
  const isDraw = winner === "Draw!";

  return (
    <div className={`${s.messages} ${winner ? s.active : ""}`}>
      {winner && !isDraw && (
        <p className={s.winnerMessage}>The Winner is the {winner}!</p>
      )}
      {winner && isDraw && <p>{winner}</p>}
      {!winner && <p className={s.turnMessage}>Player Turn: {playerTurn}</p>}
    </div>
  );
};

export default GameMessages;
