"use client";

import { useState, useEffect, useRef } from "react";
import useMouse from "../../hooks/useMouse";
import Blob from "@/app/components/blob/Blob";

const lerp = (a, b, t) => a * (1 - t) + b * t;

export default function MouseFollower() {
  const position = useMouse();
  const [currentBlobIndex, setCurrentBlobIndex] = useState(0);

  const [smoothedState, setSmoothedState] = useState({
    x: position.x,
    y: position.y,
    scale: 1,
    color: "#FF0066",
    opacity: 1,
  });

  const targetState = useRef({
    x: 0,
    y: 0,
    scale: 1,
    color: "#FF0066",
    hidden: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlobIndex((prev) => (prev + 1) % 15); // 15 blobs
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    targetState.current.x = position.x;
    targetState.current.y = position.y;

    const elements = document.elementsFromPoint(position.x, position.y);
    let newState = { scale: 1, color: "#FF0066", hidden: false };

    elements.forEach((element) => {
      if (element.classList.contains("mouse-animate-scale")) {
        newState = { scale: 2, color: "#0a3aca", hidden: false };
      } else if (element.classList.contains("mouse-animate-hidden")) {
        newState = { scale: 0, color: "#FF0066", hidden: true };
      } else if (element.classList.contains("mouse-animate-color")) {
        newState = { scale: 2, color: "#ff16ff", hidden: false };
      }
    });

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
    <div
      className="fixed pointer-events-none"
      style={{
        transform: `translate(${smoothedState.x}px, ${smoothedState.y}px) translate(-50%, -50%) scale(${smoothedState.scale})`,
        opacity: smoothedState.opacity,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      }}
    >
      <Blob index={currentBlobIndex} fill={smoothedState.color} />
    </div>
  );
}
