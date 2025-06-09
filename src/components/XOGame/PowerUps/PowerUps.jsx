"use client";

import { POWER_UPS_BUTTONS } from "@/data/staticData";
import { useXOStore } from "@/stores/xo.store";
import PowerUpButton from "./PowerUpButton/PowerUpButton";
import s from "./PowerUps.module.scss";

const PowerUps = ({ player }) => {
  const { boardSize, powerUps } = useXOStore((s) => s);
  const hiddenClass = boardSize === 3 ? s.hidden : "";
  const playerPowerUps = Object.entries(powerUps[player]);

  return (
    <div className={`${s.powerUps} ${hiddenClass}`}>
      {POWER_UPS_BUTTONS.map((buttonData, index) => {
        const { available, coolDown } = playerPowerUps[index][1];

        return (
          <PowerUpButton
            key={buttonData.id}
            data={{ ...buttonData, available, coolDown, player }}
          />
        );
      })}
    </div>
  );
};

export default PowerUps;
