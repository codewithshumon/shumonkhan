"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  const colors = ["#a63607", "#06a19c", "#4239c4", "#b83364"];
  const overlayRef = useRef();
  const menuPanelRef = useRef();
  const colorLayersRef = useRef([]);
  const contentRef = useRef();
  const menuItemsRef = useRef([]);
  const tl = useRef();
  const navHeadingRef = useRef();
  const socialHeadingRef = useRef();

  const navigationItems = ["Work", "About", "Contact"];
  const socialItems = ["LinkedIn", "Facebook", "YouTube"];

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // Overlay animation
    tl.current.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      0
    );

    // Menu panel animation
    tl.current.fromTo(
      menuPanelRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power2.out" },
      0
    );

    // Color layers animation
    colorLayersRef.current.forEach((layer, index) => {
      tl.current.fromTo(
        layer,
        { x: "100%" },
        { x: "0%", duration: 0.4, delay: index * 0.15, ease: "power2.out" },
        0
      );
    });

    // Content fade-in
    tl.current.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, delay: colors.length * 0.15 + 0.2 },
      0
    );

    // Headings animation
    [navHeadingRef.current, socialHeadingRef.current].forEach(
      (heading, index) => {
        tl.current.fromTo(
          heading,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            delay: colors.length * 0.15 + 0.2 + index * 0.2,
            willChange: "transform, opacity",
          },
          0
        );
      }
    );

    // Menu items animation
    menuItemsRef.current.forEach((item, index) => {
      tl.current.fromTo(
        item,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: colors.length * 0.15 + 0.3 + index * 0.1,
          willChange: "transform, opacity",
        },
        0
      );
    });

    return () => tl.current.kill();
  }, []);

  useEffect(() => {
    isMenuOpen ? tl.current.play() : tl.current.reverse();
  }, [isMenuOpen]);

  const setMenuItemRef = (el, index) => {
    menuItemsRef.current[index] = el;
  };

  return (
    <>
      <div
        ref={overlayRef}
        onClick={toggleMenu}
        className="fixed inset-0 bg-black/15 z-30 opacity-0"
      />

      <div
        ref={menuPanelRef}
        className="fixed top-0 right-0 h-screen w-[90vw] sm:w-2/3 lg:w-1/3 shadow-xl z-40 overflow-hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="relative h-full w-full">
          {colors.map((color, index) => (
            <div
              key={index}
              ref={(el) => (colorLayersRef.current[index] = el)}
              className="absolute inset-0"
              style={{ backgroundColor: color, transform: "translateX(100%)" }}
            />
          ))}
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 p-20 bg-[#1C1D20] opacity-0"
        >
          {/* Navigation Section */}
          <div className="flex flex-col space-y-6">
            <h2
              ref={navHeadingRef}
              className="text-xs font-bold mb-4 border-b border-[#808082] py-5 text-[#808082] uppercase"
            >
              Navigation
            </h2>
            <ul className="flex flex-col space-y-4">
              {navigationItems.map((item, index) => (
                <li key={item} ref={(el) => setMenuItemRef(el, index)}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block py-2  text-white hover:text-blue-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div className="mt-16 flex flex-col space-y-6">
            <h2
              ref={socialHeadingRef}
              className="text-xs font-bold mb-4 border-b border-[#808082] py-5 text-[#808082] uppercase"
            >
              Social
            </h2>
            <ul className="flex flex-row gap-x-8">
              {socialItems.map((item, index) => (
                <li
                  key={item}
                  ref={(el) =>
                    setMenuItemRef(el, navigationItems.length + index)
                  }
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block py-2 text-white hover:text-blue-400 transition-colors whitespace-nowrap"
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
