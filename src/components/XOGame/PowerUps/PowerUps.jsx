"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { POWER_UPS_BUTTONS } from "@/data/staticData";
import { useXOStore } from "@/stores/xo.store";
import PowerUpButton from "./PowerUpButton/PowerUpButton";
import s from "./PowerUps.module.scss";

const PowerUps = ({ player }) => {
  const { boardSize, powerUps, playerTurn } = useXOStore((s) => s);
  const playerPowerUps = Object.entries(powerUps[player]);
  const hiddenClass = boardSize === 3 ? s.hidden : "";

  return (
    <div className={`${s.powerUps} ${hiddenClass}`}>
      {POWER_UPS_BUTTONS.map((buttonData, index) => {
        const { available, coolDown } = playerPowerUps[index][1];
        const disable =
          !available ||
          (playerTurn !== SYMBOL_O && player === "player1") ||
          (playerTurn !== SYMBOL_X && player === "player2");

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
