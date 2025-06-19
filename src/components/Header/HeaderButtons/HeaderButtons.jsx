"use client";

import InstallPWAButton from "@/components/PWA/InstallPWAButton";
import Button from "@/components/Shared/Button/Button";
import { useGlobalStore } from "@/stores/global.store/global.store";
import { useXOStore } from "@/stores/xo.store/xo.store";
import BoardSelector from "./BoardSelector/BoardSelector";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const resetStats = useXOStore((s) => s.resetStats);
  const toggleAboutModel = useGlobalStore((s) => s.toggleAboutModel);

  return (
    <div className={s.headerButtons}>
      <BoardSelector />

      <div className={s.wrapper}>
        <InstallPWAButton />
        <Button onClick={toggleAboutModel}>About</Button>
        <Button onClick={resetStats}>Reset</Button>
      </div>
    </div>
  );
};

export default HeaderButtons;
