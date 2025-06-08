"use client";

import Button from "@/components/Shared/Button/Button";
import { useXOStore } from "@/stores/xo.store";
import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const resetGame = useXOStore((s) => s.resetGame);

  return (
    <div className={s.headerButtons}>
      <BoardSelector />
      <Button onClick={() => {}}>About</Button>
      <Button onClick={resetGame}>Reset</Button>
    </div>
  );
};

export default HeaderButtons;
