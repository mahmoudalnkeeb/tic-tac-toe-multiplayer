import s from "./PowerUps.module.scss";

const PowerUps = ({ player }) => {
  const p1Class = player === "p1" ? s.p1 : "";

  return (
    <div className={`${s.powerUps} ${p1Class}`}>
      <div className={`${s.powerUp} ${false ? s.disabled : ""}`}>
        <span className={s.icon}>❄️</span>
        <span className={s.powerName}>Freeze</span>
        <span className={s.coolDown}>6</span>
      </div>

      <div className={`${s.powerUp} ${false ? s.disabled : ""}`}>
        <span className={s.icon}>💣</span>
        <span className={s.powerName}>Bomb</span>
        <span className={s.coolDown}>6</span>
      </div>

      <div className={`${s.powerUp} ${false ? s.disabled : ""}`}>
        <span className={s.icon}>🔄</span>
        <span className={s.powerName}>Swap</span>
        <span className={s.coolDown}>6</span>
      </div>
    </div>
  );
};

export default PowerUps;
