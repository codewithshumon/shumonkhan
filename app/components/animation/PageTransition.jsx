"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

const colors = [
  "#a63607",
  "#06a19c",
  "#4239c4",
  "#b83364",
  "#a63607",
  "#06a19c",
  "#4239c4",
  "#b83364",
];

const PageTransition = () => {
  const pathname = usePathname();
  const colorLayersRef = useRef([]);
  const divRef = useRef();
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      paused: true,
    });

    const group1 = colorLayersRef.current.slice(0, 4);
    const group2 = colorLayersRef.current.slice(4);
    const group1Duration = 2 + (4 - 1) * 0.15; // 2.45s

    // First group animation with loading div
    tl.current.to(
      group1,
      {
        y: "-100%",
        duration: 2,
        stagger: 0.15,
      },
      "firstGroup"
    );

    tl.current.to(
      divRef.current,
      {
        y: "0%",
        duration: group1Duration,
      },
      "firstGroup"
    );

    // Pause at top
    tl.current.to({}, { duration: 1 });

    // Synchronized exit and second group animation
    tl.current.add("exitStart");
    tl.current.to(
      divRef.current,
      {
        y: "-100%",
        duration: 1,
      },
      "exitStart"
    );

    tl.current.to(
      group2,
      {
        y: "-100%",
        duration: 1,
        stagger: 0.1,
      },
      "exitStart"
    );

    // Reset all elements
    tl.current.to(
      [colorLayersRef.current, divRef.current],
      { y: "100%", duration: 0 },
      "+=0.5"
    );

    return () => tl.current.kill();
  }, []);

  useEffect(() => {
    if (pathname && tl.current) {
      tl.current.restart();
    }
  }, [pathname]);

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] pointer-events-none">
      {colors.map((color, index) => (
        <div
          key={index}
          ref={(el) => (colorLayersRef.current[index] = el)}
          className="absolute inset-0 w-full h-full transform translate-y-full"
          style={{ backgroundColor: color }}
        />
      ))}
      <div
        ref={divRef}
        className="absolute inset-0 transform translate-y-full flex items-center justify-center text-4xl text-white bg-black"
      >
        Loading...
      </div>
    </div>
  );
};

export default PageTransition;
