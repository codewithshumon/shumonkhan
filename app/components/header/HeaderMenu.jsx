"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

const HeaderMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
          className="fixed top-0 left-0 h-[15vh] w-full flex justify-end px-10 z-20"
        >
          <nav className="flex items-center gap-12 font-semibold text-gray-200">
            {[
              { name: "Work", href: "/work" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative py-2 hover:text-white transition-all duration-300"
              >
                <span className="block group-hover:-translate-y-1 transition-transform duration-300">
                  {item.name}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
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
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 10 }}
            className="fixed right-10 top-10 z-35"
          >
            <button
              onClick={toggleMenu}
              className="w-20 h-20 rounded-full bg-blue-500 shadow-lg flex flex-col items-center justify-center gap-1.5 hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <motion.div
                className="h-[3px] w-[40px] bg-white rounded-full"
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              />
              <motion.div
                className="h-[3px] w-[40px] bg-white rounded-full"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0,
                }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/15 z-30"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-screen w-[90vw] sm:w-2/3 lg:w-1/3 bg-white shadow-xl z-30"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/work"
                      className="block py-2 border-b hover:text-blue-500"
                    >
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="block py-2 border-b hover:text-blue-500"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="block py-2 border-b hover:text-blue-500"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMenu;
