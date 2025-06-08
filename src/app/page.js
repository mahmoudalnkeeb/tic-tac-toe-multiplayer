"use client";

import Header from "@/components/Header/Header";
import XOGame from "@/components/XOGame/XOGame";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.home}>
      <Header />
      <XOGame />
    </main>
  );
}
