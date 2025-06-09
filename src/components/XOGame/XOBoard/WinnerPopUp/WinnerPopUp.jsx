"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
import { useXOStore } from "@/stores/xo.store";
import s from "./WinnerPopUp.module.scss";

const WinnerPopUp = () => {
  const winner = useXOStore((s) => s.winner);

  return <p className={s.winner}>{winMessages?.[winner]}</p>;
};

export default WinnerPopUp;

const winMessages = {
  [SYMBOL_X]: "P1 Wins!",
  [SYMBOL_O]: "P2 Wins!",
  "Draw!": "It's a Draw!",
};
