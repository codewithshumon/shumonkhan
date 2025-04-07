"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const HeaderMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsVisible(latest > 120);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
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
              className="fixed top-0 right-0 h-screen w-[90vw] sm:w-2/3  lg:w-1/3 bg-white shadow-xl z-30"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <ul>
                  <li className="py-2 border-b">Item 1</li>
                  <li className="py-2 border-b">Item 2</li>
                  <li className="py-2 border-b">Item 3</li>
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
