"use client";

import Button from "@/components/Shared/Button/Button";
import { useXOStore } from "@/stores/xo.store/xo.store";
import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const startNewGame = useXOStore((s) => s.startNewGame);

  return (
    <div className={s.headerButtons}>
      <BoardSelector />

      <div className={s.wrapper}>
        <Button onClick={() => {}}>About</Button>
        <Button onClick={startNewGame}>Reset</Button>
      </div>
    </div>
  );
};

export default HeaderButtons;
