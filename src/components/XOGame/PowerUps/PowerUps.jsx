"use client";

import { POWER_UPS_BUTTONS } from "@/data/staticData";
import { useXOStore } from "@/stores/xo.store";
import s from "./PowerUps.module.scss";

const PowerUps = ({ player }) => {
  const { boardSize, powerUps } = useXOStore((s) => s);
  const p1Class = player === "player1" ? s.player1 : "";
  const hiddenClass = boardSize === 3 ? s.hidden : "";
  const playerPowerUps = Object.entries(powerUps[player]);

  return (
    <div className={`${s.powerUps} ${p1Class} ${hiddenClass}`}>
      {POWER_UPS_BUTTONS.map(({ id, name, icon }, index) => {
        const { available, coolDown } = playerPowerUps[index][1];

        return (
          <button
            key={id}
            type="button"
            className={`${s.powerUp} ${!available ? s.disabled : ""}`}
          >
            <span className={s.icon}>{icon}</span>
            <span className={s.powerName}>{name}</span>
            <span className={s.coolDown}>{coolDown}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PowerUps;
