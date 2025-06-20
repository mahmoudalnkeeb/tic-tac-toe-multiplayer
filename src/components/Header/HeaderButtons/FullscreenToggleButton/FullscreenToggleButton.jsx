"use client";

import SvgIcon from "@/components/Shared/SvgIcon";
import { enterFullScreen } from "@/functions/helper";
import { useState } from "react";
import s from "./FullscreenToggleButton.module.scss";

const FullscreenToggleButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function toggleFullScreen() {
    setIsFullScreen((prevValue) => !prevValue);
    if (document.fullscreenElement) document.exitFullscreen();
    enterFullScreen();
  }

  return (
    <button
      type="button"
      className={s.fullscreenBtn}
      title="Full Screen Mode"
      onClick={toggleFullScreen}
    >
      <SvgIcon name={isFullScreen ? "compress" : "expand"} />
    </button>
  );
};

export default FullscreenToggleButton;
