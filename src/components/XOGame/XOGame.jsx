"use client";

import GameStats from "./GameStats/GameStats";
import PlayerTurnIndicator from "./PlayerTurnIndicator/PlayerTurnIndicator";
import XOBoard from "./XOBoard/XOBoard";
import s from "./XOGame.module.scss";

const XOGame = () => {
  return (
    <section className={s.game}>
      <GameStats />
      <XOBoard />
      <PlayerTurnIndicator />
    </section>
  );
};

export default XOGame;
