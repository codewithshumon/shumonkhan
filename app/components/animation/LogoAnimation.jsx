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
import useScreenSize from "@/app/hooks/useScreenSize";

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
    "Design Philosophy",
    "User-Centric Mindset",
    "Technical Approach",
    "User-Centric Mindset",
    "From Sketch to Screen",
    "Designing with Purpose",
    "Problem-Solving DNA",
    "Digital Craftsmanship",
    "Who I Am",
    "Behind the Interface",
    "Get to Know Me",
  ],
  "/contact": [
    "Discuss Your Vision",
    "Start a Project",
    "Let's Build Something",
    "Have a Project in Mind?",
    "Let's Collaborate",
    "Hire Your Designer",
    "New Opportunity",
    "Always Open to Ideas",
    "Freelance Inquiry",
    "Work With Me",
    "Send Me an Email",
  ],
  "/work": [
    "Featured Projects",
    "UI Showcase",
    "Code Meets Design",
    "Interaction Designs",
    "UX Case Studies",
    "Real-world Solutions",
    "Responsive Designs",
    "Prototype Gallery",
    "Apps I've Built",
    "Development Samples",
    "Explore My Best Works",
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
  const { isMiniMobile, isMobile, isTablet } = useScreenSize();

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
  }, [currentGreetings]);

  useEffect(() => {
    if (currentGreeting === currentGreetings.length - 1 && greetingIntervalId) {
      clearInterval(greetingIntervalId);
    }
  }, [currentGreeting, currentGreetings.length, greetingIntervalId]);

  // Calculate responsive values
  const getResponsiveValues = () => {
    if (isMiniMobile) {
      return {
        left: "1rem",
        size: "2rem",
        borderWidth: "1px",
        textSize: "text-lg",
      };
    }
    if (isMobile) {
      return {
        left: "1.5rem",
        size: "2.5rem",
        borderWidth: "2px",
        textSize: "text-xl",
      };
    }
    if (isTablet) {
      return {
        left: "2rem",
        size: "2.8rem",
        borderWidth: "2px",
        textSize: "text-xl",
      };
    }
    return {
      left: "2.5rem",
      size: "3rem",
      borderWidth: "2px",
      textSize: "text-xl",
    };
  };

  const responsiveValues = getResponsiveValues();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-60 overflow-hidden flex justify-center "
        initial={{ height: "100vh" }}
        animate={
          collapsed
            ? {
                height: isMiniMobile ? "12vh" : "15vh",
                width: isMiniMobile
                  ? "40vw"
                  : isMobile
                  ? "30vw"
                  : isTablet
                  ? "25vw"
                  : "15vw",
              }
            : {}
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="relative h-screen w-screen max-w-[1440px] px-4 sm:px-6 md:px-10">
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
                    top: isMiniMobile ? "1.4rem" : isMobile ? "1.2rem" : "1rem",
                    left: responsiveValues.left,
                    x: 0,
                    y: 0,
                    width: responsiveValues.size,
                    height: responsiveValues.size,
                  }
                : {}
            }
            transition={{ duration: 0.6 }}
            className="rounded-full border-white overflow-hidden bg-green-600 z-10"
            style={{
              borderWidth: animationStarted
                ? responsiveValues.borderWidth
                : "4px",
              borderStyle: "solid",
            }}
          >
            <div onClick={handlePageTransition} className="cursor-pointer">
              <Image
                src="https://avatar.iran.liara.run/public/boy"
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 512px) 32px, (max-width: 640px) 40px, 48px"
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
            className={`absolute top-[calc(50%+4rem)] left-1/2 transform -translate-x-1/2 text-white ${responsiveValues.textSize} font-bold text-center w-full px-2`}
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
        className="fixed bg-black rounded-full z-50"
        style={{
          top: "2.5rem",
          left: isMiniMobile ? "2rem" : "3rem",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ width: "300%", height: "300%" }}
        animate={
          collapsed
            ? {
                width: "1rem",
                height: "1rem",
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
