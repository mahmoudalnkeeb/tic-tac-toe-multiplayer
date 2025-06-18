"use client";

import { useGlobalStore } from "@/stores/xo.store/global.store";
import { useRef } from "react";
import InfoCard from "../Shared/InfoCard/InfoCard";
import AboutHeader from "./AboutHeader/AboutHeader";
import BombExplanationCard from "./AboutHeader/BombExplanationCard/BombExplanationCard";
import FreezeExplanationCard from "./AboutHeader/FreezeExplanationCard/FreezeExplanationCard";
import GameObjectiveCard from "./AboutHeader/GameObjectiveCard/GameObjectiveCard";
import HowToPlayCard from "./AboutHeader/HowToPlayCard/HowToPlayCard";
import SwapExplanationCard from "./AboutHeader/SwapExplanationCard/SwapExplanationCard";
import WinningExplanationCard from "./AboutHeader/WinningExplanationCard/WinningExplanationCard";
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

        <InfoCard title="Power-Ups" disableMarginBottom={true}>
          <p>
            Strategic advantages await! Each player has access to three unique
            power-ups that can dramatically alter the game's flow. Power-ups
            have a <strong>cooldown period</strong> after use, meaning they
            become available again only after a certain number of turns have
            passed. Using them at the right moment is key to mastering the game!
          </p>

          <FreezeExplanationCard />
          <BombExplanationCard />
          <SwapExplanationCard />
        </InfoCard>
      </article>
    </div>
  );
};

export default AboutPopup;
