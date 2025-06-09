"use client";

import { useXOStore } from "@/stores/xo.store";
import s from "./GameStats.module.scss";

const GameStats = () => {
  const { p1Wins, draws, p2Wins } = useXOStore((s) => s.stats);

  return (
    <div className={s.gameStats}>
      <div className={s.stat} id="p1">
        <span className={s.value}>{p1Wins}</span>
        <span className={s.label}>P1 Wins</span>
      </div>

      <div className={s.stat} id="draws">
        <span className={s.value}>{draws}</span>
        <span className={s.label}>Draws</span>
      </div>

      <div className={s.stat} id="p2">
        <span className={s.value}>{p2Wins}</span>
        <span className={s.label}>P2 Wins</span>
      </div>
    </div>
  );
};

export default GameStats;
