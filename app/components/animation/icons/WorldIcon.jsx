import { useEffect, useRef, useState } from "react";
import LottiePlayer from "../../global/LottiePlayer";

const WorldIcon = () => {
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
        src="/animations/world.lottie"
        loop={true}
        play={isHovered}
        speed={1}
        segment={[1, 30]}
        className="w-16 h-16 pointer-events-none"
      />
    </div>
  );
};

export default WorldIcon;
