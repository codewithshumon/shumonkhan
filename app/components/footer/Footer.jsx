"use client";

import Link from "next/link";
import { useState } from "react";
import LottiePlayer from "../global/LottiePlayer";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);

  console.log("Footer hover state:", isHovered);

  return (
    <footer
      className="w-full h-full relative bg-[#630863]"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="relative h-[500px] left-0 right-0 bottom-0 z-[20]">
        <div className="container mx-auto px-6 py-12 h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h2 className="sr-only">Brand</h2>
              <Link
                href="/"
                className="text-2xl font-bold text-black hover:text-primary-400 transition-colors"
              >
                YourName
              </Link>
              <p className="mt-4 max-w-md text-black">
                Full-stack developer & designer creating digital experiences
                that matter.
              </p>
            </div>

            {/* Lottie Hover Interaction */}
            <div className="flex items-center justify-center w-20 h-20 cursor-pointer hover-area relative z-[10]">
              <div
                className="w-full h-full pointer-events-auto"
                onMouseEnter={() => {
                  console.log("Mouse entered Lottie");
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  console.log("Mouse left Lottie");
                  setIsHovered(false);
                }}
              >
                <LottiePlayer
                  src="/animations/world.lottie"
                  loop={true}
                  play={isHovered}
                  speed={0.5}
                  segment={[1, 30]}
                  className="w-16 h-16"
                />
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#000000] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center text-[#000000]">
              © {currentYear} YourName. All rights reserved.
              <span className="mx-1">Made with</span>
              <span className="sr-only">love</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
