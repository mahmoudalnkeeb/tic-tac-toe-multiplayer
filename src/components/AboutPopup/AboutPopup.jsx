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
            <strong>horizontally</strong>, <strong>vertically</strong>, or{" "}
            <strong>diagonally</strong>, wins!
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
            Here's a clear illustration of how{" "}
            <strong>Player 1 ({SYMBOL_O})</strong> can achieve victory with a
            diagonal connection on a standard 4x4 board:
          </p>

          <ExampleBoard boardData={BOARD_EXAMPLES.winningBoard} />

          <p>
            In this scenario, <strong>Player 1</strong> successfully connects
            Four <strong>{SYMBOL_O} symbols</strong> along a diagonal path,
            securing the win.
          </p>
        </InfoCard>

        <InfoCard title="Power-Ups">
          <p>
            Strategic advantages await! Each player has access to three unique
            power-ups that can dramatically alter the game's flow. Power-ups
            have a <strong>cooldown period</strong> after use, meaning they
            become available again only after a certain number of turns have
            passed. Using them at the right moment is key to mastering the game!
          </p>

          <InfoCard title="Freeze Power-Up" isNested={true}>
            <p className={s.freezeDescription}>
              The <strong>Freeze</strong> power-up allows you to immobilize one
              of your opponent’s active symbols on the board. Once a symbol is
              frozen, it becomes <strong>inactive</strong>, meaning:
            </p>

            <ul className={s.freezeList}>
              <li>It cannot be overwritten.</li>
              <li>It does not contribute to any winning combinations.</li>
              <li>
                It effectively acts as a block in your opponent’s strategy.
              </li>
              <li>
                It can still be exchanged using the <strong>Swap</strong>{" "}
                power-up.
              </li>
            </ul>

            <p>
              This power-up is a <strong>defensive tool</strong> used to disrupt
              potential winning lines. It can only target existing{" "}
              <strong>opponent symbols</strong>, not your own or empty cells.
              However, if a <strong>Bomb</strong> power-up hits a frozen cell,
              it will <strong>unfreeze</strong> it from the board without remove
              the symbol.
            </p>

            <ExampleBoard boardData={BOARD_EXAMPLES.freezeBoard} />

            <p>
              In this example, <strong>Player 1 ({SYMBOL_O})</strong> has used
              the Freeze power-up on <strong>Player 2's ({SYMBOL_X})</strong>{" "}
              symbol in the <strong>top-middle</strong> cell. This {SYMBOL_X} is
              now <strong>frozen</strong>, making it unusable in future moves
              and blocking Player 2 from completing <strong>vertical</strong>,{" "}
              <strong>diagonal</strong>, or <strong>horizontal</strong> lines
              through that square.
            </p>
          </InfoCard>

          <InfoCard title="Bomb Power-Up" isNested={true}>
            <p>
              The <strong>Bomb</strong> power-up grants you the ability to
              target <strong>any single square</strong> on the board. When
              activated, the selected square and all{" "}
              <strong>8 surrounding adjacent squares</strong> (if they exist
              within the board's boundaries) will be instantly{" "}
              <strong>cleared</strong> of any <strong>symbols</strong>. If a
              targeted square happened to be <strong>frozen</strong>, the{" "}
              <strong>bomb</strong> will effectively{" "}
              <strong>remove the freeze effect</strong> but{" "}
              <strong>not the symbol</strong>.
            </p>

            <ExampleBoard boardData={BOARD_EXAMPLES.bombBoard} />

            <p>
              <strong>Player 1 ({SYMBOL_O})</strong> is about to deploy the{" "}
              <strong>Bomb</strong> power-up, targeting the marked{" "}
              <strong>`{SYMBOL_X}`</strong> in the second row, second column.
              Notice the symbols surrounding it.
            </p>

            <ExampleBoard boardData={BOARD_EXAMPLES.afterBombBoard} />

            <p>
              The <strong>`{SYMBOL_X}`</strong> and all its adjacent symbols
              have been successfully cleared, opening up new strategic
              possibilities for both players.
            </p>
          </InfoCard>

          <InfoCard title="Swap Power-Up" isNested={true}>
            <p>
              The <strong>Swap</strong> power-up allows you to{" "}
              <strong>exchange the positions </strong> of any{" "}
              <strong>two existing symbols</strong> on the board. This power-up
              is only active when <strong>two occupied squares</strong> are
              selected; it cannot be used if you choose an{" "}
              <strong>empty square</strong>. Utilize this power-up to instantly
              disrupt your opponent's almost-complete winning lines, or to
              immediately form your own winning combination!
            </p>

            <ExampleBoard boardData={BOARD_EXAMPLES.selectSwapBoard} />
          </InfoCard>
        </InfoCard>
      </article>
    </div>
  );
};

export default AboutPopup;
