"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { POWER_UPS_BUTTONS } from "@/data/staticData";
import { useXOStore } from "@/stores/xo.store/xo.store";
import PowerUpButton from "./PowerUpButton/PowerUpButton";
import s from "./PowerUps.module.scss";

const PowerUps = ({ player }) => {
  const { boardSize, powerUps, playerTurn } = useXOStore((s) => s);
  const playerPowerUps = Object.entries(powerUps[player]);
  const isPlayer1 = playerTurn !== SYMBOL_O && player === "player1";
  const isPlayer2 = playerTurn !== SYMBOL_X && player === "player2";

  const classes = [
    s.powerUps,
    boardSize === 3 ? s.hidden : "",
    player === "player1" ? s.player1 : "",
    player === "player2" ? s.player2 : "",
    !(isPlayer1 || isPlayer2) ? s.display : "",
  ].join(" ");

  return (
    <div className={classes}>
      {POWER_UPS_BUTTONS.map((buttonData, index) => {
        const { available, coolDown } = playerPowerUps[index][1];
        const disable = !available || isPlayer1 || isPlayer2;

        return (
          <PowerUpButton
            key={buttonData.id}
            data={{ ...buttonData, available, coolDown, player }}
            disabled={disable}
          />
        );
      })}
    </div>
  );
};

export default PowerUps;
