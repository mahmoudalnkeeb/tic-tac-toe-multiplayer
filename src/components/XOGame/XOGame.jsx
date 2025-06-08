"use client";

import GameMessages from "./GameMessages/GameMessages";
import XOBoard from "./XOBoard/XOBoard";
import s from "./XOGame.module.scss";

const XOGame = () => {
  return (
    <section className={s.game}>
      <div className={s.controls}>
        <GameMessages />
      </div>
      <XOBoard />
    </section>
  );
};

export default XOGame;
