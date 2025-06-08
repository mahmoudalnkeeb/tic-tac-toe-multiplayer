"use client";

import XOBoard from "./XOBoard/XOBoard";
import s from "./XOGame.module.scss";

const XOGame = () => {
  return (
    <section className={s.game}>
      <XOBoard />
    </section>
  );
};

export default XOGame;
