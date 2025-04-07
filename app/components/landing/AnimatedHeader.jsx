"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AnimatedHeader() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000); // Start animation after 1 second

    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500); // Mark animation complete after 4 seconds

    const collapseTimer = setTimeout(() => {
      setCollapsed(true);
    }, 1600); // Start collapse slightly after animation completes

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden flex justify-center"
      initial={{ height: "100vh" }}
      animate={collapsed ? { height: "80px" } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Content container with max-width */}
      <div className="relative h-full w-full max-w-[1440px] px-10 bg-amber-500">
        {/* Loading Animation */}
        <motion.div
          layout
          initial={{
            position: "absolute",
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
                  left: "2.5rem", // Match the padding
                  x: 0,
                  y: 0,
                  width: "3rem",
                  height: "3rem",
                }
              : {}
          }
          transition={{ duration: 1 }}
          className="rounded-full border-4 border-white overflow-hidden bg-green-600"
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

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`absolute top-0  right-0 h-[80px] flex items-center ${
            !animationComplete ? "pointer-events-none" : ""
          }`}
        >
          <div className="w-full flex justify-between items-center">
            <div className="w-12"></div> {/* Spacer for profile image */}
            <div className="flex space-x-8">
              <Link
                href="/work"
                className="text-white hover:text-gray-300 transition"
              >
                Work
              </Link>

              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-white hover:text-gray-300 transition"
              >
                Contact
              </Link>
            </div>
            <div className="w-12"></div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
