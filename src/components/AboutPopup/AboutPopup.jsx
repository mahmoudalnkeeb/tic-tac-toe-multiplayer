"use client";

import { useGlobalStore } from "@/stores/xo.store/global.store";
import { useRef } from "react";
import AboutHeader from "./AboutHeader/AboutHeader";
import GameObjectiveCard from "./GameObjectiveCard/GameObjectiveCard";
import HowToPlayCard from "./HowToPlayCard/HowToPlayCard";
import PowerUpsExplanationCard from "./PowerUpsExplanationCard/PowerUpsExplanationCard";
import WinningExplanationCard from "./WinningExplanationCard/WinningExplanationCard";
import s from "./AboutPopup.module.scss";

const AboutPopup = () => {
  const { isAboutModelActive, toggleAboutModel } = useGlobalStore((s) => s);
  const aboutArticleRef = useRef(null);
  const showClass = isAboutModelActive ? s.show : "";

  function handleOverlayClick(event) {
    const popupElement = aboutArticleRef.current;
    const clickedInsidePopup = popupElement.contains(event.target);

    if (clickedInsidePopup) return;
    toggleAboutModel(false);
  }

  if (!isAboutModelActive) return null;

  return (
    <div
      className={`${s.aboutOverlay} ${showClass}`}
      onClick={handleOverlayClick}
    >
      <article className={s.aboutArticle} ref={aboutArticleRef}>
        <AboutHeader />
        <GameObjectiveCard />
        <HowToPlayCard />
        <WinningExplanationCard />
        <PowerUpsExplanationCard />
      </article>
    </div>
  );
};

export default AboutPopup;
