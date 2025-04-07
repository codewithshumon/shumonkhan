"use client";

import AnimatedHeader from "../components/landing/AnimatedHeader";

// import dynamic from "next/dynamic";
// const LoadingPage = dynamic(
//   () => import("./src/components/landing/LoadingPage"),
//   { ssr: false }
// );

export default function Home() {
  return (
    <div>
      <AnimatedHeader />
      <div className=" w-full h-[100vh] bg-[#999D9E]"></div>
      <div className=" w-full h-[100vh] bg-gray-800"></div>
    </div>
  );
}
