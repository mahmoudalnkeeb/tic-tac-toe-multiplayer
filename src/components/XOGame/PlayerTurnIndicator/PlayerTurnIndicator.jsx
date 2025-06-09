"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store";
import s from "./PlayerTurnIndicator.module.scss";

const PlayerTurnIndicator = () => {
  const playerTurn = useXOStore((s) => s.playerTurn);
  const p1ActiveClass = playerTurn === SYMBOL_O ? s.active : "";
  const p2ActiveClass = playerTurn === SYMBOL_X ? s.active : "";

  return (
    <div className={s.indicator}>
      <div className={`${s.player} ${s.p1} ${p1ActiveClass}`}>
        <span className={s.symbol}>○</span>
        <span className={s.label}>P1</span>
      </div>

      <div className={`${s.player} ${s.p2} ${p2ActiveClass}`}>
        <span className={s.symbol}>✕</span>
        <span className={s.label}>P2</span>
      </div>
    </div>
  );
};

export default PlayerTurnIndicator;
