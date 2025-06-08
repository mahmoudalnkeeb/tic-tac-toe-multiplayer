"use client";

import { useXOStore } from "@/stores/xo.store";
import s from "./BoardSelector.module.scss";
import { BOARD_SIZES } from "@/data/constants";

const BoardSelector = () => {
  const { boardSize, updateBoardSize } = useXOStore((s) => s);

  return (
    <div className={s.boardSelector}>
      {BOARD_SIZES.map((size) => (
        <button
          key={size}
          className={size === boardSize ? s.active : ""}
          onClick={() => updateBoardSize({ boardSize: size })}
        >
          {size}x{size}
        </button>
      ))}
    </div>
  );
};

export default BoardSelector;
