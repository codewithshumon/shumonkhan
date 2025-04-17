"use client";

import { useState, useEffect, useRef } from "react";
import useMouse from "../hooks/useMouse";

const lerp = (a, b, t) => a * (1 - t) + b * t;

export default function Home() {
  const position = useMouse();

  const [smoothedState, setSmoothedState] = useState({
    x: position.x,
    y: position.y,
    scale: 1,
    color: "bg-green-400",
    opacity: 1,
  });
  const targetState = useRef({
    x: 0,
    y: 0,
    scale: 1,
    color: "bg-green-400",
    hidden: false,
  });

  useEffect(() => {
    targetState.current.x = position.x;
    targetState.current.y = position.y;

    const elements = document.elementsFromPoint(position.x, position.y);
    let newState = { scale: 1, color: "bg-green-400", hidden: false };

    elements.forEach((element) => {
      if (element.classList.contains("mouse-animate-scale")) {
        newState = { scale: 3, color: "bg-[#0a3aca]", hidden: false };
      } else if (element.classList.contains("mouse-animate-hidden")) {
        newState = { scale: 0, color: "bg-green-400", hidden: true };
      } else if (element.classList.contains("mouse-animate-color")) {
        newState = { scale: 2, color: "bg-[#ff16ff]", hidden: false };
      }
    });

    // Hide cursor at (0,0) regardless of elements
    if (position.x === 0 && position.y === 0) {
      newState.hidden = true;
      newState.scale = 0;
    }

    targetState.current = { ...targetState.current, ...newState };
  }, [position.x, position.y]);

  useEffect(() => {
    const animate = () => {
      setSmoothedState((prev) => ({
        x: lerp(prev.x, targetState.current.x, 0.1),
        y: lerp(prev.y, targetState.current.y, 0.1),
        scale: lerp(prev.scale, targetState.current.scale, 0.1),
        color: targetState.current.color,
        opacity: lerp(prev.opacity, targetState.current.hidden ? 0 : 1, 0.1),
      }));
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="w-full h-full relative bg-[#1C1D20]">
      {/* Mouse Follower */}
      <div
        className={`fixed w-10 h-10 rounded-full pointer-events-none transition-all duration-100 ease-out ${smoothedState.color}`}
        style={{
          transform: `translate(${smoothedState.x}px, ${smoothedState.y}px) translate(-50%, -50%) scale(${smoothedState.scale})`,
          opacity: smoothedState.opacity,
        }}
      />

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
