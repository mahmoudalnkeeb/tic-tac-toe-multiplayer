"use client";

import { BOARD_SIZES } from "@/data/staticData";
import { useXOStore } from "@/stores/xo.store";
import s from "./BoardSelector.module.scss";

const BoardSelector = () => {
  const { borderSize, updateGameState } = useXOStore((s) => s);

  return (
    <div className={s.boardSelector}>
      {BOARD_SIZES.map((size) => (
        <button
          key={size}
          className={borderSize === size ? s.active : ""}
          onClick={() => {
            updateGameState({ key: "borderSize", value: size });
          }}
        >
          {size}x{size}
        </button>
      ))}
    </div>
  );
};

export default BoardSelector;
