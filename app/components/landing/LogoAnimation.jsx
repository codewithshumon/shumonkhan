"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const LogoAnimation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const circleVariants = {
    initial: {
      width: "2.5rem",
      height: "2.5rem",
    },
    expanded: {
      width: "300%",
      height: "300%",
    },
  };

  return (
    <div className="w-full h-full relative bg-amber-400">
      <motion.div
        className="fixed top-[3rem] left-[4rem] bg-blue-500 rounded-full cursor-pointer"
        style={{
          transform: "translate(-50%, -50%)",
        }}
        variants={circleVariants}
        initial="initial"
        animate={isExpanded ? " initial" : "expanded"}
        onClick={() => setIsExpanded(!isExpanded)}
      />
    </div>
  );
};

export default LogoAnimation;
