import { useState } from "react";

import Link from "next/link";
import LottiePlayer from "../global/LottiePlayer";

const IconAnimation = ({ src, speed, segment, className, frame }) => {
  const [isHovered, setIsHovered] = useState(false);

  console.log("[isHovered in world]", isHovered);

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
        frame={frame}
        className={`${
          className ? className : "w-16 h-16 "
        } pointer-events-none`}
      />
    </Link>
  );
};

export default IconAnimation;
