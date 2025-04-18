"use client";

import React, { useEffect, useState, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = ({
  src,
  loop = false,
  speed = 1,
  segment = null,
  play = false,
  className = "",
  style = {},
}) => {
  const [dotLottie, setDotLottie] = useState(null);
  const containerRef = useRef(null);

  const dotLottieRefCallback = (instance) => {
    setDotLottie(instance);
  };

  useEffect(() => {
    if (!dotLottie) return;

    dotLottie.setLoop(loop);
    dotLottie.setSpeed(speed);

    if (segment) {
      dotLottie.setSegment(segment[0], segment[1]);
    }

    if (play) {
      dotLottie.play();
    } else {
      dotLottie.pause();
    }
  }, [play, dotLottie, loop, speed, segment]);

  return (
    <div
      className={className}
      style={{ ...style, pointerEvents: "auto" }} // ensure pointer events are allowed
      ref={containerRef}
    >
      <DotLottieReact
        src={src}
        autoplay={false}
        loop={loop}
        dotLottieRefCallback={dotLottieRefCallback}
      />
    </div>
  );
};

export default LottiePlayer;
