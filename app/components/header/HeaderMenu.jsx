"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import SideMenu from "./SideMenu";

const HeaderMenu = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);
  const { scrollY } = useScroll();

  // Prevent body scroll when menu is open
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

  // Scroll listener
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 120;
    setIsVisible(scrolled);
    setIsScrolled(scrolled);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Header with Navigation */}
      <header>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isScrolled ? "-15vh" : 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-0 left-0 h-[15vh] w-full flex justify-end px-10 z-35"
        >
          <nav className="flex items-center gap-12 font-semibold">
            {[
              { name: "Work", href: "/work" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className={`group relative py-2 transition-all duration-300 ${
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
              </Link>
            ))}
          </nav>
        </motion.div>
      </header>

      {/* Floating Circle Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className="fixed right-10 top-8 z-40 "
          >
            <button
              onClick={toggleMenu}
              className="w-18 h-18 rounded-full bg-[#3c32be] shadow-lg flex flex-col items-center justify-center gap-1.5 hover:bg-[#4a41c7] transition-colors cursor-pointer"
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

      {/* Side Menu */}
      <SideMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default HeaderMenu;
