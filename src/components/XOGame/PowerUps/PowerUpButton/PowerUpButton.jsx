"use client";

import { useXOStore } from "@/stores/xo.store";
import s from "./PowerUpButton.module.scss";

const PowerUpButton = ({
  data: { id, name, icon, available, coolDown, player },
}) => {
  const { selectPowerUp, powerUps } = useXOStore((s) => s);
  const { selectedPower, whoUsingPower } = powerUps;

  const classes = [
    s.powerUp,
    !available ? s.disabled : "",
    player === "player1" ? s.player1 : "",
    selectedPower === name && whoUsingPower === player ? s.selected : "",
  ].join(" ");

  function handleClick() {
    if (!available) return;

    selectPowerUp({ selectedPower: name, whoUsingPower: player });
  }

  return (
    <button key={id} type="button" className={classes} onClick={handleClick}>
      <span className={s.icon}>{icon}</span>
      <span className={s.powerName}>{name}</span>
      <span className={s.coolDown}>{coolDown}</span>
    </button>
  );
};

export default PowerUpButton;
