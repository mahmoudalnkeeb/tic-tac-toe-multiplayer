"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store";
import s from "./WinnerPopUp.module.scss";

const WinnerPopUp = () => {
  const winner = useXOStore((s) => s.winner);

  const classes = [
    s.winner,
    winner === "Draw!" ? s.draw : "",
    winner === SYMBOL_X ? s.p1 : "",
    winner === SYMBOL_O ? s.p2 : "",
  ].join(" ");

  return <p className={classes}>{winMessages?.[winner]}</p>;
};

export default WinnerPopUp;

const winMessages = {
  [SYMBOL_X]: "P1 Wins!",
  [SYMBOL_O]: "P2 Wins!",
  "Draw!": "It's a Draw!",
};
