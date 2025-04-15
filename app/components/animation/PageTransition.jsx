"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

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

const iconMap = {
  work: "/work.svg",
  contact: "/contact.svg",
  about: "/about.svg",
  default: "/home.svg",
};

const pageTitles = {
  "/": "Design & Development Studio",
  "/work": "Creative Innovation Showcase",
  "/about": "Journey as Designer & Developer",
  "/contact": "Let's Collaborate & Create",
};

const PageTransition = ({
  pauseTime = 0.5,
  group1Duration = 0.7,
  group1Stagger = 0.1,
  group2Duration = 0.7,
  group2Stagger = 0.1,
}) => {
  const pathname = usePathname();
  const { shouldAnimatePageTransition } = useSelector(
    (state) => state.animation
  );
  const colorLayersRef = useRef([]);
  const divRef = useRef();
  const tl = useRef();
  const initialized = useRef(false);

  const getPageTitle = () => {
    const cleanPath = pathname?.replace(/\/$/, "") || "/";
    return (
      pageTitles[cleanPath] ||
      `${
        cleanPath.split("/").pop()?.charAt(0).toUpperCase() +
          cleanPath.split("/").pop()?.slice(1) || "Home"
      }`
    );
  };

  const getIconPath = () => {
    const pageKey = Object.keys(iconMap).find((key) =>
      pathname?.toLowerCase().includes(key)
    );
    return iconMap[pageKey] || iconMap.default;
  };

  useEffect(() => {
    if (!shouldAnimatePageTransition) return;

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
      { y: "-100%", duration: group1Duration, stagger: group1Stagger },
      "firstGroup"
    );

    tl.current.to(
      divRef.current,
      { y: "0%", duration: totalGroup1Time },
      "firstGroup"
    );

    tl.current.to({}, { duration: pauseTime });

    tl.current.add("exitStart");
    tl.current.to(
      divRef.current,
      { y: "-100%", duration: group2Duration },
      "exitStart"
    );

    tl.current.to(
      group2,
      { y: "-100%", duration: group2Duration, stagger: group2Stagger },
      "exitStart"
    );

    tl.current.to(
      [colorLayersRef.current, divRef.current],
      { y: "100%", duration: 0 },
      "+=0.5"
    );

    initialized.current = true;
    tl.current.play();

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  }, [
    pauseTime,
    group1Duration,
    group1Stagger,
    group2Duration,
    group2Stagger,
    shouldAnimatePageTransition,
  ]);

  if (!shouldAnimatePageTransition) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] pointer-events-none overflow-hidden">
      {colors.map((color, index) => (
        <div
          key={index}
          ref={(el) => (colorLayersRef.current[index] = el)}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: color, transform: "translateY(100%)" }}
        />
      ))}
      <div
        ref={divRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-white bg-[#181717] gap-2 md:gap-4"
        style={{ transform: "translateY(100%)" }}
      >
        <img
          src={getIconPath()}
          alt=""
          width={200}
          height={200}
          className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] md:w-[170px] md:h-[170px] lg:w-[200px] lg:h-[200px] transition-all duration-300"
        />
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold animate-pulse text-center px-4 leading-tight">
          {getPageTitle()}
        </h2>
      </div>
    </div>
  );
};

export default PageTransition;
