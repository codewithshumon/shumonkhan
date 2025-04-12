"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

const colors = ["#a63607", "#06a19c", "#4239c4", "#b83364"];

const PageTransition = () => {
  const pathname = usePathname();
  const transitionRef = useRef();
  const colorLayersRef = useRef([]);
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    // Animate each color layer from bottom to top
    colorLayersRef.current.forEach((layer, index) => {
      tl.current.to(
        layer,
        {
          y: "-100%",
          duration: 0.6,
          delay: index * 0.15,
        },
        0
      );
    });

    // Reset position after animation
    tl.current.to(colorLayersRef.current, {
      y: "100%",
      duration: 0,
      delay: 0.5,
    });

    return () => tl.current.kill();
  }, []);

  useEffect(() => {
    // Play animation on route change
    if (transitionRef.current) {
      tl.current.restart();
    }
  }, [pathname]);

  return (
    <div
      ref={transitionRef}
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none"
    >
      {colors.map((color, index) => (
        <div
          key={index}
          ref={(el) => (colorLayersRef.current[index] = el)}
          className="absolute inset-0 w-full h-full transform translate-y-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default PageTransition;
