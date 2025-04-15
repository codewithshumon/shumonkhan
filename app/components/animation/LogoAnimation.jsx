"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import AnimatedTextAboutMe from "./AnimatedTextAboutMe";
import {
  resetPageTransition,
  triggerPageTransition,
} from "@/app/store/slice/animationSlice";
import { useDispatch } from "react-redux";

const routeGreetings = {
  "/": [
    "Willkommen", // German
    "Benvenuto", // Italian
    "Bienvenue", // French
    "ようこそ", // Japanese
    "Добро пожаловать", // Russian
    "स्वागत है", // Hindi
    "欢迎", // Chinese
    "Bienvenido", // Spanish
    "أهلاً وسهلاً", // Arabic
    "স্বাগতম", // Bengali
    "Welcome", // English
  ],
  "/about": [
    "Discover",
    "Explore",
    "Learn More",
    "About Me",
    "My Story",
    "Background",
    "Journey",
    "Experience",
    "Bio",
    "Who am I?",
    "Get to Know Me",
  ],
  "/contact": [
    "Reach Out",
    "Let's Talk",
    "Connect",
    "Get in Touch",
    "Contact Me",
    "Say Hello",
    "Collaborate",
    "Message",
    "Hire Me",
    "Network",
    "Available Now",
  ],
  "/work": [
    "Portfolio",
    "Projects",
    "Creations",
    "Works",
    "Case Studies",
    "Showcase",
    "Achievements",
    "Experience",
    "Designs",
    "Solutions",
    "My Works",
  ],
};

export default function LogoAnimation() {
  const pathname = usePathname();
  const currentGreetings = routeGreetings[pathname] || routeGreetings["/"];
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [greetingIntervalId, setGreetingIntervalId] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle page transition
  const handlePageTransition = useCallback(
    (e) => {
      e.preventDefault();
      router.push("/");
      setTimeout(() => dispatch(triggerPageTransition()), 100);
      setTimeout(() => dispatch(resetPageTransition()), 3000);
    },
    [dispatch, router]
  );

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 22);

    const startTimer = setTimeout(() => setAnimationStarted(true), 2500);
    const completeTimer = setTimeout(() => setAnimationComplete(true), 3000);
    const collapseTimer = setTimeout(() => setCollapsed(true), 2800);

    const intervalId = setInterval(() => {
      setCurrentGreeting((prev) => {
        if (prev === currentGreetings.length - 1) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    setGreetingIntervalId(intervalId);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
      clearTimeout(collapseTimer);
      clearInterval(intervalId);
    };
  }, [currentGreetings]); // Add currentGreetings as dependency

  useEffect(() => {
    if (currentGreeting === currentGreetings.length - 1 && greetingIntervalId) {
      clearInterval(greetingIntervalId);
    }
  }, [currentGreeting, currentGreetings.length, greetingIntervalId]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-60 overflow-hidden flex justify-center"
        initial={{ height: "100vh" }}
        animate={collapsed ? { height: "15vh", width: "15vw" } : {}}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="relative h-screen w-screen max-w-[1440px] px-10">
          <motion.div
            layout
            initial={{
              position: "absolute",
              top: "45%",
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
            transition={{ duration: 0.6 }}
            className="rounded-full border-4 border-white overflow-hidden bg-green-600 z-10"
            style={{ borderWidth: animationStarted ? "2px" : "4px" }}
          >
            <div onClick={handlePageTransition} className="cursor-pointer">
              <Image
                src="https://avatar.iran.liara.run/public/boy"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {!animationStarted && (
            <div
              className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ width: "11rem", height: "11rem" }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="green"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83}, 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          )}

          <motion.div
            className="absolute top-[calc(50%+4rem)] left-1/2 transform -translate-x-1/2 text-white text-xl font-bold text-center w-full"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: animationStarted ? 0 : 1,
              y: animationStarted ? -20 : 0,
            }}
            transition={{ duration: 0.1, delay: animationStarted ? 0.1 : 0 }}
          >
            {":)"} {currentGreetings[currentGreeting]}
          </motion.div>
        </div>
        {animationComplete && (
          <div className="absolute top-[1.8rem] right-0 w-[70%] overflow-x-hidden">
            <AnimatedTextAboutMe animationComplete={animationComplete} />
          </div>
        )}
      </motion.div>

      <motion.div
        className="fixed top-[2.5rem] left-[4rem] bg-black rounded-full z-50"
        style={{ transform: "translate(-50%, -50%)" }}
        initial={{ width: "300%", height: "300%" }}
        animate={collapsed ? { width: "2.5rem", height: "2.5rem" } : {}}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
