"use client";

import { useRef, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = ({
  src,
  autoplay = false,
  loop = false,
  play = false,
  pause = false,
  speed = 1,
  className = "",
  style = {},
}) => {
  const dotLottieRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const dotLottieRefCallback = (instance) => {
    console.log("Lottie instance created", instance);
    dotLottieRef.current = instance;
    if (instance) {
      setIsReady(true);
      // Initialize with current props
      instance.setLoop(loop);
      instance.setSpeed(speed);
      if (autoplay) instance.play();
    }
  };

  // Handle play/pause changes
  useEffect(() => {
    if (!isReady || !dotLottieRef.current) return;

    console.log("Updating playback", { play, pause });

    if (pause) {
      dotLottieRef.current.pause();
    } else if (play) {
      dotLottieRef.current.play();
    }
  }, [play, pause, isReady]);

  // Handle speed/loop changes
  useEffect(() => {
    if (!isReady || !dotLottieRef.current) return;
    dotLottieRef.current.setSpeed(speed);
    dotLottieRef.current.setLoop(loop);
  }, [speed, loop, isReady]);

  return (
    <div className={className} style={style}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        dotLottieRefCallback={dotLottieRefCallback}
        onError={(error) => console.error("Lottie error:", error)}
        onLoad={() => console.log("Lottie loaded successfully")}
        onInstanceCreated={(instance) => {
          console.log("Instance fully created");
          dotLottieRef.current = instance;
          setIsReady(true);
        }}
      />
    </div>
  );
};

export default LottiePlayer;
