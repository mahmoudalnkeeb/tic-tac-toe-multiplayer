"use client";

import GameStats from "./GameStats/GameStats";
import PlayerTurnIndicator from "./PlayerTurnIndicator/PlayerTurnIndicator";
import PowerUps from "./PowerUps/PowerUps";
import XOBoard from "./XOBoard/XOBoard";
import s from "./XOGame.module.scss";

const XOGame = () => {
  return (
    <section className={s.game}>
      <div className={s.wrapper}>
        <PowerUps player="p1" />
        <GameStats />
        <PowerUps player="p2" />
      </div>

      <XOBoard />
      <PlayerTurnIndicator />
    </section>
  );
};

export default XOGame;
