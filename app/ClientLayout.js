"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialLoadComplete } from "./store/slice/animationSlice";
import LogoAnimation from "./components/animation/LogoAnimation";
import HeaderMenu from "./components/header/HeaderMenu";
import PageTransition from "./components/animation/PageTransition";
import Footer from "./components/footer/Footer";
import MouseFollower from "./components/global/MouseFollower"; // ✅ Add this

export default function ClientLayout({ children }) {
  const dispatch = useDispatch();
  const { isInitialLoad } = useSelector((state) => state.animation);

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(setInitialLoadComplete());
    }
  }, [dispatch, isInitialLoad]);

  return (
    <>
      <MouseFollower />
      <PageTransition />
      <LogoAnimation />
      <HeaderMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
