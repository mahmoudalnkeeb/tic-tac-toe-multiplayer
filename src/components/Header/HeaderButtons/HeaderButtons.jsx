"use client";

import Button from "@/components/Shared/Button/Button";
import { useXOStore } from "@/stores/xo.store/xo.store";
import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const resetStats = useXOStore((s) => s.resetStats);

  return (
    <div className={s.headerButtons}>
      <BoardSelector />

      <div className={s.wrapper}>
        <Button onClick={() => {}}>About</Button>
        <Button onClick={resetStats}>Reset</Button>
      </div>
    </div>
  );
};

export default HeaderButtons;
