"use client";

import { useState, useEffect } from "react";
import useMouse from "../../hooks/useMouse";

export default function About() {
  const position = useMouse();
  const [cursorState, setCursorState] = useState({
    scale: 1,
    color: "bg-green-400",
    hidden: false,
  });

  useEffect(() => {
    const elements = document.elementsFromPoint(position.x, position.y);
    let newState = { scale: 1, color: "bg-green-400", hidden: false };

    elements.forEach((element) => {
      if (element.classList.contains("text-[#dfbb1c]")) {
        newState = { scale: 3, color: "bg-[#0a3aca]", hidden: false };
      } else if (element.classList.contains("text-[#0adfcd]")) {
        newState = { scale: 1, color: "bg-green-400", hidden: true };
      } else if (element.classList.contains("text-[#ff16ff]")) {
        newState = { scale: 1, color: "bg-[#ff16ff]", hidden: false };
      }
    });

    setCursorState(newState);
  }, [position.x, position.y]);

  return (
    <div className="w-full h-full relative bg-[#1C1D20]">
      {/* Mouse Follower - Behind Content */}
      <div className="w-full h-full relative z-[3]">
        <div
          className={`fixed w-10 h-10 rounded-full pointer-events-none ${cursorState.color}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${cursorState.scale})`,
            transition:
              "transform 0.1s ease-out, background-color 0.1s ease-out",
            display: cursorState.hidden ? "none" : "block",
          }}
        />
      </div>

      {/* Content Section - In Front */}
      <div className="w-full h-full px-10 py-10 relative z-[5] bg-transparent">
        {/* Keep your existing content sections with text classes */}
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-[#dfbb1c]">
            this is the first div
          </h1>
          {/* Repeat other h1 elements */}
        </div>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-[#0adfcd]">
            this is the second div
          </h1>
          {/* Repeat other h1 elements */}
        </div>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold text-[#ff16ff]">
            this is the third div
          </h1>
          {/* Repeat other h1 elements */}
        </div>
      </div>
    </div>
  );
}
