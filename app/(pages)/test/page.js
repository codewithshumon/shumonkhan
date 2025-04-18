"use client";

import { useEffect } from "react";
import Head from "next/head";
import HoverLink from "@/app/components/global/HoverLink";
import CustomCursor from "@/app/components/global/CustomCursor";

export default function Test() {
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <Head>
        <title>Awesome Hover Effect + Animated Cursor</title>
      </Head>

      <div className="nav-wrapper w-full h-screen bg-gray-900">
        <nav className="w-full mx-auto text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
            <HoverLink>Home</HoverLink>
            <HoverLink>Our Story</HoverLink>
            <HoverLink>Studio</HoverLink>
            <HoverLink>Contact</HoverLink>
          </div>
        </nav>
        <CustomCursor />
      </div>
    </>
  );
}
