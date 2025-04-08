"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  return (
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
                    onClick={toggleMenu}
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 border-b hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 border-b hover:text-blue-500"
                    onClick={toggleMenu}
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
  );
};

export default SideMenu;
