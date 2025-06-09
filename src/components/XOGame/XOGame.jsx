"use client";

import GameStats from "./GameStats/GameStats";
import XOBoard from "./XOBoard/XOBoard";
import s from "./XOGame.module.scss";

const XOGame = () => {
  return (
    <section className={s.game}>
      <GameStats />
      <XOBoard />
    </section>
  );
};

export default XOGame;
