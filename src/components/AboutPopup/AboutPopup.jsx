"use client";

import { useGlobalStore } from "@/stores/xo.store/global.store";
import s from "./AboutPopup.module.scss";

const AboutPopup = () => {
  const { isAboutModelActive, toggleAboutModel } = useGlobalStore((s) => s);
  const showClass = isAboutModelActive ? s.show : "";

  return (
    <div
      className={`${s.aboutOverlay} ${showClass}`}
      onClick={() => toggleAboutModel(false)}
    >
      <article className={s.aboutArticle}>AboutPopup</article>
    </div>
  );
};

export default AboutPopup;
