"use client";

import { SYMBOL_O } from "@/data/constants";
import { BOARD_EXAMPLES, HOW_TO_PLAY_LIST } from "@/data/staticData";
import { useGlobalStore } from "@/stores/xo.store/global.store";
import { useRef } from "react";
import ExampleBoard from "../Shared/ExampleBoard/ExampleBoard";
import InfoCard from "../Shared/InfoCard/InfoCard";
import AboutHeader from "./AboutHeader/AboutHeader";
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

  return (
    <div
      className={`${s.aboutOverlay} ${showClass}`}
      onClick={handleOverlayClick}
    >
      <article className={s.aboutArticle} ref={aboutArticleRef}>
        <AboutHeader />

        <InfoCard title="Game Objective">
          <p className={s.objectiveDescription}>
            Tic Tac Toe is a classic strategy game where two players take turns
            placing their symbols on a grid. The first player to get three (or
            more on larger boards) of their symbols in a row, either{" "}
            <b>horizontally</b>, <b>vertically</b>, or
            <b>diagonally</b>, wins!
          </p>
        </InfoCard>

        <InfoCard title="How to Play">
          <ul className={s.howToPlayList}>
            {HOW_TO_PLAY_LIST.map(({ content, id }) => (
              <li key={id}>{content}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Winning Example">
          <p>
            Here's a clear illustration of how <b>Player 1 ({SYMBOL_O})</b> can
            achieve victory with a diagonal connection on a standard 4x4 board:
          </p>

          <ExampleBoard boardData={BOARD_EXAMPLES.winningBoard} />

          <p>
            In this scenario, Player 1 successfully connects Four{" "}
            <b>{SYMBOL_O}</b> symbols along a diagonal path, securing the win.
          </p>
        </InfoCard>

        <InfoCard title="Power-Ups">
          <p>
            Strategic advantages await! Each player has access to three unique
            power-ups that can dramatically alter the game's flow. Power-ups
            have a <b>cooldown period</b> after use, meaning they become
            available again only after a certain number of turns have passed.
            Using them at the right moment is key to mastering the game!
          </p>

          <InfoCard title="Freeze Power-Up" isNested={true}>
            <p>
              The <b>Freeze</b> power-up allows you to temporarily immobilize
              one of your opponent's symbols on the board. A <b>frozen</b>{" "}
              square cannot be played on, overwritten, or contribute to their
              winning lines. It acts as a powerful defensive tool to block your
              opponent's progress. This power-up specifically targets an
              existing opponent's symbol and does not affect your own symbols or
              empty cells. Note that a <b>frozen</b> cell can be unfrozen and
              cleared if it's caught in the blast of a <b>Bomb power-up</b>.
            </p>

            <p className={s.exampleText}>
              Example: Freezing an Opponent's Cell (4x4 board)
            </p>

            <ExampleBoard boardData={BOARD_EXAMPLES.freezeBoard} />
          </InfoCard>
        </InfoCard>
      </article>
    </div>
  );
};

export default AboutPopup;
