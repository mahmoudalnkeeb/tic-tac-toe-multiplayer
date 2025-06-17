"use client";

import { SYMBOL_O, SYMBOL_X } from "@/data/constants";
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
            <b>horizontally</b>, <b>vertically</b>, or <b>diagonally</b>, wins!
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
            In this scenario, <b>Player 1</b> successfully connects Four{" "}
            <b>{SYMBOL_O} symbols</b> along a diagonal path, securing the win.
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
            <p className={s.freezeDescription}>
              The <b>Freeze</b> power-up allows you to immobilize one of your
              opponent’s active symbols on the board. Once a symbol is frozen,
              it becomes <b>inactive</b>, meaning:
            </p>

            <ul className={s.freezeList}>
              <li>It cannot be overwritten.</li>
              <li>It does not contribute to any winning combinations.</li>
              <li>
                It effectively acts as a block in your opponent’s strategy.
              </li>
              <li>
                It can still be exchanged using the <b>Swap</b> power-up.
              </li>
            </ul>

            <p>
              This power-up is a <b>defensive tool</b> used to disrupt potential
              winning lines. It can only target existing <b>opponent symbols</b>
              , not your own or empty cells. However, if a <b>Bomb</b> power-up
              hits a frozen cell, it will <b>unfreeze</b> it from the board
              without remove the symbol.
            </p>

            <ExampleBoard boardData={BOARD_EXAMPLES.freezeBoard} />

            <p>
              In this example, <b>Player 1 ({SYMBOL_O})</b> has used the Freeze
              power-up on <b>Player 2's ({SYMBOL_X})</b> symbol in the{" "}
              <b>top-middle</b> cell. This {SYMBOL_X} is now <b>frozen</b>,
              making it unusable in future moves and blocking Player 2 from
              completing <b>vertical</b>, <b>diagonal</b>, or <b>horizontal</b>{" "}
              lines through that square.
            </p>
          </InfoCard>
        </InfoCard>
      </article>
    </div>
  );
};

export default AboutPopup;
