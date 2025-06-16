"use client";

import { SYMBOL_X } from "@/data/constants";
import { useGlobalStore } from "@/stores/xo.store/global.store";
import s from "./AboutHeader.module.scss";

const AboutHeader = () => {
  const toggleAboutModel = useGlobalStore((s) => s.toggleAboutModel);

  return (
    <header className={s.header}>
      <h2 className={s.title}>About Tic Tac Toe</h2>

      <button
        type="button"
        className={s.closeBtn}
        onClick={() => toggleAboutModel(false)}
        aria-label="Close About Popup"
      >
        {SYMBOL_X}
      </button>
    </header>
  );
};

export default AboutHeader;
