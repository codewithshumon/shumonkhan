"use client";
import { useState, useEffect, useRef } from "react";
import useMouse from "../../hooks/useMouse";
import Blob from "@/app/components/blob/Blob";

const lerp = (a, b, t) => a * (1 - t) + b * t;

export default function MouseFollower() {
  const position = useMouse();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHoveringFooter, setIsHoveringFooter] = useState(false);

  const [smoothedState, setSmoothedState] = useState({
    x: position.x,
    y: position.y,
    scale: 1,
    color: "#ff16ff",
    opacity: 1,
    blendMode: "normal",
  });

  const targetState = useRef({
    x: 0,
    y: 0,
    scale: 1,
    color: "#ff16ff",
    hidden: false,
    blendMode: "normal",
  });

  // Track if footer is in viewport
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      setIsFooterVisible(isVisible);
    };

    window.addEventListener("scroll", checkFooterVisibility);
    window.addEventListener("resize", checkFooterVisibility);
    checkFooterVisibility(); // Initial check

    return () => {
      window.removeEventListener("scroll", checkFooterVisibility);
      window.removeEventListener("resize", checkFooterVisibility);
    };
  }, []);

  // Update target state based on mouse position and hover state
  useEffect(() => {
    targetState.current.x = position.x;
    targetState.current.y = position.y;

    const elements = document.elementsFromPoint(position.x, position.y);
    let newState = {
      scale: 1,
      color: "#ff16ff",
      hidden: false,
      blendMode: "normal",
    };

    const isOverFooter = elements.some((el) => el.closest("footer"));
    setIsHoveringFooter(isOverFooter);

    elements.forEach((element) => {
      if (element.classList.contains("mouse-animate-scale")) {
        newState = { ...newState, scale: 2, color: "#0a3aca" };
      } else if (element.classList.contains("mouse-animate-hidden")) {
        newState = { ...newState, scale: 0, color: "#ff16ff", hidden: true };
      } else if (element.classList.contains("mouse-animate-color")) {
        newState = { ...newState, scale: 2, color: "#FF0066" };
      }
    });

    // Apply blend mode only if hovering AND visible
    if (isOverFooter && isFooterVisible) {
      newState = {
        ...newState,
        scale: 2,
        color: "#0a3aca",
        blendMode: "difference",
      };
    }

    if (position.x === 0 && position.y === 0) {
      newState.hidden = true;
      newState.scale = 0;
    }

    targetState.current = { ...targetState.current, ...newState };
  }, [position.x, position.y, isFooterVisible]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setSmoothedState((prev) => ({
        x: lerp(prev.x, targetState.current.x, 0.1),
        y: lerp(prev.y, targetState.current.y, 0.1),
        scale: lerp(prev.scale, targetState.current.scale, 0.1),
        color: targetState.current.color,
        opacity: lerp(prev.opacity, targetState.current.hidden ? 0 : 1, 0.1),
        blendMode: targetState.current.blendMode,
      }));
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[3]"
      style={{
        transform: `translate(${smoothedState.x}px, ${smoothedState.y}px) translate(-50%, -50%) scale(${smoothedState.scale})`,
        opacity: smoothedState.opacity,
        mixBlendMode: smoothedState.blendMode,
        isolation: "isolate", // Add this
        willChange: "transform, opacity", // Add this for performance
      }}
    >
      <Blob fill={smoothedState.color} />
    </div>
  );
}
