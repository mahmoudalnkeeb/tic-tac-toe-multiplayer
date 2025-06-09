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
        <PowerUps player="player1" />
        <GameStats />
        <PowerUps player="player2" />
      </div>

      <XOBoard />
      <PlayerTurnIndicator />
    </section>
  );
};

export default XOGame;
