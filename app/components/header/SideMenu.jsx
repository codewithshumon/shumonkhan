"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu = ({ isMenuOpen, toggleMenu }) => {
  const pathname = usePathname();
  const colors = ["#a63607", "#06a19c", "#4239c4", "#b83364"];
  const overlayRef = useRef();
  const menuPanelRef = useRef();
  const colorLayersRef = useRef([]);
  const contentRef = useRef();
  const menuItemsRef = useRef([]);
  const tl = useRef();
  const navHeadingRef = useRef();
  const socialHeadingRef = useRef();
  const [hoveredHref, setHoveredHref] = useState(null);

  // Navigation items
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const socialItems = [
    {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/shumon-khan",
    },
    {
      text: "Facebook",
      link: "https://www.facebook.com/shumonkhan",
    },
    {
      text: "YouTube",
      link: "https://www.youtube.com/@shumonkhan",
    },
  ];

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
        className="fixed top-0 right-0 h-screen w-[90vw] sm:w-[50vw] lg:w-[35vw] shadow-xl z-35 overflow-hidden"
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
          className="absolute inset-0 p-8 md:p-12 lg:p-20 bg-[#1C1D20] opacity-0 pb-8 lg:pb-10 pt-16 lg:pt-20 flex flex-col justify-between"
        >
          {/* Navigation Section */}
          <div className="flex flex-col">
            <h2
              ref={navHeadingRef}
              className="text-xs font-bold mb-2 md:mb-4 border-b border-[#808082] py-3 md:py-5 text-[#808082] uppercase"
            >
              Explore
            </h2>
            <ul className="flex flex-col">
              {navigationItems.map((item, index) => {
                const isActive = item.href === pathname;
                return (
                  <li
                    key={item.name}
                    ref={(el) => setMenuItemRef(el, index)}
                    className="leading-none my-0 group"
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredHref(item.href)}
                      onMouseLeave={() => setHoveredHref(null)}
                      className={`py-1 transition-all duration-300 flex gap-2 text-[3rem] font-semibold leading-none relative ${
                        (item.href === pathname && !hoveredHref) ||
                        hoveredHref === item.href
                          ? "text-white translate-x-4"
                          : "text-[#c9c9c9] group-hover:translate-x-4"
                      }`}
                      onClick={toggleMenu}
                    >
                      <div
                        className={`absolute left-[-10%] transition-opacity duration-300 ${
                          (item.href === pathname && !hoveredHref) ||
                          hoveredHref === item.href
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        •
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Section */}
          <div className="mt-8 md:mt-16 flex flex-col space-y-4">
            <h2
              ref={socialHeadingRef}
              className="text-xs font-bold mb-2 text-[#808082] uppercase"
            >
              Connect With Me
            </h2>
            <ul className="flex flex-row flex-wrap gap-4 md:gap-6">
              {socialItems.map((item, index) => (
                <li
                  key={index}
                  ref={(el) =>
                    setMenuItemRef(el, navigationItems.length + index)
                  }
                  className="relative"
                >
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredHref(item.link)}
                    onMouseLeave={() => setHoveredHref(null)}
                    className={`flex items-center py-2 relative transition-all duration-300 ${
                      item.link === hoveredHref
                        ? "text-white translate-x-2"
                        : "text-[#c9c9c9] hover:translate-x-2"
                    }`}
                    onClick={toggleMenu}
                  >
                    <span className="text-sm md:text-base">{item.text}</span>
                    <div
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left transition-transform duration-300 ${
                        item.link === hoveredHref ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
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
