import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import useScrollY from "../../hooks/useScroll";

const AnimatedTextAboutMe = () => {
  const animationText =
    "© Code & Design By Shumon Khan • Hi, I am a Designer and Developer";

  const scrollY = useScrollY();
  const scrollRef = useRef(scrollY);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    scrollRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.querySelector(".scrollIdentyfire"),
        scrub: 0.25,
        start: 0,
        onUpdate: (e) => {
          direction = e.direction * -1;
        },
      },
    });

    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });

      xPercent += 0.1 * direction;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [direction]);

  return (
    <div>
      <div
        ref={slider}
        className="w-full h-full text-[15px] font-medium select-none scrollIdentyfire overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 20%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 20%, black 90%, transparent 100%)",
        }}
      >
        <div className="relative whitespace-nowrap w-fit flex flex-row items-center ">
          <div
            ref={firstText}
            className="w-[490px] flex flex-row items-center -bg-red-600 "
          >
            <h1 className="text-[#0a0801]">{animationText}</h1>
          </div>

          <div
            ref={secondText}
            className="absolute w-[490px] left-[100%] flex flex-row items-center -bg-green-400 "
          >
            <h1 className="text-[#0a0801]">{animationText}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTextAboutMe;
