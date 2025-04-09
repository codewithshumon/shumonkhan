"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#000000"];
  const overlayRef = useRef();
  const menuPanelRef = useRef();
  const colorLayersRef = useRef([]);
  const contentRef = useRef();
  const menuItemsRef = useRef([]);
  const tl = useRef();

  const setColorLayerRef = (el, index) => {
    colorLayersRef.current[index] = el;
  };

  const setMenuItemRef = (el, index) => {
    menuItemsRef.current[index] = el;
  };

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // Overlay fade animation
    tl.current.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      0
    );

    // Main menu panel sliding from right
    tl.current.fromTo(
      menuPanelRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power2.out" },
      0
    );

    // Color layers sliding from right with stagger
    colorLayersRef.current.forEach((layer, index) => {
      tl.current.fromTo(
        layer,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.4,
          delay: index * 0.15,
          ease: "power2.out",
        },
        0
      );
    });

    // Content fade-in after color layers
    tl.current.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, delay: colors.length * 0.15 + 0.2 },
      0
    );

    // Menu items staggered animation
    menuItemsRef.current.forEach((item, index) => {
      tl.current.fromTo(
        item,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: colors.length * 0.15 + 0.3 + index * 0.1,
        },
        0
      );
    });

    return () => tl.current.kill();
  }, []);

  useEffect(() => {
    isMenuOpen ? tl.current.play() : tl.current.reverse();
  }, [isMenuOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={toggleMenu}
        className="fixed inset-0 bg-black/15 z-30 opacity-0"
      />

      <div
        ref={menuPanelRef}
        className="fixed bg-amber-400 top-0 right-0 h-screen w-[90vw] sm:w-2/3 lg:w-1/3 shadow-xl z-35 overflow-hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="relative h-full w-full">
          {colors.map((color, index) => (
            <div
              key={index}
              ref={(el) => setColorLayerRef(el, index)}
              className="absolute inset-0"
              style={{ backgroundColor: color, transform: "translateX(100%)" }}
            />
          ))}
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 p-4 bg-black opacity-0"
        >
          <h2 className="text-xl font-bold mb-4 text-white">Menu</h2>
          <ul className="space-y-2">
            {["Work", "About", "Contact"].map((item, index) => (
              <li
                key={item}
                ref={(el) => setMenuItemRef(el, index)}
                style={{ opacity: 0, transform: "translateX(20px)" }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="block py-2 border-b border-gray-700 text-white hover:text-blue-400 transition-colors"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
