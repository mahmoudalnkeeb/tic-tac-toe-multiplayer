"use client";

import InstallPWAButton from "@/components/PWA/InstallPWAButton";
import Button from "@/components/Shared/Button/Button";
import { useGlobalStore } from "@/stores/global.store/global.store";
import { useXOStore } from "@/stores/xo.store/xo.store";
import BoardSelector from "./BoardSelector/BoardSelector";
import FullscreenToggleButton from "./FullscreenToggleButton/FullscreenToggleButton";
import s from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const resetStats = useXOStore((s) => s.resetStats);
  const toggleAboutModel = useGlobalStore((s) => s.toggleAboutModel);

  return (
    <div className={s.headerButtons}>
      <div className={s.wrapper1}>
        <FullscreenToggleButton />
        <BoardSelector />
      </div>

      <div className={s.wrapper2}>
        <InstallPWAButton />
        <Button onClick={toggleAboutModel}>About</Button>
        <Button onClick={resetStats}>Reset</Button>
      </div>
    </div>
  );
};

export default HeaderButtons;
