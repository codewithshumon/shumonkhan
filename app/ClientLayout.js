"use client";

import LogoAnimation from "./components/animation/LogoAnimation";
import HeaderMenu from "./components/header/HeaderMenu";
import PageTransition from "./components/animation/PageTransition";

export default function ClientLayout({ children }) {
  return (
    <>
      <PageTransition />
      <LogoAnimation />
      <HeaderMenu />
      {children}
    </>
  );
}
