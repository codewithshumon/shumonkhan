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

// SVG path data for different pages
const iconMap = {
  work: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9 7v-4h2v4h-2zm-4 0v-4h2v4H7zm8 0v-4h2v4h-2z",
  contact:
    "M1 4h22v16H1V4zm22-2H1a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 12H8v-2h6v2zm4-4H8V8h10v2z",
  about:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  default:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
};

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

  // Get current page name from path
  const getPageName = () => {
    const pathSegments = pathname?.split("/")?.filter(Boolean);
    const pageName = pathSegments?.length ? pathSegments.slice(-1)[0] : "home";
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  // Get appropriate SVG path
  const getIconPath = () => {
    const pageKey = Object.keys(iconMap).find((key) =>
      pathname?.toLowerCase().includes(key)
    );
    return iconMap[pageKey] || iconMap.default;
  };

  useEffect(() => {
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
          style={{ backgroundColor: color, transform: "translateY(100%)" }}
        />
      ))}
      <div
        ref={divRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black gap-4"
        style={{ transform: "translateY(100%)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={getIconPath()} fillRule="evenodd" clipRule="evenodd" />
        </svg>
        <h2 className="text-4xl font-bold animate-pulse">{getPageName()}</h2>
      </div>
    </div>
  );
};

export default PageTransition;
