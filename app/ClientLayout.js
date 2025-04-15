"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialLoadComplete } from "./store/slice/animationSlice";
import LogoAnimation from "./components/animation/LogoAnimation";
import HeaderMenu from "./components/header/HeaderMenu";
import PageTransition from "./components/animation/PageTransition";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { isInitialLoad } = useSelector((state) => state.animation);

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(setInitialLoadComplete());
    }
  }, [dispatch, isInitialLoad]);

  return (
    <>
      <PageTransition />
      <LogoAnimation />
      <HeaderMenu />
      {children}
    </>
  );
}
