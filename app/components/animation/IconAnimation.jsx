import { useEffect, useState } from "react";

import Link from "next/link";
import LottiePlayer from "../global/LottiePlayer";

const IconAnimation = ({ src, speed, segment, className, frame }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [initialFram, setInitialFram] = useState(0);

  console.log("[isHovered in world]", isHovered);

  useEffect(() => {
    setTimeout(() => {
      if (frame) {
        setInitialFram(frame);
      }
    }, 1000);
  }, [frame]);

  return (
    <Link
      href="https://www.youtube.com/"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=" cursor-pointer relative"
    >
      <LottiePlayer
        src={src}
        loop={true}
        play={isHovered}
        speed={speed}
        segment={segment}
        frame={initialFram}
        className={`${
          className ? className : "w-16 h-16 "
        } pointer-events-none`}
      />
    </Link>
  );
};

export default IconAnimation;
