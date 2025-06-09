import s from "./GameStats.module.scss";

const GameStats = () => {
  return (
    <div className={s.gameStats}>
      <div className={s.stat} id="p1">
        <span className={s.value}>0</span>
        <span className={s.label}>P1 Wins</span>
      </div>

      <div className={s.stat} id="draws">
        <span className={s.value}>0</span>
        <span className={s.label}>Draws</span>
      </div>

      <div className={s.stat} id="p2">
        <span className={s.value}>0</span>
        <span className={s.label}>P2 Wins</span>
      </div>
    </div>
  );
};

export default GameStats;
