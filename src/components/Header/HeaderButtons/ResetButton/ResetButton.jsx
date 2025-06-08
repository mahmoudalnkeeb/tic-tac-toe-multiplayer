"use client";

import { useXOStore } from "@/stores/xo.store";
import s from "./ResetButton.module.scss";

const ResetButton = () => {
  const resetGame = useXOStore((s) => s.resetGame);

  return (
    <button type="button" className={s.resetButton} onClick={resetGame}>
      Reset
    </button>
  );
};

export default ResetButton;
