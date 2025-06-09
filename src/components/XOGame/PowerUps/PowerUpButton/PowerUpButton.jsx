import s from "./PowerUpButton.module.scss";

const PowerUpButton = ({
  data: { id, name, icon, available, coolDown, player },
}) => {
  const classes = [
    s.powerUp,
    !available ? s.disabled : "",
    player === "player1" ? s.player1 : "",
  ].join(" ");

  return (
    <button key={id} type="button" className={classes}>
      <span className={s.icon}>{icon}</span>
      <span className={s.powerName}>{name}</span>
      <span className={s.coolDown}>{coolDown}</span>
    </button>
  );
};

export default PowerUpButton;
