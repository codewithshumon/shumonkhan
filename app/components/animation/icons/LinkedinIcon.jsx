import { useEffect, useRef, useState } from "react";
import LottiePlayer from "../../global/LottiePlayer";

const LinkedinIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverAreaRef = useRef(null);

  useEffect(() => {
    const handleHoverStatus = (e) => {
      setIsHovered(e.detail);
    };

    window.addEventListener("hoverAreaStatus", handleHoverStatus);
    return () => {
      window.removeEventListener("hoverAreaStatus", handleHoverStatus);
    };
  }, []);
  return (
    <div
      ref={hoverAreaRef}
      className="flex items-center justify-center w-20 h-20 cursor-pointer hover-area relative"
    >
      <LottiePlayer
        src="/animations/linkedin.lottie"
        frame={120}
        loop={true}
        play={isHovered}
        speed={2}
        className="w-16 h-16 pointer-events-none"
      />
    </div>
  );
};

export default LinkedinIcon;
