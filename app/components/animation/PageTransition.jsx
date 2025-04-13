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

const PageTransition = ({
  pauseTime = 0.2, //loading div pause time
  group1Duration = 1,
  group1Stagger = 0.15, //gap between each color layer
  group2Duration = 1,
  group2Stagger = 0.15, //gap between each color layer
}) => {
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

    // Calculate total first group animation time
    const totalGroup1Time =
      group1Duration + (group1.length - 1) * group1Stagger;

    // First group animation with loading div
    tl.current.to(
      group1,
      {
        y: "-100%",
        duration: group1Duration,
        stagger: group1Stagger,
      },
      "firstGroup"
    );

    tl.current.to(
      divRef.current,
      {
        y: "0%",
        duration: totalGroup1Time,
      },
      "firstGroup"
    );

    // Controlled pause at top
    tl.current.to({}, { duration: pauseTime });

    // Synchronized exit and second group animation
    tl.current.add("exitStart");
    tl.current.to(
      divRef.current,
      {
        y: "-100%",
        duration: group2Duration,
      },
      "exitStart"
    );

    tl.current.to(
      group2,
      {
        y: "-100%",
        duration: group2Duration,
        stagger: group2Stagger,
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
  }, [pauseTime, group1Duration, group1Stagger, group2Duration, group2Stagger]);

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
