"use client";

import MouseFollower from "../../components/global/MouseFollower";

export default function Work() {
  return (
    <div className="w-full h-full relative bg-[#1C1D20]">
      <MouseFollower />

      {/* Content Section */}
      <div className="w-full h-full px-10 py-10 relative z-[5]">
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-[#dfbb1c] mouse-animate-scale">
            this is the first div
          </h1>
        </div>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-[#0adfcd] mouse-animate-hidden">
            this is the second div
          </h1>
        </div>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-[#9b0d9b] mouse-animate-color">
            this is the third div
          </h1>
        </div>
      </div>
    </div>
  );
}
