import { useState, useEffect } from "react";

const useMouse = () => {
  const [position, setPosition] = useState({ x, y });

  const updateMousePosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return position;
};

export default useMouse;
