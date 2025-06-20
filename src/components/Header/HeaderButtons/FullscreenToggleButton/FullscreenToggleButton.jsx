"use client";

import SvgIcon from "@/components/Shared/SvgIcon";
import { enterFullScreen } from "@/functions/helper";
import useFunctionOnKey from "@/hooks/useFunctionOnKey";
import { useState } from "react";
import s from "./FullscreenToggleButton.module.scss";

const FullscreenToggleButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useFunctionOnKey(toggleFullScreen, ["KeyF"], 200, true);
  const title = isFullScreen ? "Exit Full Screen" : "Enter Full Screen";

  function toggleFullScreen() {
    setIsFullScreen((prevValue) => !prevValue);
    if (document.fullscreenElement) document.exitFullscreen();
    enterFullScreen();
  }

  return (
    <button
      type="button"
      className={s.fullscreenBtn}
      title={title}
      onClick={toggleFullScreen}
    >
      <SvgIcon name={isFullScreen ? "compress" : "expand"} />
    </button>
  );
};

export default FullscreenToggleButton;
