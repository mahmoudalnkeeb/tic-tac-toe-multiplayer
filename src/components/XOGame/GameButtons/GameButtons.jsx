import { useXOStore } from "@/stores/xo.store";
import s from "./GameButtons.module.scss";

const GameButtons = () => {
  const { resetGame, startGame, hasGameStart } = useXOStore((s) => s);

  return (
    <div className={s.buttons}>
      <button
        className={s.start}
        disabled={hasGameStart}
        type="button"
        onClick={startGame}
      >
        Start
      </button>
      <button className={s.reset} type="button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default GameButtons;
