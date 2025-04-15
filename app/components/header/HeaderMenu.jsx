"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import SideMenu from "./SideMenu";
import {
  resetPageTransition,
  triggerPageTransition,
} from "@/app/store/slice/animationSlice";

const HeaderMenu = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { scrollY } = useScroll();

  const handlePageTransition = useCallback((e, href) => {
    e.preventDefault();
    router.push(href);
    setTimeout(() => {
      dispatch(triggerPageTransition());
    }, 100);

    setTimeout(() => {
      dispatch(resetPageTransition());
    }, 3000);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 120;
    setIsVisible(scrolled);
    setIsScrolled(scrolled);
  });

  return (
    <>
      <header>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isScrolled ? "-15vh" : 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-0 left-0 h-[13vh] w-full flex justify-end px-5 sm:px-10 z-35"
        >
          <nav className="flex items-center gap-3 sm:gap-5 md:gap-8 xl:gap-12 text-xs xs:text-[0.9rem] sm:text-[1rem] font-semibold">
            {[
              { name: "Work", href: "/work" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <div
                key={item.name}
                href={item.href}
                onClick={(e) => handlePageTransition(e, item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className={`group relative py-2 transition-all duration-300 cursor-pointer ${
                  (item.href === pathname && !hoveredHref) ||
                  hoveredHref === item.href
                    ? "text-white"
                    : "text-gray-200"
                }`}
              >
                <span className="block group-hover:-translate-y-1 transition-transform duration-300">
                  {item.name}
                </span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left transition-transform duration-300 ${
                    (item.href === pathname && !hoveredHref) ||
                    hoveredHref === item.href
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </div>
            ))}
          </nav>
        </motion.div>
      </header>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className="fixed right-5 xs:right-10 top-8 z-40"
          >
            <button
              onClick={toggleMenu}
              className="w-15 h-15 xs:w-18 xs:h-18 rounded-full bg-[#3c32be] shadow-lg flex flex-col items-center justify-center gap-1.5 hover:bg-[#4a41c7] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.div
                className="h-[2px] w-[25px] bg-white rounded-full"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 4 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <motion.div
                className="h-[2px] w-[25px] bg-white rounded-full"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default HeaderMenu;
