import { useState, useEffect } from "react";

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Set initial scroll position
    handleScroll();

    // Clean up by removing event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array means this runs only once on mount

  return scrollY;
};

export default useScrollY;
