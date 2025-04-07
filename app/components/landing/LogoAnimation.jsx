// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";

// const LogoAnimation = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const circleVariants = {
//     initial: {
//       width: "2.5rem",
//       height: "2.5rem",
//     },
//     expanded: {
//       width: "300%",
//       height: "300%",
//     },
//   };

//   return (
//     <div className="w-full h-full relative bg-amber-400">
//       <motion.div
//         className="fixed top-[3rem] left-[4rem] bg-blue-500 rounded-full cursor-pointer"
//         style={{
//           transform: "translate(-50%, -50%)",
//         }}
//         variants={circleVariants}
//         initial="initial"
//         animate={isExpanded ? " initial" : "expanded"}
//         onClick={() => setIsExpanded(!isExpanded)}
//       />
//     </div>
//   );
// };

// export default LogoAnimation;

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const greetings = [
  "Hallo",
  "Ciao",
  "Bonjour",
  "こんにちは",
  "привет",
  "नमस्ते",
  "你好",
  "Hola",
  "مرحبًا",
  "হ্যালো",
  "Hello",
];

export default function ImageAnimation() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [greetingIntervalId, setGreetingIntervalId] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation (0-100% in 2500ms)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 22); // 2500ms / 100 = 25ms per percent

    const startTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      // Set timer to hide background after 1 second
      setTimeout(() => {}, 1000);
    }, 3100);

    const collapseTimer = setTimeout(() => {
      setCollapsed(true);
    }, 3000);

    // Greeting animation
    const intervalId = setInterval(() => {
      setCurrentGreeting((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(intervalId); // Stop when reaching last greeting
          return prev;
        }
        return prev + 1;
      });
    }, 200); // Change every 0.2 seconds

    setGreetingIntervalId(intervalId);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
      clearTimeout(collapseTimer);
      clearInterval(intervalId);
    };
  }, []);

  // Clear interval when reaching last greeting
  useEffect(() => {
    if (currentGreeting === greetings.length - 1 && greetingIntervalId) {
      clearInterval(greetingIntervalId);
    }
  }, [currentGreeting, greetingIntervalId]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden flex justify-center"
      initial={{ height: "100vh" }}
      animate={collapsed ? { height: "80px" } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Content container with max-width */}
      <div className="relative h-full w-full max-w-[1440px] px-10">
        {/* Loading Animation */}
        <motion.div
          layout
          initial={{
            position: "absolute",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            width: "10rem",
            height: "10rem",
          }}
          animate={
            animationStarted
              ? {
                  top: "1rem",
                  left: "2.5rem",
                  x: 0,
                  y: 0,
                  width: "3rem",
                  height: "3rem",
                }
              : {}
          }
          transition={{ duration: 1 }}
          className="rounded-full border-4 border-white overflow-hidden bg-green-600 z-10"
          style={{
            borderWidth: animationStarted ? "2px" : "4px",
          }}
        >
          <Image
            src="https://avatar.iran.liara.run/public/boy"
            alt="Profile"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Circular Progress Bar - only visible during initial load */}
        {!animationStarted && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "11rem",
              height: "11rem",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#333"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="green"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83}, 283`} // 2πr ≈ 283 when r=45
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        )}

        {/* Greetings text - positioned below the image */}
        <motion.div
          className="absolute top-[calc(50%+6rem)] left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold text-center w-full"
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: animationStarted ? 0 : 1,
            y: animationStarted ? -20 : 0,
          }}
          transition={{ duration: 0.1, delay: animationStarted ? 0.1 : 0 }}
          style={{ top: `calc(50% + 6rem)` }}
        >
          {greetings[currentGreeting]}
        </motion.div>
      </div>
    </motion.div>
  );
}
