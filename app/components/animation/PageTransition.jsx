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
  pauseTime = 0.2,
  group1Duration = 1,
  group1Stagger = 0.15,
  group2Duration = 1,
  group2Stagger = 0.15,
}) => {
  const pathname = usePathname();
  const colorLayersRef = useRef([]);
  const divRef = useRef();
  const tl = useRef();
  const initialized = useRef(false);

  useEffect(() => {
    // Set initial positions immediately
    gsap.set(colorLayersRef.current, { y: "100%" });
    gsap.set(divRef.current, { y: "100%" });

    tl.current = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      paused: !initialized.current,
    });

    const group1 = colorLayersRef.current.slice(0, 4);
    const group2 = colorLayersRef.current.slice(4);
    const totalGroup1Time =
      group1Duration + (group1.length - 1) * group1Stagger;

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

    tl.current.to({}, { duration: pauseTime });

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

    tl.current.to(
      [colorLayersRef.current, divRef.current],
      { y: "100%", duration: 0 },
      "+=0.5"
    );

    initialized.current = true;
    return () => tl.current.kill();
  }, [pauseTime, group1Duration, group1Stagger, group2Duration, group2Stagger]);

  useEffect(() => {
    if (pathname && tl.current) {
      tl.current.restart();
    }
  }, [pathname]);

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] pointer-events-none overflow-hidden">
      {colors.map((color, index) => (
        <div
          key={index}
          ref={(el) => (colorLayersRef.current[index] = el)}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: color,
            transform: "translateY(100%)",
          }}
        />
      ))}
      <div
        ref={divRef}
        className="absolute inset-0 flex items-center justify-center text-4xl text-white bg-black"
        style={{ transform: "translateY(100%)" }}
      >
        Loading...
      </div>
    </div>
  );
};

export default PageTransition;
