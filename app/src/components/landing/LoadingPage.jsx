"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingPage() {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000); // Start animation after 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <motion.div
        layout
        initial={{
          position: "fixed",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "12rem",
          height: "12rem",
        }}
        animate={
          animationStarted
            ? {
                top: "1rem",
                left: "1rem",
                x: 0,
                y: 0,
                width: "4rem",
                height: "4rem",
              }
            : {}
        }
        transition={{ duration: 3 }}
        className="rounded-full border-4 border-white overflow-hidden relative"
        style={{
          borderWidth: animationStarted ? "2px" : "4px",
        }}
      >
        <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold"
          initial={{ opacity: 1 }}
          animate={{
            opacity: animationStarted ? 0 : 1,
            fontSize: animationStarted ? "0rem" : "2.25rem",
          }}
          transition={{ duration: 1, delay: animationStarted ? 1 : 0 }}
        >
          Hello
        </motion.div>
      </motion.div>
    </div>
  );
}
