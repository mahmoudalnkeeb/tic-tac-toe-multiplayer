"use client";

import { useXOStore } from "@/stores/xo.store";
import s from "./PowerUpButton.module.scss";

const PowerUpButton = ({
  data: { id, name, icon, available, coolDown, player },
}) => {
  const { selectPowerUp, powerUps, unSelectPower } = useXOStore((s) => s);
  const { selectedPower, whoUsingPower } = powerUps;
  const isSelected = selectedPower === name && whoUsingPower === player;

  const classes = [
    s.powerUp,
    !available ? s.disabled : "",
    player === "player1" ? s.player1 : "",
    isSelected ? s.selected : "",
  ].join(" ");

  function handleClick() {
    if (!available) return;

    if (isSelected) {
      unSelectPower();
      return;
    }

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
