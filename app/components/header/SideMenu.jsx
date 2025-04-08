"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#000000"];
  const [closeMenu, setCloseMenu] = useState(false);

  useEffect(() => {
    setCloseMenu(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      {/* Overlay - only rendered when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/15 z-30"
          />
        )}
      </AnimatePresence>

      {/* Menu Panel - conditionally rendered */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              ease: [0.22, 1, 0.36, 1],
              duration: 0.5,
            }}
            className="fixed top-0 right-0 h-screen w-[90vw] sm:w-2/3 lg:w-1/3 shadow-xl z-30 overflow-hidden"
          >
            {/* Color Layers */}
            <div className="relative h-full w-full">
              {colors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ x: "100%" }}
                  animate={{
                    x: isMenuOpen ? 0 : "100%",
                    transition: {
                      delay: index * 0.15,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    x: "100%",
                    transition: {
                      delay: (colors.length - index - 1) * 0.1,
                      duration: 0.3,
                      ease: "easeIn",
                    },
                  }}
                  className="absolute inset-0"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: colors.length * 0.15 + 0.2,
                duration: 0.3,
              }}
              className="absolute inset-0 p-4 bg-black"
            >
              <h2 className="text-xl font-bold mb-4 text-white">Menu</h2>
              <ul className="space-y-2">
                {["Work", "About", "Contact"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: 20,
                      transition: {
                        delay: index * 0.05,
                        duration: 0.2,
                      },
                    }}
                    transition={{
                      delay: colors.length * 0.15 + 0.3 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block py-2 border-b border-gray-700 text-white hover:text-blue-400 transition-colors"
                      onClick={toggleMenu}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
