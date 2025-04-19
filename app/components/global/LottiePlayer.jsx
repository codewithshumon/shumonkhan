"use client";

import React, { useEffect, useState, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = ({
  src,
  loop = false,
  autoplay = false,
  frame = 0,
  speed = 1,
  segment = null,
  play = false,
  className = "",
  style = {},
}) => {
  const [dotLottie, setDotLottie] = useState(null);
  const containerRef = useRef(null);

  console.log("[play]", play);
  console.log("[frame]", frame);
  console.log("[containerRef]", containerRef.current);

  const dotLottieRefCallback = (instance) => {
    setDotLottie(instance);
  };

  useEffect(() => {
    if (!dotLottie) return;
    if (frame) {
      console.log("[frame indixe side effect]", frame);
      dotLottie.setFrame(frame);
    }
  }, [frame]);

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
      dotLottie.stop();

      if (frame) {
        dotLottie.setFrame(frame);
      }
    }
  }, [play, dotLottie, loop, speed, segment, frame]);

  return (
    <div
      className={className}
      style={{ ...style, pointerEvents: "auto" }}
      ref={containerRef}
    >
      <DotLottieReact
        src={src}
        autoplay={autoplay}
        loop={loop}
        dotLottieRefCallback={dotLottieRefCallback}
      />
    </div>
  );
};

export default LottiePlayer;
