// "use client";

// import { useState, useEffect, useRef } from "react";
// import useMouse from "../../hooks/useMouse";

// // Import blob SVGs as images
// import blob1 from "@/app/asset/blob1.svg";
// import blob2 from "@/app/asset/blob2.svg";
// import blob3 from "@/app/asset/blob3.svg";
// import blob4 from "@/app/asset/blob4.svg";
// import blob5 from "@/app/asset/blob5.svg";
// import blob6 from "@/app/asset/blob6.svg";
// import blob7 from "@/app/asset/blob7.svg";
// import blob8 from "@/app/asset/blob8.svg";
// import blob9 from "@/app/asset/blob9.svg";
// import blob10 from "@/app/asset/blob10.svg";
// import blob11 from "@/app/asset/blob11.svg";
// import blob12 from "@/app/asset/blob12.svg";
// import blob13 from "@/app/asset/blob13.svg";
// import blob14 from "@/app/asset/blob14.svg";
// import blob15 from "@/app/asset/blob15.svg";

// const lerp = (a, b, t) => a * (1 - t) + b * t;

// export default function MouseFollower() {
//   const position = useMouse();
//   const [currentBlobIndex, setCurrentBlobIndex] = useState(0);

//   const blobs = [
//     blob1,
//     blob2,
//     blob3,
//     blob4,
//     blob5,
//     blob6,
//     blob7,
//     blob8,
//     blob9,
//     blob10,
//     blob11,
//     blob12,
//     blob13,
//     blob14,
//     blob15,
//   ];

//   const [smoothedState, setSmoothedState] = useState({
//     x: position.x,
//     y: position.y,
//     scale: 1,
//     color: "#FF0066",
//     opacity: 1,
//   });

//   const targetState = useRef({
//     x: 0,
//     y: 0,
//     scale: 1,
//     color: "#FF0066",
//     hidden: false,
//   });

//   // Cycle through blobs every 500ms
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBlobIndex((prev) => (prev + 1) % blobs.length);
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     targetState.current.x = position.x;
//     targetState.current.y = position.y;

//     const elements = document.elementsFromPoint(position.x, position.y);
//     let newState = { scale: 1, color: "#FF0066", hidden: false };

//     elements.forEach((element) => {
//       if (element.classList.contains("mouse-animate-scale")) {
//         newState = { scale: 3, color: "#0a3aca", hidden: false };
//       } else if (element.classList.contains("mouse-animate-hidden")) {
//         newState = { scale: 0, color: "#FF0066", hidden: true };
//       } else if (element.classList.contains("mouse-animate-color")) {
//         newState = { scale: 2, color: "#ff16ff", hidden: false };
//       }
//     });

//     if (position.x === 0 && position.y === 0) {
//       newState.hidden = true;
//       newState.scale = 0;
//     }

//     targetState.current = { ...targetState.current, ...newState };
//   }, [position.x, position.y]);

//   useEffect(() => {
//     const animate = () => {
//       setSmoothedState((prev) => ({
//         x: lerp(prev.x, targetState.current.x, 0.1),
//         y: lerp(prev.y, targetState.current.y, 0.1),
//         scale: lerp(prev.scale, targetState.current.scale, 0.1),
//         color: targetState.current.color,
//         opacity: lerp(prev.opacity, targetState.current.hidden ? 0 : 1, 0.1),
//       }));
//       requestAnimationFrame(animate);
//     };
//     animate();
//   }, []);

//   const CurrentBlob = blobs[currentBlobIndex];

//   return (
//     <div
//       className="fixed pointer-events-none "
//       style={{
//         transform: `translate(${smoothedState.x}px, ${smoothedState.y}px) translate(-50%, -50%) scale(${smoothedState.scale})`,
//         opacity: smoothedState.opacity,
//         transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
//       }}
//     >
//       <img
//         src={CurrentBlob.src || CurrentBlob}
//         alt="Mouse Blob"
//         className="w-10 h-10"
//         style={{
//           filter: `drop-shadow(0 0 4px ${smoothedState.color})`,
//         }}
//       />
//     </div>
//   );
// }

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
        newState = { scale: 3, color: "#0a3aca", hidden: false };
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
