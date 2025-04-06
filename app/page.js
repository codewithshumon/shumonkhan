"use client";
import dynamic from "next/dynamic";

const LoadingPage = dynamic(
  () => import("./src/components/landing/LoadingPage"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <div>
        <LoadingPage />
      </div>
    </div>
  );
}
