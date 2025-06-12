"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store/xo.store";
import s from "./PlayerTurnIndicator.module.scss";

const PlayerTurnIndicator = () => {
  const { playerTurn, boardSize } = useXOStore((s) => s);
  const p1ActiveClass = playerTurn === SYMBOL_O ? s.active : "";
  const p2ActiveClass = playerTurn === SYMBOL_X ? s.active : "";
  const board5Class = boardSize === 5 ? s.x5 : "";
  const board3Class = boardSize === 3 ? s.x3 : "";

  return (
    <div className={`${s.indicator} ${board5Class} ${board3Class}`}>
      <div className={`${s.player} ${s.p1} ${p1ActiveClass}`}>
        <span className={s.symbol}>
          <span className={s.wrapper}>○</span>
        </span>
        <span className={s.label}>P1</span>
      </div>

      <div className={`${s.player} ${s.p2} ${p2ActiveClass}`}>
        <span className={s.symbol}>
          <span className={s.wrapper}>✕</span>
        </span>
        <span className={s.label}>P2</span>
      </div>
    </div>
  );
};

export default PlayerTurnIndicator;
