"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoadingPage() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [heightTransition, setHeightTransition] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000); // Start animation after 1 second

    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      // Start height transition slightly after animation completes
      setTimeout(() => setHeightTransition(true), 100);
    }, 4000); // Mark animation complete after 4 seconds (1s delay + 3s animation)

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background that will collapse */}
      <motion.div
        className="bg-black"
        initial={{ height: "100vh" }}
        animate={
          heightTransition
            ? {
                height: "15vh",
              }
            : {}
        }
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Content */}
      <div
        className={`${
          animationComplete ? "h-[15vh]" : "min-h-screen"
        } absolute inset-0`}
      >
        {/* Loading Animation */}
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
            zIndex: 50,
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
          <Image
            src="https://avatar.iran.liara.run/public/boy"
            alt="Profile"
            fill
            className="object-cover"
          />

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

        {/* Header that appears after animation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 left-0 right-0 backdrop-blur-sm z-40 ${
            !animationComplete ? "pointer-events-none" : ""
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="w-16"></div> {/* Spacer to balance logo */}
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-white hover:text-gray-300 transition"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 transition"
              >
                Contact
              </Link>
            </nav>
            <div className="w-16"></div>
          </div>
        </motion.header>
      </div>
    </div>
  );
}
