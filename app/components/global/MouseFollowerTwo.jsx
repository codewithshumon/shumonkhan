"use client";

import { useState, useEffect, useRef } from "react";
import useMouse from "../../hooks/useMouse";

const lerp = (a, b, t) => a * (1 - t) + b * t;

export default function MouseFollowerTwo() {
  const position = useMouse();
  const [visibleBlobs, setVisibleBlobs] = useState(0);
  const [smoothedStates, setSmoothedStates] = useState(
    Array.from({ length: 15 }, () => ({
      x: position.x,
      y: position.y,
      scale: 1,
      color: "bg-green-400",
      opacity: 1,
    }))
  );
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

    if (position.x === 0 && position.y === 0) {
      newState.hidden = true;
      newState.scale = 0;
    }

    targetState.current = { ...targetState.current, ...newState };
  }, [position.x, position.y]);

  useEffect(() => {
    const timeouts = [];
    for (let i = 0; i < 15; i++) {
      timeouts.push(
        setTimeout(() => setVisibleBlobs((prev) => prev + 1), 500 * i)
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothedStates((prev) =>
        prev.map((state, index) => {
          const lerpFactor = 0.1 / (index + 1);
          return {
            x: lerp(state.x, targetState.current.x, lerpFactor),
            y: lerp(state.y, targetState.current.y, lerpFactor),
            scale: lerp(state.scale, targetState.current.scale, lerpFactor),
            opacity: lerp(
              state.opacity,
              targetState.current.hidden ? 0 : 1,
              lerpFactor
            ),
            color: targetState.current.color,
          };
        })
      );
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      {smoothedStates.map((state, index) => {
        if (index >= visibleBlobs) return null;
        return (
          <svg
            key={index}
            className={`fixed w-10 h-10 pointer-events-none ${state.color}`}
            style={{
              transform: `translate(${state.x}px, ${state.y}px) translate(-50%, -50%) scale(${state.scale})`,
              opacity: state.opacity,
              transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            }}
            viewBox="0 0 100 100"
          >
            {/* Replace this with your actual SVG blob */}
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        );
      })}
    </>
  );
}
